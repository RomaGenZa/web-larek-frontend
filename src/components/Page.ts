import { IEvents } from './base';
import { PageHeader } from './PageHeader';
import { PageGallery } from './PageGallery';

export class Page {
	protected pageHead: PageHeader
	protected pageGallery: PageGallery

	constructor(container: HTMLDivElement, eventBroker: IEvents) {
		const header = container.querySelector<HTMLElement>('.header');
		this.pageHead = new PageHeader(header, eventBroker);

		const gallery = container.querySelector<HTMLElement>('.gallery');
		this.pageGallery = new PageGallery(gallery, eventBroker);
	}
}
