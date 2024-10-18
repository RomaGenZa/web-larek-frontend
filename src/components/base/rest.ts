import { IOrder, IProduct, ITransaction } from '../../types';
import { ApiListResponse, IApiDataProvider } from './api';

/**
 *
 */
export interface IRESTClient {
	/**
	 *
	 */
	getAllProducts(): Promise<IProduct[]>;

	/**
	 *
	 */
	getProductById(id: string): Promise<IProduct>;

	/**
	 *
	 */
	createOrder(order: IOrder): Promise<ITransaction>;
}

export class DefaultRESTClient implements IRESTClient {
	private api: IApiDataProvider;

	constructor(api: IApiDataProvider) {
		this.api = api;
	}

	async getAllProducts(): Promise<IProduct[]> {
		const allProductsResponse = await this.api.get<ApiListResponse<IProduct>>('/product')
		return allProductsResponse.items;
	}

	async getProductById(id: string): Promise<IProduct> {
		return await this.api.get<IProduct>(`/product/${id}`);
	}

	async createOrder(order: IOrder): Promise<ITransaction> {
		return await this.api.post<ITransaction, IOrder>('/order', order);
	}
}

interface IImagesClient {
	getProductImage(imagePath: string): Promise<Blob>
}

export class ImagesClient implements  IImagesClient {
	private api: IApiDataProvider;

	constructor(api: IApiDataProvider) {
		this.api = api;
	}

	async getProductImage(imagePath: string): Promise<Blob> {
		return await this.api.getBlob(imagePath)
	}
}