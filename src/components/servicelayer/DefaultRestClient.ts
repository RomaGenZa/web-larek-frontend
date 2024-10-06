import IRESTClient from "./IRESTClient";
import { Api, ApiListResponse } from "../base/api"
import TransactionObject from "./models/TransactionObject";
import Product from "./models/Product";
import ProductObject from "./models/ProductObject";
import Transaction from "./models/Transaction";
import Order from "./models/Order";

class DefaultRestClient implements IRESTClient {
    private api: Api

    constructor(api: Api) {
        this.api = api
    }

    async getProductList(): Promise<Product[]> {
        const productsObject = await this.api.get('/product') as ApiListResponse<ProductObject>;
        return Product.fromObjectsArray(productsObject.items);
    }

    async getProductItem(id: string): Promise<Product> {
        const productObject = await this.api.get('/product/' + id) as ProductObject;
        return Product.fromObject(productObject);
    }

    async createOrder(order: Order): Promise<Transaction> {
        const transactionObject = await this.api.post('/order', order.toObject()) as TransactionObject
        return Transaction.fromObject(transactionObject);
    }
}

export default DefaultRestClient;