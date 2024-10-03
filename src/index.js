import './scss/styles.scss';
const pages = document.querySelector('.gallery');
const catalog = document.querySelector('#card-catalog');
function createItem() {
    catalog.content.querySelector('.gallery__item').cloneNode(true);
}
createItem();
