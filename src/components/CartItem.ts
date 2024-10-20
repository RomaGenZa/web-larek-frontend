import { IEvents } from './base';
import { TProductCart } from '../types';
import { events } from '../utils';

export interface ICartListItem {
	setData(index: number, item: TProductCart): void;
	render(): HTMLElement;
	clone(): ICartListItem;
	dispose(): void;
}

export class CartItem implements ICartListItem {
	private element: HTMLElement
	private readonly index: HTMLSpanElement
	private readonly title: HTMLSpanElement
	private readonly price: HTMLSpanElement
	private readonly deleteButton: HTMLSpanElement
	private readonly eventBroker: IEvents

	constructor(element: HTMLElement, eventsBroker: IEvents) {
		this.eventBroker = eventsBroker;
		this.element = element;

		this.index = this.element.querySelector<HTMLSpanElement>(".basket__item-index");
		this.title = this.element.querySelector<HTMLHeadingElement>(".card__title");
		this.price = this.element.querySelector<HTMLSpanElement>(".card__price");
		this.deleteButton = this.element.querySelector<HTMLButtonElement>(".basket__item-delete");
	}

	setData(index: number, item: TProductCart) {
		this.index.textContent = index.toString();
		this.title.textContent = item.title;
		if(item.price) {
			this.price.textContent = item.price.toString();
		} else {
			this.price.textContent = "Бесценно";
		}

		this.deleteButton.addEventListener("click", () => {
			this.eventBroker.emit(events.cart.removeItem, item);
		})
	}

	clone(): CartItem {
		const clonedNode = this.element.cloneNode(true) as HTMLElement;
		return new CartItem(clonedNode, this.eventBroker);
	}

	render(): HTMLElement {
		return this.element;
	}

	dispose(): void {
		this.element.remove();
		this.element = null;
	}
}