export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

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
		created: "order:created",
		didChangeAddressInput: "order:did_change_address_input",
		addressValidation: "order:address_validation",
		paymentValidation: "order:payment_validation",
		didSelectPaymentType: "order:did_select_payment_type",
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