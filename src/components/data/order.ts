import { IOrder, PaymentType } from '../../types';
import { IEvents } from '../base';
import { events } from '../../utils';
import { IRESTClient } from '../base/rest';

export interface IOrderProcessor {
	startOrderCreation(): void;
	cancelOrderCreation(): void;
	completeOrder(): Promise<void>;
}

export class OrderProcessor implements IOrderProcessor {
	private order?: IOrder
	private eventsBroker: IEvents
	private restClient: IRESTClient;

	constructor(eventsBroker: IEvents, restClient: IRESTClient) {
		this.order = null;
		this.eventsBroker = eventsBroker;
		this.restClient = restClient;
	}

	startOrderCreation() {
		this.order = new class implements IOrder {
			address: string;
			email: string;
			items: string[];
			payment: PaymentType;
			phone: string;
			total: number;
		}

		this.eventsBroker.emit(events.orderCreationStarted)
	}

	cancelOrderCreation() {
		this.order = null;
		this.eventsBroker.emit(events.orderCreationCancelled)
	}

	async completeOrder() {
		try {
			const transaction = this.restClient.createOrder(this.order);
			this.eventsBroker.emit(events.orderCreationCompleted, transaction);
		} catch (e) {
			console.error(e)
		}
	}
}