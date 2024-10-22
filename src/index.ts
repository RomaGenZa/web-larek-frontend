import './scss/styles.scss';
import { CartData, DefaultApiDataProvider, EventEmitter, OrderProcessor } from './components';
import { DefaultRESTClient, ImagesClient } from './components/base/rest';
import { API_URL, CDN_URL, events } from './utils';
import { ProductsData } from './components';
import { Page } from './components';

const eventBroker = new EventEmitter();

const apiDataProvider = new DefaultApiDataProvider(API_URL);
const restClient = new DefaultRESTClient(apiDataProvider);
const productsData = new ProductsData(eventBroker, restClient);
const imagesDataProvider = new DefaultApiDataProvider(CDN_URL);
const imagesClient = new ImagesClient(imagesDataProvider);
const cart = new CartData(eventBroker);
const orderProcessor = new OrderProcessor(eventBroker, restClient);
const pageContainer = document.querySelector<HTMLDivElement>('.page');
const page = new Page(pageContainer, eventBroker, productsData, cart);

productsData.getProducts().then().catch(error => {console.log(`Продукты не получили: ${error}`)});