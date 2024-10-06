import { CDN_URL } from "../../../utils/constants";
import ProductCategory from "./ProductCategory";
import ProductObject from "./ProductObject";

class Product {
  id: string;
  description: string;
  image: string;
  title: string;
  category: ProductCategory;
  price: number;
  
  constructor(
    id: string,
    description: string,
    image: string,
    title: string,
    category: ProductCategory,
    price: number
  ) {
    this.id = id;
    this.description = description;
    this.image = image;
    this.title = title;
    this.category = category;
    this.price = price;
  }

  toObject(): ProductObject {
    return {
      id: this.id,
      description: this.description,
      image: this.image,
      title: this.title,
      category: this.category,
      price: this.price
    };
  }

  static fromObject(json: ProductObject): Product {
    return new Product(
      json.id,
      json.description,
      CDN_URL + json.image,
      json.title,
      json.category,
      json.price
    );
  }

  static toObjectsArray(products: Product[]): ProductObject[] {
    return products
      .map(product => product.toObject());
  }

  static fromObjectsArray(objectsArray: ProductObject[]): Product[] {
    return objectsArray
      .map(object => Product.fromObject(object));
  }
}

export default Product;