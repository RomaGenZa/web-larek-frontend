import ProductCategory from "./ProductCategory";

type ProductObject = {
  id: string;
  description: string;
  image: string;
  title: string;
  category: ProductCategory;
  price: number;
}

export default ProductObject;