/*
{
    "payment": "online",
    "email": "test@test.ru",
    "phone": "+71234567890",
    "address": "Spb Vosstania 1",
    "total": 2200,
    "items": [
        "854cef69-976d-4c2a-a18c-2aa45046c390",
        "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
    ]
}
 */

/**
 * Тип оплаты за заказ
 */
export enum PaymentType {
	/** Оплата заказа online */
	Online = 'online',

	/** Оплата заказа при получении */
	Cash = 'cash'
}

/**
 * Представляет собой заказ отправляемый на бэкенд
 */
export interface IOrder {
	/**
	 * Тип оплаты
	 * @see PaymentType
	 */
	payment: PaymentType;

	/**
	 * Контактный email пользователя
	 */
	email: string;

	/**
	 * Контактный телефон пользователя
	 */
	phone: string;

	/**
	 * Адресс доставки заказа
	 */
	address: string;

	/**
	 * Общая стоимость заказа
	 */
	total: number;

	/**
	 * Список идентификаторов продуктов, заказанных пользователем
	 */
	items: string[];
}

/**
 * Тип данных, предназначенный заполнения информации об оплате и доставке
 * @see IOrder
 */
export type TOrderInfo = Pick<IOrder, 'payment' | 'address'>;

/**
 * Тип предназначенный для заполнения контактных данных пользователя
 * @see IOrder
 */
export type TOrderContact = Pick<IOrder, 'email' | 'phone'>;

export type TValidationMessage = { isValid: boolean, message?: string };