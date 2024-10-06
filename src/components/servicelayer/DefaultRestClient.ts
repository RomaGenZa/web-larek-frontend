import IRESTClient from "./IRESTClient";
import { Api, ApiListResponse } from "../base/api"
import IProduct from "./models/IProduct";
import ITransaction from "./models/ITransaction";
import IOrder from "./models/IOrder";

class DefaultRestClient implements IRESTClient {
    private api: Api

    constructor(api: Api) {
        this.api = api
    }

    async getProductList(): Promise<IProduct[]> {
        const listResponseObject = await this.api.get('/product') as ApiListResponse<IProduct>;
        return listResponseObject.items;
    }

    async getProductItem(id: string): Promise<IProduct> {
        const product = await this.api.get('/product/' + id) as IProduct;
        return product;
    }

    async createOrder(order: IOrder): Promise<ITransaction> {
        const transaction = await this.api.post('/order', order) as ITransaction
        return transaction;
    }
}

export default DefaultRestClient;