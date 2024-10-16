import { IModalContainerContent } from './ModalContainerContent';

export class ModalContainer {
	private element: HTMLDivElement;
	private closeButton: HTMLButtonElement;
	private contentContainer: HTMLDivElement;
	private content?: IModalContainerContent;

	constructor(element: HTMLDivElement) {
		this.element = element;

		this.closeButton = element.querySelector<HTMLButtonElement>('.modal__close');
		this.contentContainer =  element.querySelector<HTMLDivElement>('.modal__content');

		this.closeButton.addEventListener('click', () => {
			this.close();
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