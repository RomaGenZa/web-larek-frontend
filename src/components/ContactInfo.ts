import { IModalContainerContent } from './ModalContainerContent';
import { IEvents } from './base';
import { cloneTemplate, events } from '../utils';
import { TValidationMessage } from '../types';

export class ContactInfo implements IModalContainerContent {
	private element: HTMLFormElement;

	private inputPhone: HTMLInputElement;
	private inputEmail: HTMLInputElement;

	private submitButton: HTMLButtonElement;

	private isPhoneValid: {isValid: boolean, message?: string};
	private isEmailValid: {isValid: boolean, message?: string};
	private errorMessage: HTMLSpanElement;

	constructor(template: HTMLTemplateElement, eventBroker: IEvents) {
		this.element = cloneTemplate<HTMLFormElement>(template);

		this.isPhoneValid = {isValid: false, message: null};
		this.isEmailValid = {isValid: false, message: null};

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

		eventBroker.on(events.order.phoneValidation, (data: TValidationMessage) => {
			this.isPhoneValid = data;
			this.updateNextButton();
		})

		eventBroker.on(events.order.emailValidation, (data: TValidationMessage) => {
			this.isEmailValid = data;
			this.updateNextButton();
		})
	}

	render(): HTMLElement {
		return this.element
	}

	dispose(): void {
		this.element.remove();
		this.element = null;
	}

	private updateNextButton(): void {
		const isAllInputsValid = this.isPhoneValid.isValid && this.isEmailValid.isValid;

		if(!isAllInputsValid) {
			if(this.isEmailValid.message) {
				this.errorMessage.textContent = this.isEmailValid.message;
			} else if (this.isPhoneValid.message) {
				this.errorMessage.textContent = this.isPhoneValid.message;
			} else {
				this.errorMessage.textContent = ""
			}
		} else {
			this.errorMessage.textContent = ""
		}

		console.log("BUTTON WILL BE: " + isAllInputsValid);
		this.submitButton.disabled = !isAllInputsValid;
	}
}