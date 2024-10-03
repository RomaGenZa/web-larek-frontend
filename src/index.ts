import './scss/styles.scss';
<<<<<<< HEAD
<<<<<<< HEAD

<<<<<<< HEAD
=======
>>>>>>> ca67ad2 (feat: add web-larek starter kit)
=======

>>>>>>> 855102b (fix: webpack env, markup bugs, add some utils)
=======


const cardSoftSkill = new Product('0', "Если планируете решать задачи в тренажёре, берите два.", ProductCategory.SoftSkill, '+1 час в сутках', "/images/Subtract.svg", '750 синапсов');
const cardHardSkill = new Product('1', "Очень полезный навык для фронтендера. Без шуток.", ProductCategory.HardSkill, 'UI/UX-карандаш', '', '10 000 синапсов');
const cardButton = new Product('2', "Если орёт кот, нажмите кнопку.", ProductCategory.Button, 'Кнопка «Замьютить кота»', '', '2000 синапсов');
const cardAdditional = new Product('3', "Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.", ProductCategory.Additional, 'Фреймворк куки судьбы', '', '2500 синапсов');
const cardOther = new Product('4', "Чтобы научиться правильно называть модификаторы, без этого не обойтись.", ProductCategory.Other, 'БЭМ-пилюлька', '', '1500 синапсов');

const initialCards = [cardSoftSkill, cardHardSkill, cardButton, cardAdditional, cardOther];

const pages = document.querySelector('.gallery'); //<main class="gallery"></main>

initialCards.forEach((item) => {
  const catalog = document.querySelector<HTMLTemplateElement>('#card-catalog').content.cloneNode(true) as HTMLElement;
  
  const cardCategory = catalog.querySelector('.card__category');
  const cardTitle = catalog.querySelector('.card__title');
  const cardImage = catalog.querySelector<HTMLImageElement>('.card__image');
  const cardPrice = catalog.querySelector('.card__price');


  // if (cardCategory) {
  //   // cardCategory.textContent = convertCardTypeToText(item.category);
  //   cardCategory.classList.add(getCategoryColor());
  // } 
  if (cardTitle) cardTitle.textContent = item.title;
  if (cardImage) {
    cardImage.src = item.image;
    cardImage.alt = item.title;
  }
  if (cardPrice) cardPrice.textContent = item.price;

  pages?.append(catalog);
})




>>>>>>> 410e068 (class Api)
