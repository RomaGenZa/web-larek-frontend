import { IEvents } from './base';
import { TProductCard } from '../types';
import { events } from '../utils';
import { ProductCard } from './ProductCard';

export class PageGallery {
	protected element: HTMLElement;
	protected eventsBroker: IEvents;
	protected cards: ProductCard[];

	constructor(container: HTMLElement, eventBroker: IEvents) {
		this.element = container;
		this.eventsBroker = eventBroker;
		this.cards = [];
		this.eventsBroker.on(events.product.didLoadProducts, (products: TProductCard[]) => {
			this.updateData(products);
		})
	}

	private updateData(products: TProductCard[]) {
		products.forEach((product: TProductCard) => {
			const template = document.querySelector<HTMLTemplateElement>('#card-catalog');
			const card = new ProductCard(template, this.eventsBroker);
			card.setData(product);
			this.cards.push(card);
			this.element.append(card.render());
		});
	}
}