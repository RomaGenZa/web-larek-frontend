import { IEvents } from './base';
import { PageHeader } from './PageHeader';
import { PageGallery } from './PageGallery';
import { ModalContainer } from './ModalContainer';
import { events } from '../utils';
import { ProductCard } from './ProductCard';
import { IRESTClient } from './base/rest';
import { TProductFullInfo } from '../types';
import { ProductCardPreview } from './ProductCardPreview';
import { ProductsData } from './data';

export class Page {
	protected element: HTMLElement;
	protected pageHead: PageHeader
	protected pageGallery: PageGallery
	protected modalContainer: ModalContainer
	protected eventBroker: IEvents;

	constructor(element: HTMLDivElement, eventBroker: IEvents, productsData: ProductsData) {
		this.element = element;
		this.eventBroker = eventBroker;

		const header = element.querySelector<HTMLElement>('.header');
		this.pageHead = new PageHeader(header, eventBroker);

		const modalContainer = element.querySelector<HTMLDivElement>('#modal-container');
		this.modalContainer = new ModalContainer(modalContainer);

		const gallery = element.querySelector<HTMLElement>('.gallery');
		this.pageGallery = new PageGallery(gallery, eventBroker);

		eventBroker.on(events.page.didSelectItem, async (card: ProductCard) => {
			const item: TProductFullInfo = await productsData.getProductById(card.id);
			this.openCardPreview(item);
		});
	}

	openCardPreview(item: TProductFullInfo) {
		const previewTemplate = this.element.querySelector<HTMLTemplateElement>("#card-preview");
		const preview = new ProductCardPreview(previewTemplate, this.eventBroker);
		preview.setData(item);
		this.modalContainer.setContent(preview);
		this.modalContainer.open();
	}
}
