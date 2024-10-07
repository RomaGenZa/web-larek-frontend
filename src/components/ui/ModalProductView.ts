import { CDN_URL } from "../../utils/constants";
import { EventEmitter } from "../base/events";
import IProduct from "../base/models/IProduct";
import ProductCategory, { productCategoryToClass } from "../base/models/ProductCategory";
import UIEvent from "./UIEvent";
import IView from "./IView";
import { CartEvents } from "../service/Cart";

export class ModalProductView implements IView {
    constructor(
        private container: HTMLDivElement,
        private eventBroker: EventEmitter
    ) {}

    render(product: IProduct) {    
        const cardCategory = this.container.querySelector<HTMLSpanElement>(".card__category");
        this.setCategoryClass(cardCategory, product.category);

        const title = this.container.querySelector<HTMLHeadingElement>(".card__title");
        title.textContent = product.title

        const image = this.container.querySelector<HTMLImageElement>(".card__image");
        image.src = CDN_URL + product.image
        image.alt = product.title

        const cardDescription = this.container.querySelector<HTMLParagraphElement>(".card__text")
        cardDescription.textContent = product.description

        const addToCartButton = this.container.querySelector<HTMLButtonElement>(".button")
        addToCartButton.addEventListener("click", () => this.addToCart(product));
        
        const price = this.container.querySelector<HTMLSpanElement>(".card__price");
        if(product.price) {
            price.textContent = product.price + " синапсов";
        } else {
            price.textContent = "Бесценно"
        }
    }

    private addToCart(product: IProduct) {
        this.eventBroker.emit(CartEvents.AddProductToCart, product);
    }

    private setCategoryClass(cardCategory: HTMLSpanElement, category: ProductCategory) {
        Object.values(ProductCategory).forEach(cat => {
            const cls = productCategoryToClass(cat);
            cardCategory.classList.remove(cls);
        });

        const cls = productCategoryToClass(category);
        cardCategory.classList.add(cls);
        cardCategory.textContent = category;
    }
}