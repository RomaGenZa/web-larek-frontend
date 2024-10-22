import { IModalContainerContent } from './ModalContainerContent';
import { IEvents } from './base';
import { events } from '../utils';

export class ModalContainer {
	private element: HTMLDivElement;
	private closeButton: HTMLButtonElement;
	private contentContainer: HTMLDivElement;
	private content?: IModalContainerContent;

	constructor(element: HTMLDivElement, eventBroker: IEvents) {
		this.element = element;

		this.closeButton = element.querySelector<HTMLButtonElement>('.modal__close');
		this.contentContainer =  element.querySelector<HTMLDivElement>('.modal__content');

		this.closeButton.addEventListener('click', () => {
			eventBroker.emit(events.modal.close);
		});

		this.element.addEventListener('click', (evt) => {
			if (evt.target === this.element) {
				eventBroker.emit(events.modal.close);
			}
		});
	}

	setContent(content: IModalContainerContent) {
		if(this.content) {
			this.content.dispose();
			this.content = null;
		}

		this.contentContainer.appendChild(content.render());

		this.content = content;
	}

	open() {
		this.element.classList.add('modal_active');
	}

	close() {
		this.content.dispose();
		this.content = null;
		this.element.classList.remove('modal_active');
	}
}