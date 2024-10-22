import { IEvents } from './base';
import { cloneTemplate, events } from '../utils';
import { Category, productCategoryToClassName, TProductCard } from '../types';

export class ProductCard {
	protected eventsBroker: IEvents
	protected element: HTMLButtonElement
	protected image: HTMLImageElement
	protected category: HTMLSpanElement
	protected title: HTMLHeadingElement
	protected price: HTMLSpanElement

	get id(): string {
		return this.element.id;
	}

	constructor(template: HTMLTemplateElement, eventsBroker: IEvents) {
		this.eventsBroker = eventsBroker;

		this.element = cloneTemplate(template);

		this.category = this.element.querySelector<HTMLSpanElement>(".card__category");
		this.title = this.element.querySelector<HTMLHeadingElement>(".card__title");

		this.image = this.element.querySelector<HTMLImageElement>(".card__image");
		this.price = this.element.querySelector<HTMLSpanElement>(".card__price");

		this.element.addEventListener('click', () => {
			console.log("Did select item " + this);
			eventsBroker.emit(events.page.didSelectItem, this);
		})
	}

	setData(product: TProductCard) {
		this.element.id = product.id;
		this.image.src = product.image;
		this.image.alt = product.title;
		this.title.textContent = product.title;
		this.clearCategory();
		this.category.classList.add(productCategoryToClassName(product.category));
		this.category.textContent = product.category;
		if(product.price === null) {
			this.price.textContent = "Бесценно";
		} else {
			this.price.textContent = product.price.toString() + " синапсов"
		}
	}

	render(): HTMLElement {
		return this.element
	}

	private clearCategory() {
		this.category.className = 'card__category';
	}
}