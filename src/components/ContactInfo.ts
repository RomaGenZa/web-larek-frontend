import { IModalContainerContent } from './ModalContainerContent';
import { IEvents } from './base';
import { cloneTemplate, events } from '../utils';
import { TContactValidation } from '../types';

export class ContactInfo implements IModalContainerContent {
	private element: HTMLFormElement;

	private inputPhone: HTMLInputElement;
	private inputEmail: HTMLInputElement;

	private submitButton: HTMLButtonElement;

	private errorMessage: HTMLSpanElement;

	constructor(template: HTMLTemplateElement, eventBroker: IEvents) {
		this.element = cloneTemplate<HTMLFormElement>(template);

		this.inputEmail = this.element.querySelector<HTMLInputElement>('input[name="email"]');
		this.inputPhone = this.element.querySelector<HTMLInputElement>('input[name="phone"]');

		this.submitButton = this.element.querySelector<HTMLButtonElement>('button[type="submit"]');
		this.errorMessage = this.element.querySelector<HTMLSpanElement>('.form__errors');

		this.element.addEventListener("submit", (evt) => {
			evt.preventDefault();
			eventBroker.emit(events.order.finishCreation);
		});

		this.inputEmail.addEventListener("input", () => {
			eventBroker.emit(events.order.didChangeEmailInput, { input: this.inputEmail.value });
		})

		this.inputPhone.addEventListener("input", () => {
			eventBroker.emit(events.order.didChangePhoneInput, { input: this.inputPhone.value });
		})

		eventBroker.on(events.order.phoneValidation, (data: TContactValidation) => {
			this.validate(data);
		})

		eventBroker.on(events.order.emailValidation, (data: TContactValidation) => {
			this.validate(data);
		})
	}

	render(): HTMLElement {
		return this.element
	}

	dispose(): void {
		this.element.remove();
		this.element = null;
	}

	private validate(data: TContactValidation): void {
		if(data.isPhoneValid.isValid && data.isEmailValid.isValid) {
			this.errorMessage.textContent = "";
		}
		
		if (!data.isPhoneValid.isValid) {
			this.errorMessage.textContent = data.isPhoneValid.message ?? "";
		} 
		
		if (!data.isEmailValid.isValid) {
			this.errorMessage.textContent = data.isEmailValid.message ?? "";
		}

		this.submitButton.disabled = !(data.isPhoneValid.isValid && data.isEmailValid.isValid);
	}
}