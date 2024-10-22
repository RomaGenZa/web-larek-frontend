import { IEvents } from './base';
import { IModalContainerContent } from './ModalContainerContent';
import { cloneTemplate, events } from '../utils';
import { TTransaction } from '../types';

export class TransactionModal implements IModalContainerContent {
	private eventBroker: IEvents;
	private element: HTMLElement;
	private responseMessage: HTMLSpanElement;

	constructor(template: HTMLTemplateElement, eventBroker: IEvents) {
		this.eventBroker = eventBroker;
		this.element = cloneTemplate(template);
		this.responseMessage = this.element.querySelector<HTMLSpanElement>(".order-success__description")
		this.element.querySelector<HTMLButtonElement>(".order-success__close").addEventListener('click', () => {
		eventBroker.emit(events.modal.close);
		})
	}

	setError(message: string) {
		this.responseMessage.textContent = "Ошибка " + message;
	}

	setData(transaction: TTransaction) {
		this.responseMessage.textContent = "Списано " + transaction.total + " синапсов";
	}

	render(): HTMLElement {
		return this.element;
	}

	dispose(): void {
		this.element.remove();
		this.element = null;
	}
}