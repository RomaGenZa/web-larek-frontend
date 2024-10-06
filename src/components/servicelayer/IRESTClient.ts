import IOrder from "./models/IOrder";
import IProduct from "./models/IProduct";
import ITransaction from "./models/ITransaction";

interface IRESTClient {
    getProductList(): Promise<IProduct[]>
    getProductItem(id: string): Promise<IProduct>
    createOrder(order: IOrder): Promise<ITransaction>
}

export default IRESTClient;