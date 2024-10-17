import { IModalContainerContent } from './ModalContainerContent';
import { IEvents } from './base';
import { cloneTemplate, events } from '../utils';
import { PaymentType } from '../types';

export class PaymentInfo implements IModalContainerContent {
	private element: HTMLFormElement;
	// private eventBroker: IEvents;
	private buttonOnlinePayment: HTMLButtonElement;
	private buttonCashPayment: HTMLButtonElement;
	private buttonNext: HTMLButtonElement;
	private addressInput: HTMLInputElement;

	private isAddressValid: boolean;
	private didPickPaymentType: boolean;

	private readonly buttonActiveClass: string = "button_alt-active";
	private readonly buttonInactiveClass: string = "button_alt";
	// private readonly formValidClass: string = "form__input";
	// private readonly formInvalidClass: string = "form__inputinvalid";

	private errorMessage: HTMLSpanElement;

	constructor(template: HTMLTemplateElement, eventBroker: IEvents) {
		this.element = cloneTemplate<HTMLFormElement>(template);
		// this.eventBroker = eventBroker;

		this.isAddressValid = false;
		this.didPickPaymentType = false;

		this.buttonCashPayment = this.element.querySelector<HTMLButtonElement>('button[name="cash"]');
		this.buttonOnlinePayment = this.element.querySelector<HTMLButtonElement>('button[name="card"]');
		this.buttonNext = this.element.querySelector<HTMLButtonElement>('.order__button')

		this.addressInput = this.element.querySelector<HTMLInputElement>('input[name="address"]');
		this.errorMessage = this.element.querySelector<HTMLSpanElement>('.form__errors');

		this.element.addEventListener("submit", () => {
			eventBroker.emit(events.order.collectContactInfo);
		});

		this.addressInput.addEventListener("input", () => {
			eventBroker.emit(events.order.didChangeAddressInput, { input: this.addressInput.value });
		})

		eventBroker.on(events.order.addressValidation, (data: { isValid: boolean }) => {
			if (data.isValid) {
				this.errorMessage.textContent = ""
			} else {
				this.errorMessage.textContent = "Адрес не должен быть пустым!"
			}

			this.isAddressValid = data.isValid

			this.updateNextButton();
		})

		eventBroker.on(events.order.paymentValidation, (data: { isValid: boolean }) => {
			this.didPickPaymentType = data.isValid;
			this.updateNextButton();
		})

		this.buttonCashPayment.addEventListener("click", () => {
			eventBroker.emit(events.order.didSelectPaymentType, { type: PaymentType.Cash });
			this.buttonOnlinePayment.classList.remove(this.buttonActiveClass)
			this.buttonOnlinePayment.classList.add(this.buttonInactiveClass)

			this.buttonCashPayment.classList.remove(this.buttonInactiveClass)
			this.buttonCashPayment.classList.add(this.buttonActiveClass)
		});

		this.buttonOnlinePayment.addEventListener("click", () => {
			eventBroker.emit(events.order.didSelectPaymentType, { type: PaymentType.Online });

			this.buttonCashPayment.classList.remove(this.buttonActiveClass)
			this.buttonCashPayment.classList.add(this.buttonInactiveClass)

			this.buttonOnlinePayment.classList.remove(this.buttonInactiveClass)
			this.buttonOnlinePayment.classList.add(this.buttonActiveClass)
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
		this.buttonNext.disabled = !(this.isAddressValid && this.didPickPaymentType);
	}
}