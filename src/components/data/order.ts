import { IOrder, PaymentType, TProductCart } from '../../types';
import { IEvents } from '../base';
import { events } from '../../utils';
import { IRESTClient } from '../base/rest';

// export interface IOrderProcessor {
	// startOrderCreation(items: TProductCart[]): void;
// }

export class OrderProcessor { //implements IOrderProcessor {
	private order?: IOrder
	// private eventsBroker: IEvents
	// private restClient: IRESTClient;

	constructor(eventsBroker: IEvents, restClient: IRESTClient) {
		this.order = null;
		// this.eventsBroker = eventsBroker;
		// this.restClient = restClient;

		eventsBroker.on(events.order.collectPaymentInfo, (items: TProductCart[]) => {
			this.startOrderCreation(items)
		})

		eventsBroker.on(events.order.finishCreation, async () => {
			try {
				const transaction = await restClient.createOrder(this.order);
				eventsBroker.emit(events.order.created, transaction);
			} catch (error) {
				console.error(error);
				// TODO: - показать как-то ошибку
			}
		});
	}

	private startOrderCreation(items: TProductCart[]) {
		this.order = new class implements IOrder {
			address: string;
			email: string;
			items: string[];
			payment: PaymentType;
			phone: string;
			total: number;
		}

		this.order.items = items.map(item => item.id);
		if(items.some(item => item.price == null)) {
			this.order.total = Infinity;
		} else {
			this.order.total = items.reduce((sum, item) => sum + item.price, 0)
		}
	}
}