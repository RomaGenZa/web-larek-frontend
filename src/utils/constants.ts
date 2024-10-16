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
		removeItem: "cart:item_remove"
	},
	orderCreationStarted: "OrderCreationStartedEventKey",
	orderCreationCancelled: "OrderCreationCancelledEventKey",
	orderCreationCompleted: "OrderCreationCompletedEventKey",
	page: {
		didClickOpenCart: "page:did_click_open_cart",
		didSelectItem: "page:did_select_item",
	},
	modal: {
		close: "modal_close",
		openCardPreview: "modal_open_card_preview",
	}
}