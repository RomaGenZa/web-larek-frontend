import './scss/styles.scss';

import DefaultRestClient from './components/servicelayer/DefaultRestClient';
import { Api } from './components/base/api';

const api = new Api();
const restClient = new DefaultRestClient(api);
restClient.getProductList().then(res => console.log(res));