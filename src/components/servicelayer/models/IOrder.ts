interface IOrder {
    payment: string,
    email: string,
    phone: string,
    address: string,
    total: number,
    items: string[]
};

export default IOrder;