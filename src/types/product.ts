export enum Category {
	Additional = "дополнительное",
	Button = "кнопка",
	HardSkill = "хард-скил",
	Other = "другое",
	SoftSkill = "софт-скил"
}

export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: Category;
	price: number;
}

export type TProductCard = Pick<IProduct, 'id' | 'image' | 'category' | 'title' | 'price'>

export type TProductFullInfo = Pick<IProduct, 'id' | 'image' | 'category' | 'title' | 'price' | 'description'>

export type TProductCart = Pick<IProduct, 'id' | 'title' | 'price'>