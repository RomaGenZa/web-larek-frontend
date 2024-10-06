import Order from "./models/Order";
import Product from "./models/Product";
import Transaction from "./models/Transaction";

interface IRESTClient {
    getProductList(): Promise<Product[]>
    getProductItem(id: string): Promise<Product>
    createOrder(order: Order): Promise<Transaction>
}

export default IRESTClient;