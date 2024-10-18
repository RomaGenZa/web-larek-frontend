import { IProduct, TProductCard, TProductFullInfo } from '../../types';
import { IEvents } from '../base';
import { IRESTClient } from '../base/rest';
import { CDN_URL, events } from '../../utils';

export interface IProductsData {
	getProducts(): Promise<TProductCard[]>;
	getProductById(id: string): Promise<TProductFullInfo>;
}

export class ProductsData implements IProductsData {
	private productsList: IProduct[];
	private readonly eventsBroker: IEvents;
	private readonly restClient: IRESTClient;

	constructor(eventsBroker: IEvents, restClient: IRESTClient) {
		this.productsList = [];
		this.eventsBroker = eventsBroker;
		this.restClient = restClient;
	}

	async getProducts(): Promise<TProductCard[]> {
		if (this.productsList.length > 0) {
			return this.productsList;
		}

		try {
			this.productsList = await this.restClient.getAllProducts();
		} catch (e) {
			console.error(e);
		}

		this.productsList = this.productsList.map((product) => {
			return {
				...product,
				image: CDN_URL + product.image
			}
		});

		this.eventsBroker.emit(events.product.didLoadProducts, this.productsList);

		return this.productsList;
	}

	async getProductById(id: string): Promise<TProductFullInfo | undefined> {
		let product = this.productsList.find((product) => product.id === id);
		if (product) return product;

		try {
			product = await this.restClient.getProductById(id);
		} catch (e) {
			console.error(e);
		}

		product = {
			...product,
			image: CDN_URL + (product.image ?? "")
		}

		this.eventsBroker.emit(events.product.didFindProductById, product);

		return product;
	}
}