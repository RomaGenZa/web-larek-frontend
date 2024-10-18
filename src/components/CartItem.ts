import { IEvents } from './base';
import { cloneTemplate } from '../utils';
import { TProductCart } from '../types';
import { events } from '../utils';

export class CartItem {
	private element: HTMLElement
	private index: HTMLSpanElement
	private title: HTMLSpanElement
	private price: HTMLSpanElement
	private deleteButton: HTMLSpanElement
	private eventBroker: IEvents

	constructor(template: HTMLTemplateElement, eventsBroker: IEvents) {
		this.eventBroker = eventsBroker;
		this.element = cloneTemplate(template);

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

	render(): HTMLElement {
		return this.element;
	}

	dispose(): void {
		this.element.remove();
		this.element = null;
	}
}