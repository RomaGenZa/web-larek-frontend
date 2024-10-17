import { IModalContainerContent } from './ModalContainerContent';
import { IEvents } from './base';
import { cloneTemplate, events } from '../utils';

export class PaymentInfo implements IModalContainerContent {
	private element: HTMLFormElement;
	private eventBroker: IEvents;
	

	constructor(template: HTMLTemplateElement, eventBroker: IEvents) {
		this.element = cloneTemplate<HTMLFormElement>(template);
		this.eventBroker = eventBroker;

		this.element.addEventListener("submit", () => {
			eventBroker.emit(events.order.collectContactInfo);
		});
	}

	render(): HTMLElement {
		return this.element
	}

	dispose(): void {
		this.element.remove();
		this.element = null;
	}
}