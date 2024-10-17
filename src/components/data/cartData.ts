import { IEvents } from '../base';
import { events } from '../../utils';
import { TProductCart } from '../../types';

export interface ICart {
	addItem(item: TProductCart): void
	removeItem(item: TProductCart): void
	getItems(): TProductCart[]
	isItemInCart(id: string): boolean
}

export class CartData implements ICart {
	private itemsInCart: TProductCart[]
	private eventsBroker: IEvents

	constructor(eventsBroker: IEvents) {
		this.itemsInCart = []
		this.eventsBroker = eventsBroker

		this.eventsBroker.on(events.cart.addItem, (item: TProductCart): void => {
			this.addItem(item);
		});

		this.eventsBroker.on(events.cart.removeItem, (item: TProductCart): void => {
			this.removeItem(item);
		});

		this.eventsBroker.on(events.cart.initOrderCreation, (): void => {
			if(this.itemsInCart.length > 0) {
				eventsBroker.emit(events.order.collectPaymentInfo, this.itemsInCart);
			}
		});

		this.eventsBroker.on(events.cart.clearCart, () => {
			this.removeAllItems()
		})
	}

	addItem(item: TProductCart): void {
		this.itemsInCart.push(item)
		this.eventsBroker.emit(events.cart.itemsChanged, this.itemsInCart);
	}

	removeItem(item: TProductCart): void {
		const index = this.itemsInCart.findIndex(cartItem => item.id === cartItem.id);
		if (index !== -1) this.itemsInCart.splice(index, 1);
		this.eventsBroker.emit(events.cart.itemsChanged, this.itemsInCart);
	}

	getItems(): TProductCart[] {
		return this.itemsInCart
	}

	isItemInCart(id: string): boolean {
		return this.itemsInCart.findIndex(cartItem => cartItem.id === id) !== -1;
	}

	removeAllItems() {
		this.itemsInCart = [];
		this.eventsBroker.emit(events.cart.itemsChanged, this.itemsInCart);
	}
}