/**
 *
 */
export enum Category {
	/**
	 *
	 */
	Additional = "дополнительное",

	/**
	 *
	 */
	Button = "кнопка",

	/**
	 *
	 */
	HardSkill = "хард-скил",

	/**
	 *
	 */
	Other = "другое",

	/**
	 *
	 */
	SoftSkill = "софт-скил"
}

/**
 *
 */
export interface IProduct {
	/**
	 *
	 */
	id: string;

	/**
	 *
	 */
	description: string;

	/**
	 *
	 */
	image: string;

	/**
	 *
	 */
	title: string;

	/**
	 *
	 */
	category: Category;

	/**
	 *
	 */
	price: number;
}

export function productCategoryToClassName(category: string): string {
	switch (category) {
		case Category.Additional: return "card__category_additional";
		case Category.Button: return "card__category_button";
		case Category.HardSkill: return "card__category_hard";
		case Category.Other: return "card__category_other";
		case Category.SoftSkill: return "card__category_soft";
	}
}

/**
 *
 */
export type TProductCard = Pick<IProduct, 'id' | 'image' | 'category' | 'title' | 'price'>

/**
 *
 */
export type TProductFullInfo = Pick<IProduct, 'id' | 'image' | 'category' | 'title' | 'price' | 'description'>

/**
 *
 */
export type TProductCart = Pick<IProduct, 'id' | 'title' | 'price'>