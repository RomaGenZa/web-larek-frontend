import { IModalContainerContent } from './ModalContainerContent';
import { IEvents } from './base';
import { cloneTemplate, events } from '../utils';
import { PaymentType, TPaymentValidation } from '../types';

export class PaymentInfo implements IModalContainerContent {
	private element: HTMLFormElement;
	private buttonOnlinePayment: HTMLButtonElement;
	private buttonCashPayment: HTMLButtonElement;
	private buttonNext: HTMLButtonElement;
	private addressInput: HTMLInputElement;

	private readonly buttonActiveClass: string = "button_alt-active";
	private readonly buttonInactiveClass: string = "button_alt";

	private errorMessage: HTMLSpanElement;

	constructor(template: HTMLTemplateElement, eventBroker: IEvents) {
		this.element = cloneTemplate<HTMLFormElement>(template);

		this.buttonCashPayment = this.element.querySelector<HTMLButtonElement>('button[name="cash"]');
		this.buttonOnlinePayment = this.element.querySelector<HTMLButtonElement>('button[name="card"]');
		this.buttonNext = this.element.querySelector<HTMLButtonElement>('.order__button')

		this.addressInput = this.element.querySelector<HTMLInputElement>('input[name="address"]');
		this.errorMessage = this.element.querySelector<HTMLSpanElement>('.form__errors');

		this.element.addEventListener("submit", (evt) => {
			evt.preventDefault();
			eventBroker.emit(events.order.collectContactInfo);
		});

		this.addressInput.addEventListener("input", () => {
			eventBroker.emit(events.order.didChangeAddressInput, { input: this.addressInput.value });
		})

		eventBroker.on(events.order.addressValidation, (data: TPaymentValidation) => {
			this.validate(data)
		})

		eventBroker.on(events.order.paymentValidation, (data: TPaymentValidation) => {
			this.validate(data)
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

	private validate(data: TPaymentValidation): void {
		if (data.isAddressValid.isValid) {
			this.errorMessage.textContent = ""
		} else {
			this.errorMessage.textContent = data.isAddressValid.message ?? "";
		}

		this.buttonNext.disabled = !(data.isAddressValid.isValid && data.didPickPaymentType.isValid);
	}
}