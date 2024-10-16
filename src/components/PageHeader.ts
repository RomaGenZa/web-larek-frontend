import { IEvents } from './base';
import { events } from '../utils';
import { TProductCart } from '../types';

export class PageHeader {
	protected openCartButton: HTMLButtonElement
	protected productsInCartCount: HTMLSpanElement
	protected eventBroker: IEvents

	constructor(container: HTMLElement, eventBroker: IEvents) {
		this.openCartButton = container.querySelector<HTMLButtonElement>(".header__basket")
		this.productsInCartCount = container.querySelector<HTMLSpanElement>(".header__basket-counter")
		this.eventBroker = eventBroker

		this.eventBroker.on(events.cart.itemsChanged, (items: TProductCart[]) => {
			this.updateCounter(items);
		});

		this.openCartButton.addEventListener("click", () => {
			this.onCartButtonClick();
		})
	}

	private onCartButtonClick(): void {
		this.eventBroker.emit(events.page.didClickOpenCart);
	}

	private updateCounter(items: TProductCart[]) {
		this.productsInCartCount.textContent = items.length.toString();
	}
}