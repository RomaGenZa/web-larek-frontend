import { IEvents } from './base';
import { cloneTemplate, events } from '../utils';
import { Category, productCategoryToClassName, TProductFullInfo } from '../types';
import { IModalContainerContent } from './ModalContainerContent';

export class ProductCardPreview implements IModalContainerContent {
	private eventsBroker: IEvents
	private element: HTMLButtonElement
	private image: HTMLImageElement
	private category: HTMLSpanElement
	private title: HTMLHeadingElement
	private price: HTMLSpanElement
	private description: HTMLParagraphElement
	private addToCartButton: HTMLButtonElement

	constructor(template: HTMLTemplateElement, eventsBroker: IEvents) {
		this.element = cloneTemplate(template);
		this.eventsBroker = eventsBroker;

		this.category = this.element.querySelector<HTMLSpanElement>(".card__category");
		this.title = this.element.querySelector<HTMLHeadingElement>(".card__title");

		this.image = this.element.querySelector<HTMLImageElement>(".card__image");
		this.price = this.element.querySelector<HTMLSpanElement>(".card__price");

		this.description = this.element.querySelector<HTMLParagraphElement>(".card__text")
		this.addToCartButton = this.element.querySelector<HTMLButtonElement>(".card__button");
	}

	setData(product: TProductFullInfo) {
		this.image.src = product.image;
		this.image.alt = product.title;
		this.title.textContent = product.title;

		this.clearCategory();
		this.category.classList.add(productCategoryToClassName(product.category));

		if(product.price === null) {
			this.price.textContent = "Бесценно";
		} else {
			this.price.textContent = product.price.toString() + " синапсов"
		}

		this.description.innerHTML = product.description;

		this.addToCartButton.addEventListener('click', () => {
			this.eventsBroker.emit(events.cart.addItem, product);
		})
	}

	render(): HTMLElement {
		return this.element
	}

	dispose() {
		this.element.remove()
		this.element = null
	}

	private clearCategory() {
		for(const category in Category) {
			this.category.classList.remove(productCategoryToClassName(category));
		}
	}
}