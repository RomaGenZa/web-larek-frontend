import OrderObject from "./OrderObject";

class Order {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];

  constructor(
    payment: string,
    email: string,
    phone: string,
    address: string,
    total: number,
    items: string[]
  ) {
    this.payment = payment;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.total = total;
    this.items = items;
  }

  // Метод для преобразования объекта класса в JSON-строку
  toObject(): OrderObject {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
      total: this.total,
      items: this.items,
    };
  }

  // Статический метод для создания объекта класса из JSON
  static fromObject(obj: OrderObject): Order {
    return new Order(
      obj.payment,
      obj.email,
      obj.phone,
      obj.address,
      obj.total,
      obj.items
    );
  }
}

export default Order;