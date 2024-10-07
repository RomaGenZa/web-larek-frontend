import IOrder from "../base/models/IOrder";
import IProduct from "../base/models/IProduct";
import ITransaction from "../base/models/ITransaction";

interface IRESTClient {
    getProductList(): Promise<IProduct[]>
    getProductItem(id: string): Promise<IProduct>
    createOrder(order: IOrder): Promise<ITransaction>
}

export default IRESTClient;