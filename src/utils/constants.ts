export const API_URL = `https://larek-api.nomoreparties.co/api/weblarek`;
export const CDN_URL = `https://larek-api.nomoreparties.co/content/weblarek`;

export const settings = {

};

export const events = {
	product: {
		didLoadProducts: "products:did_load_products",
		didFindProductById: "did_find_product_by_id"
	},
	cart: {
		itemsChanged: "cart:items_changed",
		addItem: "cart:item_add",
		removeItem: "cart:item_remove",
		initOrderCreation: "cart:init_order_creation",
	},
	order: {
		collectPaymentInfo: "order:collect_payment_info",
		collectContactInfo: "order:collect_contact_info",
		finishCreation: "order:creation_finished",
		created: "order:created"
	},
	page: {
		didClickOpenCart: "page:did_click_open_cart",
		didSelectItem: "page:did_select_item",
	},
	modal: {
		close: "modal_close",
		openCardPreview: "modal_open_card_preview",
	}
}