import { IEvents } from './base';
import { PageHeader } from './PageHeader';
import { PageGallery } from './PageGallery';
import { ModalContainer } from './ModalContainer';
import { events } from '../utils';
import { ProductCard } from './ProductCard';
import { TProductCart, TProductFullInfo, TTransaction } from '../types';
import { ProductCardPreview } from './ProductCardPreview';
import { CartData, ProductsData } from './data';
import { Cart } from './Cart';
import { PaymentInfo } from './PaymentInfo';
import { ContactInfo } from './ContactInfo';
import { TransactionModal } from './TransactionModal';

export class Page {
	protected element: HTMLElement;
	protected pageHead: PageHeader
	protected pageGallery: PageGallery
	protected modalContainer: ModalContainer
	protected eventBroker: IEvents;

	constructor(element: HTMLDivElement, eventBroker: IEvents, productsData: ProductsData, cartData: CartData) {
		this.element = element;
		this.eventBroker = eventBroker;

		const header = element.querySelector<HTMLElement>('.header');
		this.pageHead = new PageHeader(header, eventBroker);

		const modalContainer = element.querySelector<HTMLDivElement>('#modal-container');
		this.modalContainer = new ModalContainer(modalContainer, eventBroker);

		const gallery = element.querySelector<HTMLElement>('.gallery');
		this.pageGallery = new PageGallery(gallery, eventBroker);

		eventBroker.on(events.page.didSelectItem, async (card: ProductCard) => {
			const item: TProductFullInfo = await productsData.getProductById(card.id);
			this.openCardPreview(item);
		});

		eventBroker.on(events.page.didClickOpenCart, () => {
			this.openCartModal(cartData.getItems());
		});

		eventBroker.on(events.order.collectPaymentInfo, () => {
			this.modalContainer.close();
			this.openPaymentModal();
		});

		eventBroker.on(events.order.collectContactInfo, () => {
			this.modalContainer.close();
			this.openContactModal();
		})

		eventBroker.on(events.order.created, (transaction: TTransaction) => {
			this.openTransactionModal(transaction);
		});

		eventBroker.on(events.modal.close, () => {
			this.modalContainer.close();
		})
	}

	openCardPreview(item: TProductFullInfo) {
		const previewTemplate = this.element.querySelector<HTMLTemplateElement>("#card-preview");
		const preview = new ProductCardPreview(previewTemplate, this.eventBroker);
		preview.setData(item);
		this.modalContainer.setContent(preview);
		this.modalContainer.open();
	}

	openCartModal(items: TProductCart[]) {
		const cartTemplate = this.element.querySelector<HTMLTemplateElement>("#basket");
		const cartItemTemplate = this.element.querySelector<HTMLTemplateElement>("#card-basket");
		const cart = new Cart(cartTemplate, cartItemTemplate, this.eventBroker);
		cart.setData(items);
		this.modalContainer.setContent(cart);
		this.modalContainer.open();
	}

	openPaymentModal() {
		const paymentTemplate = this.element.querySelector<HTMLTemplateElement>("#order");
		const paymentModal = new PaymentInfo(paymentTemplate, this.eventBroker);
		this.modalContainer.setContent(paymentModal);
		this.modalContainer.open();
	}

	openContactModal() {
		const contactTemplate = this.element.querySelector<HTMLTemplateElement>("#contacts");
		const contactModal = new ContactInfo(contactTemplate, this.eventBroker);
		this.modalContainer.setContent(contactModal);
		this.modalContainer.open();
	}

	openTransactionModal(transaction: TTransaction) {
		const transactionTemplate = this.element.querySelector<HTMLTemplateElement>("#success");
		const transactionModal = new TransactionModal(transactionTemplate, this.eventBroker);
		transactionModal.setData(transaction)
		this.modalContainer.setContent(transactionModal);
		this.modalContainer.open();
	}
}
