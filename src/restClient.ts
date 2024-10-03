import { Api } from './components/base/api';

type Result<T> = { success: true; value: T } | { success: false; error: Error };

enum ProductCategory {
	SoftSkill = 'софт-скил',
	HardSkill = 'хард-скил',
	Button = 'кнопка',
	Additional = 'дополнительно',
	Other = 'другое',
}

enum ProductCategoryColor {
	SoftSkill = 'card__category_soft',
	HardSkill = 'card__category_hard',
	Button = 'card__category_button',
	Additional = 'card__category_additional',
	Other = 'card__category_other',
}

class Product {
	id: string;
	description: string;
	category: ProductCategory;
	title: string;
	image: string;
	price: string;

	constructor(
		id: string,
		description: string,
		category: ProductCategory,
		title: string,
		image: string,
		price: string
	) {
		this.id = id;
		this.description = description;
		this.category = category;
		this.title = title;
		this.image = image;
		this.price = price;
	}

	getCategoryColor(): string {
		switch (this.category) {
			case ProductCategory.SoftSkill:
				return ProductCategoryColor.SoftSkill;
			case ProductCategory.HardSkill:
				return ProductCategoryColor.HardSkill;
			case ProductCategory.Button:
				return ProductCategoryColor.Button;
			case ProductCategory.Additional:
				return ProductCategoryColor.Additional;
			case ProductCategory.Other:
				return ProductCategoryColor.Other;
			default:
				return '';
		}
	}
}

class ProductListResponse {
	total: number;
	items: Product[];
}

interface IRESTClient {
	getProductList(): Promise<Product[]>;
	getProductItem(id: string): Result<Product>;
	getProductOrder(orderData: OrderData): Result<Transaction>;
}

class OrderData {
	payment: string;
	email: string;
	phone: string;
	total: number;
	items: string[];

	constructor(
		payment: string,
		email: string,
		phone: string,
		total: number,
		items: string[]
	) {
		this.payment = payment;
		this.email = email;
		this.phone = phone;
		this.total = total;
		this.items = items;
	}
}

class Transaction {
  id: string;
  total: number;

  constructor(id: string, total: number) {
    this.id = id;
    this.total = total;
  }
}

class DefaultRESTClient implements IRESTClient {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getProductList(): Promise<Product[]> {
    const result = await this.api.get('/product')
    const data = JSON.parse(result);
    const 
    return {
      success: false,
      error: new Error('todo')
    }
  }

	getProductItem(id: string): Result<Product> {
    return {
      success: false,
      error: new Error('todo')
    }
  }

	getProductOrder(orderData: OrderData): Result<Transaction> {
    return {
      success: false,
      error: new Error('todo')
    }
  }
}