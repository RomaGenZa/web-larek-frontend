import { CDN_URL } from "../../utils/constants";
import { bem } from "../../utils/utils";
import { EventEmitter } from "../base/events";
import IProduct from "../base/models/IProduct";
import ProductCategory, { productCategoryToClass } from "../base/models/ProductCategory";
import IView from "./IView";

export class ProductCardView implements IView {
  constructor(private container: HTMLElement, private eventBroker: EventEmitter) {
  }

  render(product: IProduct) {
    const cardCategory = this.container.querySelector<HTMLSpanElement>(".card__category");
    this.setCategoryClass(cardCategory, product.category);

    const title = this.container.querySelector<HTMLHeadingElement>(".card__title");
    title.textContent = product.title

    const image = this.container.querySelector<HTMLImageElement>(".card__image");
    image.src = CDN_URL + product.image
    image.alt = product.title

    const price = this.container.querySelector<HTMLSpanElement>(".card__price");
    if(product.price) {
        price.textContent = product.price + " синапсов";
    } else {
        price.textContent = "Бесценно"
    }
  }

  private setCategoryClass(cardCategory: HTMLSpanElement, category: ProductCategory) {
    Object.values(ProductCategory).forEach(cat => {
        const cls = productCategoryToClass(cat);
        cardCategory.classList.remove(cls);
    });

    const cls = productCategoryToClass(category);
    console.log("CLS: " + cls);
    cardCategory.classList.add(cls);
    cardCategory.textContent = category;
  }
}