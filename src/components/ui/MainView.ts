import { cloneTemplate } from "../../utils/utils";
import { EventEmitter, Events } from "../base/events";
import IProduct from "../base/models/IProduct";
import { store } from "../base/store";
import { ProductCardView } from "./ProductCardView";
import IView from "./IView";

export class MainView implements IView {
  constructor(private container: HTMLElement, private eventBroker: EventEmitter) {
    store.subscribe(() => {
      const state = store.getState();
      if (state.products) {
        this.render(state.products);
      }
    });

    this.eventBroker.emit(Events.LoadProducts);
  }

  render(products: IProduct[]) {
    console.log("Rednering main");
    this.container.innerHTML = ""
    products.forEach((product) => {
        const productCardViewContainer = cloneTemplate("#card-catalog");
        const productCardView = new ProductCardView(productCardViewContainer, this.eventBroker);
        this.container.append(productCardViewContainer);
        productCardView.render(product)
    });
  }
}