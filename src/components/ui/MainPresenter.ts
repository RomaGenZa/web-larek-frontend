import { setProducts } from "../base/action";
import { EventEmitter, Events } from "../base/events";
import { store } from "../base/store";
import IRESTClient from "../servicelayer/IRESTClient";

export class MainPresenter {
  constructor(private eventBroker: EventEmitter, private restClient: IRESTClient) {
    this.eventBroker.on(Events.LoadProducts, () => { 
        console.log("Loading products");
        this.loadProducts();
    });
  }

  async loadProducts() {
    const products = await this.restClient.getProductList();
    store.dispatch(setProducts(products));
  }
}