import { EventEmitter } from './components/base/events';
import DefaultRestClient from './components/servicelayer/DefaultRestClient';
import { MainPresenter } from './components/ui/MainPresenter';
import { MainView } from './components/ui/MainView';
import './scss/styles.scss';
import { ensureElement } from './utils/utils';

const eventBroker = new EventEmitter();
const restClient = new DefaultRestClient();
const userPresenter = new MainPresenter(eventBroker, restClient);
const userView = new MainView(ensureElement<HTMLElement>(".gallery"), eventBroker);
