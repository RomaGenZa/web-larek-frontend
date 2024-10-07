import IRESTClient, { RESTClientEvent } from "./IRESTClient";
import { Api, ApiListResponse } from "../base/api"
import IProduct from "../base/models/IProduct";
import ITransaction from "../base/models/ITransaction";
import IOrder from "../base/models/IOrder";
import { EventEmitter } from "../base/events";

class DefaultRestClient implements IRESTClient {
    constructor(private eventBroker: EventEmitter, private api: Api = new Api()) {
    }

    async getProductList(): Promise<IProduct[]> {
        const listResponseObject = await this.api.get('/product') as ApiListResponse<IProduct>;
        this.eventBroker.emit(RESTClientEvent.DidLoadProducts, listResponseObject.items);
        return listResponseObject.items;
    }

    async getProductItem(id: string): Promise<IProduct> {
        const product = await this.api.get('/product/' + id) as IProduct;
        this.eventBroker.emit(RESTClientEvent.DidLoadProduct, product);
        return product;
    }

    async createOrder(order: IOrder): Promise<ITransaction> {
        const transaction = await this.api.post('/order', order) as ITransaction
        this.eventBroker.emit(RESTClientEvent.DidLoadProduct, transaction);
        return transaction;
    }
}

export default DefaultRestClient;