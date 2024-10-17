import { IEvents } from './base';
import { IModalContainerContent } from './ModalContainerContent';
import { cloneTemplate, events } from '../utils';
import { TProductCart } from '../types';
import { CartItem } from './CartItem';

export class Cart implements IModalContainerContent {
	private eventBroker: IEvents;
	private element: HTMLElement;
	private itemsList: HTMLUListElement
	private createOrderButton: HTMLButtonElement
	private price: HTMLSpanElement;
	private itemTemplate: HTMLTemplateElement;
	private cartItems: CartItem[];

	constructor(template: HTMLTemplateElement, itemTemplate: HTMLTemplateElement, eventBroker: IEvents) {
		this.eventBroker = eventBroker;
		this.itemTemplate = itemTemplate;
		this.element = cloneTemplate(template);
		this.itemsList = this.element.querySelector<HTMLUListElement>(".basket__list");
		this.price = this.element.querySelector<HTMLSpanElement>(".basket__price");
		this.createOrderButton = this.element.querySelector<HTMLButtonElement>(".basket__button");
		this.cartItems = [];

		eventBroker.on(events.cart.itemsChanged, (items: TProductCart[]) => {
			this.clearData();
			this.setData(items);
		})

		this.createOrderButton.addEventListener("click", () => {
			eventBroker.emit(events.cart.initOrderCreation);
		})
	}

	setData(items: TProductCart[]) {
		this.cartItems = items.map((value, index) => {
			const cartItem = new CartItem(this.itemTemplate, this.eventBroker);
			cartItem.setData(index + 1, value);
			this.itemsList.append(cartItem.render());
			return cartItem
		});

		if(items.some(item => item.price == null)) {
			this.price.textContent = "Не расплатишься"
			this.createOrderButton.disabled = true;
		} else {
			this.price.textContent = items.reduce((sum, item) => sum + item.price, 0).toString() + " синапсов";
			this.createOrderButton.disabled = false;
		}
	}

	render(): HTMLElement {
		return this.element
	}

	dispose(): void {
		this.element.remove()
		this.element = null
	}

	private clearData() {
		this.cartItems.forEach(item => item.dispose());
	}
}