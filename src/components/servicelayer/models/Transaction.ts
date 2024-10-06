import TransactionObject from "./TransactionObject";

export class Transaction {
  id: string;
  total: number;

  constructor(id: string, total: number) {
    this.id = id;
    this.total = total;
  }

  toObject(): TransactionObject {
    return {
      id: this.id,
      total: this.total
    };
  }

  static fromObject(object: TransactionObject): Transaction {
    return new Transaction(
      object.id,
      object.total
    );
  }

  static toObjectsArray(orders: Transaction[]): TransactionObject[] {
    return orders.map(order => order.toObject());
  }

  static fromObjectsArray(jsonArray: TransactionObject[]): Transaction[] {
    return jsonArray.map(json => Transaction.fromObject(json));
  }
}

export default Transaction;