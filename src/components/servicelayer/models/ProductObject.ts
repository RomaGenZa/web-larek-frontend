import ProductCategory from "./ProductCategory";

type ProductObject = {
  id: string;
  description: string;
  image: URL;
  title: string;
  category: ProductCategory;
  price: number;
}

export default ProductObject;