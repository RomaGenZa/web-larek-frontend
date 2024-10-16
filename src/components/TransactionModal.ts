import { IEvents } from './base';
import { IModalContainerContent } from './ModalContainerContent';
import { cloneTemplate, events } from '../utils';
import { TTransaction } from '../types';

export class TransactionModal implements IModalContainerContent {
	private eventBroker: IEvents;
	private element: HTMLElement;

	constructor(template: HTMLTemplateElement, eventBroker: IEvents) {
		this.eventBroker = eventBroker;
		this.element = cloneTemplate(template);
		this.element.querySelector<HTMLButtonElement>(".order-success__close").addEventListener('click', () => {
			eventBroker.emit(events.modal.close);
		})
	}

	setData(transaction: TTransaction) {
		// TODO: set data
	}

	render(): HTMLElement {
		return this.element;
	}

	dispose(): void {
		this.element.remove();
		this.element = null;
	}
}