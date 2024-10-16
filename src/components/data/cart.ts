import { IEvents } from '../base';
import { events } from '../../utils';
import { TProductCart } from '../../types';

export interface ICart {
	addItem(item: TProductCart): void
	removeItem(item: TProductCart): void
	getItems(): TProductCart[]
	isItemInCart(id: string): boolean
}

export class Cart implements ICart {
	private readonly itemsInCart: TProductCart[]
	private eventsBroker: IEvents

	constructor(eventsBroker: IEvents) {
		this.itemsInCart = []
		this.eventsBroker = eventsBroker
	}

	addItem(item: TProductCart): void {
		this.itemsInCart.push(item)
		this.eventsBroker.emit(events.cart.itemsChanged)
	}

	removeItem(item: TProductCart): void {
		const index = this.itemsInCart.findIndex(cartItem => item.id === cartItem.id);
		if (index !== -1) this.itemsInCart.splice(index, 1);
		this.eventsBroker.emit(events.cart.itemsChanged);
	}

	getItems(): TProductCart[] {
		return this.itemsInCart
	}

	isItemInCart(id: string): boolean {
		return this.itemsInCart.findIndex(cartItem => cartItem.id === id) !== -1;
	}
}