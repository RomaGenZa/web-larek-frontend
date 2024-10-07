import { EventEmitter } from "../base/events";
import IProduct from "../base/models/IProduct";

export enum CartEvents {
    AddProductToCart = "cart:add",
    DidAddProductToCart = "cart:didadd",
    RemoveProductFromCart = "cart:remove",
    DidRemoveProductFromCart = "cart:remove"
}

export class Cart {
    constructor(
        private eventBroker: EventEmitter,
        private products: IProduct[] = []
    ) {
        eventBroker.on<IProduct>(CartEvents.AddProductToCart, product => this.addProduct(product));
        eventBroker.on<IProduct>(CartEvents.RemoveProductFromCart, product => this.removeProduct(product));
    }

    itemsCount(): number {
        return this.products.length
    }

    private addProduct(product: IProduct) {
        this.products.push(product);
        this.eventBroker.emit(CartEvents.DidAddProductToCart, product);
    }

    private removeProduct(product: IProduct) {
        this.products = this.products.filter(prod => product !== prod);
        this.eventBroker.emit(CartEvents.DidRemoveProductFromCart, product);
    }
}
