import ProductCategory from "./ProductCategory";

interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: ProductCategory;
  price?: number;
}

export default IProduct;