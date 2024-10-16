export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {

};

export const events = {
	product: {
		didLoadProducts: "products:didLoadProducts",
		didFindProductById: "didFindProductById"
	},
	cart: {
		itemsChanged: "cart:items_changed"
	},
	orderCreationStarted: "OrderCreationStartedEventKey",
	orderCreationCancelled: "OrderCreationCancelledEventKey",
	orderCreationCompleted: "OrderCreationCompletedEventKey",
	page: {
		didClickOpenCart: "page:didClickOpenCart",
		didSelectItem: "page:didSelectItem",
	}
}