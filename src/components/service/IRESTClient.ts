import IOrder from "../base/models/IOrder";
import IProduct from "../base/models/IProduct";
import ITransaction from "../base/models/ITransaction";

export enum RESTClientEvent {
    DidLoadProducts = "products:didload",
    DidLoadProduct = "product:didload",
    DidCreateOrder = "order:didcreate"
}

interface IRESTClient {
    getProductList(): Promise<IProduct[]>
    getProductItem(id: string): Promise<IProduct>
    createOrder(order: IOrder): Promise<ITransaction>
}

export default IRESTClient;