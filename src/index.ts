import './scss/styles.scss';
import { DefaultApiDataProvider, EventEmitter } from './components';
import { DefaultRESTClient, ImagesClient } from './components/base/rest';
import { API_URL, CDN_URL, events } from './utils';
import { ProductsData } from './components';
import { Page } from './components';
import { ProductCard } from './components/ProductCard';

const eventBroker = new EventEmitter();

const apiDataProvider = new DefaultApiDataProvider(API_URL);
const restClient = new DefaultRESTClient(apiDataProvider);
const productsData = new ProductsData(eventBroker, restClient);
const imagesDataProvider = new DefaultApiDataProvider(CDN_URL);
const imagesClient = new ImagesClient(imagesDataProvider);

const pageContainer = document.querySelector<HTMLDivElement>('.page__wrapper');
const page = new Page(pageContainer, eventBroker);

productsData.getProducts().then();

eventBroker.on(events.page.didSelectItem, (productCard: ProductCard) => {
	console.log(productCard);
	productsData.getProductById(productCard.id).then((product) => {
		console.log("Full product info: " + product);
	});
})
