import { EventEmitter } from './components/base/events';
import { Cart, CartEvents } from './components/service/Cart';
import DefaultRestClient from './components/service/DefaultRestClient';
import { MainView } from './components/ui/MainView';
import './scss/styles.scss';
import { ensureElement } from './utils/utils';

const eventBroker = new EventEmitter();
const restClient = new DefaultRestClient(eventBroker);
const cart = new Cart(eventBroker);
const userView = new MainView(ensureElement<HTMLElement>(".gallery"), eventBroker);

restClient.getProductList();

eventBroker.on(CartEvents.DidAddProductToCart, () => {
    const counter = ensureElement<HTMLSpanElement>(".header__basket-counter");
    counter.textContent = cart.itemsCount().toString()
});

eventBroker.on(CartEvents.DidRemoveProductFromCart, () => {
    const counter = ensureElement<HTMLSpanElement>(".header__basket-counter")
    counter.textContent = cart.itemsCount().toString()
});