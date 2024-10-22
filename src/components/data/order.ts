import { IOrder, PaymentType, TContactValidation, TPaymentValidation, TProductCart } from '../../types';
import { IEvents } from '../base';
import { events } from '../../utils';
import { IRESTClient } from '../base/rest';

export class OrderProcessor {
	private order?: IOrder
	private eventsBroker: IEvents

	private restClient: IRESTClient;

	private isPaymentValid: TPaymentValidation;
	private isContactValid: TContactValidation;

	constructor(eventsBroker: IEvents, restClient: IRESTClient) {
		this.order = null;
		this.eventsBroker = eventsBroker;
		this.restClient = restClient;

		this.isPaymentValid = {
			isAddressValid: { isValid: false },
			didPickPaymentType: { isValid: false }
		}

		this.isContactValid = {
			isPhoneValid: { isValid: false },
			isEmailValid: { isValid: false }
		}

		eventsBroker.on(events.order.collectPaymentInfo, (items: TProductCart[]) => {
			this.startOrderCreation(items)
		})

		eventsBroker.on(events.order.finishCreation, async () => {
			try {
				const transaction = await restClient.createOrder(this.order);
				eventsBroker.emit(events.cart.clearCart);
				eventsBroker.emit(events.order.created, transaction);
			} catch (error) {
				console.error(error);
				eventsBroker.emit(events.order.notcreated, error.message);
			}
		});

		eventsBroker.on(events.order.didChangeAddressInput, (data: { input: string }) => {
			this.order.address = data.input;
			this.validateAddressInput(data.input);
		});

		eventsBroker.on(events.order.didSelectPaymentType, (data: { type: PaymentType }) => {
			this.order.payment = data.type;

			this.isPaymentValid = {
				...this.isPaymentValid,
				didPickPaymentType: {
					isValid: true
				}
			}

			this.eventsBroker.emit(events.order.paymentValidation, this.isPaymentValid);
		});

		eventsBroker.on(events.order.didChangeEmailInput, (data: { input: string }) => {
			this.order.email = data.input;
			this.validateEmailInput(data.input);
		})

		eventsBroker.on(events.order.didChangePhoneInput, (data: { input: string }) => {
			this.order.phone = data.input;
			this.validatePhoneInput(data.input);
		})
	}

	private startOrderCreation(items: TProductCart[]) {
		this.order = new class implements IOrder {
			address: string;
			email: string;
			items: string[];
			payment: PaymentType;
			phone: string;
			total: number;
		}

		this.order.items = items.map(item => item.id);
		if (items.some(item => item.price == null)) {
			this.order.total = Infinity;
		} else {
			this.order.total = items.reduce((sum, item) => sum + (item.price ?? 0), 0);
		}
	}

	private validateAddressInput(input: string) {
		this.isPaymentValid = {
			...this.isPaymentValid,
			isAddressValid: {
				isValid: input.length > 0,
				message: input.length > 0 ? null : "Адрес не должен быть пустым!"
			}
		}

		this.eventsBroker.emit(events.order.addressValidation, this.isPaymentValid)
	}

	private validatePhoneInput(input: string) {
		if(input.length === 0) {
			this.isContactValid = {
				...this.isContactValid,
				isPhoneValid: {
					isValid: false,
					message: "Поле не должно быть пустым"
				}
			};
		} else {
			const phoneRegex = /^\+?[1-9]\d{1,14}$/;
			const isPhoneValid = phoneRegex.test(input);

			if(isPhoneValid) {
				this.isContactValid = {
					...this.isContactValid,
					isPhoneValid: {
						isValid: true,
						message: null
					}
				};
			} else {
				this.isContactValid = {
					...this.isContactValid,
					isPhoneValid: {
						isValid: false,
						message: "Не валидный номер телефона"
					}
				};
			}
		}

		this.eventsBroker.emit(events.order.phoneValidation, this.isContactValid);
	}

	private validateEmailInput(input: string) {

		if (input.length === 0) {
			this.isContactValid = {
				...this.isContactValid,
				isEmailValid: {
					isValid: false,
					message: "Поле не должно быть пустым"
				}
			};
		} else {
			const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
			const isEmailValid = emailRegex.test(input);

			if(isEmailValid) {
				this.isContactValid =  {
					...this.isContactValid,
					isEmailValid: {
						isValid: true,
						message: null
					}
				};
			} else {
				this.isContactValid = {
					...this.isContactValid,
					isEmailValid: {
						isValid: false,
						message: "невалидный e-mail"
					}
				};
			}
		}

		this.eventsBroker.emit(events.order.emailValidation, this.isContactValid);
	}
}