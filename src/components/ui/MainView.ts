import { bem, cloneTemplate, ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/events";
import IProduct from "../base/models/IProduct";
import { ProductCardView } from "./ProductCardView";
import IView from "./IView";
import UIEvent from "./UIEvent";
import { RESTClientEvent } from "../service/IRESTClient";
import { ModalProductView } from "./ModalProductView";

export class MainView implements IView {
    constructor(private container: HTMLElement, private eventBroker: EventEmitter) {
        this.eventBroker.on<IProduct[]>(RESTClientEvent.DidLoadProducts, products => this.render(products));
        this.eventBroker.on<IProduct>(UIEvent.DidSelectProduct, product => this.showProduct(product));
        this.eventBroker.on(UIEvent.CloseProductModal, () => {
            const modalProductContainer = ensureElement<HTMLDivElement>("#modal-container");
            const cls = bem("modal", "", "active").name;
            modalProductContainer.classList.remove(cls);
        })
    }

    render(products: IProduct[]) {
        console.log("Rednering main");
        this.container.innerHTML = ""
        products.forEach((product) => {
            const productCardViewContainer = cloneTemplate<HTMLButtonElement>("#card-catalog");
            const productCardView = new ProductCardView(productCardViewContainer, this.eventBroker);
            this.container.append(productCardViewContainer);
            productCardView.render(product)
        });
    }

    showProduct(product: IProduct) {
        const modalProductContainer = ensureElement<HTMLDivElement>("#modal-container");
        const closeButton = modalProductContainer.querySelector<HTMLButtonElement>(".modal__close")
        closeButton.addEventListener("click", () => { 
            this.eventBroker.emit(UIEvent.CloseProductModal);
        });

        const contentContainer = modalProductContainer.querySelector<HTMLDivElement>(".modal__content")

        const content = cloneTemplate<HTMLDivElement>("#card-preview")
        const modalProductView = new ModalProductView(content, this.eventBroker);

        contentContainer.childNodes.forEach(element => {
            element.remove();
        });

        contentContainer.appendChild(content);
        modalProductView.render(product);

        modalProductContainer.classList.add(bem("modal", "", "active").name);
    }
}