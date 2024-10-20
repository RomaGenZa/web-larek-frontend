# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP: 
- слой представления, отвечает за отображение данных на странице, 
- слой данных, отвечает за хранение и изменение данных
- презентер, отвечает за связь представления и данных.

### Базовый код

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы: 
- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.  
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие 

### Слой данных  


#### Класс CartData  
Реализует интерфейс `ICart` и предоставляет логику работы с корзиной покупок.

- Конструктор данного класса создает корзину с начальным списком продуктов (по умолчанию пустым), а так же подписывает корзину на события, чтобы автоматически добавлять или удалять товары при соответствующих событиях. 

- `itemsInCart` массив, в котором хранятся товары, добавленные в корзину.
- `eventsBroker` управление событиями, которые используется для обмена данными между компонентами приложения.  


Конструктор принимает один параметр `eventsBroker: IEvents` 

  - `addItem(item)` добавление товара  
  - `removeItem(item)` удаление товара  
  - при событии `events.cart.initOrderCreation` проверяется наличие товаров в корзине, и, если они есть, эмитируется событие `events.order.collectPaymentInfo` с данными товаров.
  - при событии `events.cart.clearCart` вызывается метод `removeAllItems()` для очистки корзины.


Методы:  

  - `addItem(item: TProductCart): void` добавляет новый товар в корзину и эмитирует событие `events.cart.itemsChanged`, чтобы оповестить систему о изменении содержимого корзины..  
  - `removeItem(item: TProductCart): void` удаляет товар из корзины (по идентификатору id) и также эмитирует событие `events.cart.itemsChanged`.
  - `getItems(): TProductCart[]` возвращает текущий список товаров в корзине.  
  - `isItemInCart(id: string): boolean` проверяет, присутствует ли товар с заданным id в корзине.  
  - `removeAllItems(): void` очищает корзину, удаляя все товары, и эмитирует событие `events.cart.itemsChanged` для оповещения о пустой корзине.


#### Класс DefaultRestClient  
Реализует API-клиент для взаимодействия с REST-сервером. Он выполняет запросы к API для получения списка продуктов, отдельного продукта, а также создания заказа.  

Конструктор данного класса отвечает за инициализацию API-клиента, который взаимодействует с сервером для выполнения запросов на получение продуктов и создание заказа. Он также настраивает обработку событий через объект `EventEmitter`.

- `eventBroker` объект типа `EventEmitter`, который используется для генерации событий внутри приложения. Через этот объект передаются события, такие как успешная загрузка продуктов или создание заказа. Это позволяет другим компонентам приложения реагировать на изменения данных.

- `api` экземпляр класса Api, который используется для выполнения HTTP-запросов  (GET, POST и т.д.) к REST API сервера.  


Методы:  

  - `getProductList()` асинхронный метод для получения списка продуктов. Выполняет GET-запрос на `/product` с помощью `api`. Если запрос успешен, результат сохраняется в переменную `listItems`. Генерирует событие `DidLoadProducts`, передавая полученные продукты другим слушателям.
  - `getProductItem(id: string)` асинхронный метод для создания заказа. Принимает объект order типа `IOrder`, содержащий данные заказа. Выполняет POST-запрос на `/order` с данными заказа и генерит событие `DidCreateOrder`, передавая результат транзакции.  


#### Класс OrderProcessor  
Отвечает за создание и обработку заказа, включая валидацию данных и взаимодействие с сервером для передачи данных заказа.  

- `order?: IOrder` хранение данных текущего заказа, которые собираются и обновляются на разных этапах оформления заказа.  
- `eventsBroker: IEvents` управление взаимодействием между компонентами приложения с помощью событий.  
- `restClient: IRESTClient` обеспечение взаимодействия с внешними сервисами для обработки заказов.

Конструктор принимает два параметра:  
  - `eventsBroker: IEvents` используется для подписки на события, связанные с созданием и обработкой заказа, а также для эмиссии событий в процессе выполнения этих операций.
  - `restClient: IRESTClient` взаимодействие с сервером через REST API, который используется для создания заказа и отправки его данных на сервер.  

Методы:  


  - `startOrderCreation(items: TProductCart[]): void` создает новый объект заказа с информацией о товарах и их общей стоимости. 
  - `validateAddressInput(input: string): void`  проверяет корректность введенного адреса и уведомление системы о результате валидации.
  - `validatePhoneInput(input: string): void` проверяет корректность введенного номера телефона и уведомление системы о результате валидации.
  - `validateEmailInput(input: string): void` проверяет корректность введенного email и уведомление системы о результате валидации.  


#### Класс ProductsData  
Отвечает за управление данными о продуктах в приложении. Его основная зона ответственности — загрузка, хранение и предоставление информации о товарах.  

- `productsList: IProduct[]` хранилище всех загруженных продуктов, полученных с сервера.
- `eventsBroker: IEvents` объект событийного брокера, используемый для уведомления других компонентов системы о событиях, связанных с загрузкой продуктов или поиск конкретного продукта.
- `restClient: IRESTClient` обеспечение взаимодействия с внешним API для получения данных о продуктах.

Конструктор принимает два параметра:
  - `eventsBroker: IEvents` используется для подписки на события, связанные с созданием и обработкой заказа, а также для эмиссии событий в процессе выполнения этих операций.
  - `restClient: IRESTClient` взаимодействие с сервером через REST API, который используется для создания заказа и отправки его данных на сервер. 


Методы:  
  - `getProducts(): Promise<TProductCard[]>` загрузка и возврат списка всех продуктов с сервера и уведомление системы об успешной загрузке.
  - `getProductById(id: string): Promise<TProductFullInfo | undefined>` загрузка данных о конкретном продукте.



### Классы представления
Все классы представления отвечают за отображение внутри контейнера (DOM-элемент) передаваемых в них данных.  


#### Класс Page
Объединяет различные компоненты страницы (заголовок, галерею, модальные окна) и управляет их взаимодействием через событийный брокер. Он отвечает за отображение данных, открытие модальных окон и обработку событий, таких как выбор товаров или завершение заказа.  


- `element: HTMLElement` содержит DOM-элемент страницы, внутри которого находятся все другие элементы.
- `pageHead: PageHeader` управляет заголовком и навигационными элементами, такими как меню или кнопки корзины.
- `pageGallery: PageGallery` отвечает за отображение списка товаров в виде галереи и обработку взаимодействий с товарами.
- `modalContainer: ModalContainer` используется для открытия, закрытия и смены содержимого модальных окон (например, предпросмотр товара, корзина, контактная информация).
- `eventBroker: IEvents` управляет событиями и позволяет координировать действия между различными компонентами страницы, включая заголовок, галерею, корзину и модальные окна.


Конструктор принимает четыре параметра:   

- `element: HTMLDivElement` является контейнером для всей страницы и используется для поиска других дочерних элементов.
- `eventBroker: IEvents` используется для координации событий между различными частями интерфейса (например, открытие модальных окон или обновление корзины).
- `productsData: ProductsData` используется для получения данных о товарах и их детальной информации (например, при открытии предпросмотра товара).
- `cartData: CartData` используется для получения товаров, добавленных в корзину, и взаимодействия с корзиной.  


Методы:
- `openCardPreview(item: TProductFullInfo)` загружает данные о выбранном товаре и отображает их в модальном окне.
- `openCartModal(items: TProductCart[])` отображает текущие товары, добавленные в корзину, и выводит итоговую цену.
- `openPaymentModal()` отображает форму для ввода информации об оплате заказа.
- `openContactModal()` отображает форму для ввода контактных данных пользователя.
- `openTransactionModal(transaction: TTransaction | Error)` отображает результат завершенной транзакции либо сообщение об ошибке.
- `eventBroker.on()` подписывается на события из eventBroker и обрабатывает их.  


#### Класс PageHeader
Отвечает за отображение количества товаров в корзине и обработку нажатия на кнопку корзины в заголовке страницы. Он взаимодействует с системой через событийный брокер, реагируя на изменения в корзине и инициируя открытие корзины при нажатии на соответствующую кнопку.  


- `openCartButton: HTMLButtonElement` кнопка для открытия корзины.
- `productsInCartCount: HTMLSpanElement` элемент, отображающий количество товаров в корзине.
- `eventBroker: IEvents` объект для подписки на события и эмиссии событий.  


Конструктор принимает два параметра:
- `container: HTMLElement` элемент заголовка (например, элемент с классом .header), который содержит элементы управления, такие как кнопка корзины и индикатор количества товаров.
- `eventBroker: IEvents` объект событийного брокера, который управляет событиями в приложении.  


Методы: 
- `onCartButtonClick()` вызывается при нажатии на кнопку корзины.
- `updateCounter(items: TProductCart[])` обновляет количество товаров в корзине.  


#### Класс PageGallery
Управляет отображением товаров в виде карточек на странице. Он принимает данные о продуктах через событийный брокер и автоматически обновляет галерею товаров, добавляя новые карточки в контейнер.  


- `element: HTMLElement` содержит DOM-элемент, в который будут добавлены карточки товаров.
- `eventsBroker: IEvents` используется для обработки событий, связанных с данными продуктов (например, получение списка продуктов для отображения).
- `cards: ProductCard[]` хранит созданные экземпляры карточек товаров для последующего отображения и возможного управления ими.  


Конструктор принимает два параметра. Обеспечивает подписку на события, связанные с продуктами и передачу данных для обновления галереи.  
- `container: HTMLElement` используется для размещения карточек товаров в галерее.
- `eventBroker: IEvents` объект событийного брокера для координации взаимодействия между компонентами.  


Методы:
- `updateData(products: TProductCard[])` вызывается при получении списка продуктов через событийный брокер. Он создает карточки для каждого товара, используя шаблон карточки, заполняет их данными, добавляет в массив cards и отображает в DOM через контейнер.  


#### Класс ProductCard
Отвечает за отображение карточки товара на странице, включая его изображение, название, категорию и цену. Он также реагирует на клики пользователя по карточке и генерирует событие выбора товара. Его зона ответственности — управление отдельной карточкой товара и обработка данных для её визуального представления.  


- `eventsBroker: IEvents` событийный брокер.
- `element: HTMLButtonElement` корневой элемент карточки товара.
- `image: HTMLImageElement` изображение товара.
- `category: HTMLSpanElement` элемент, отображающий категорию товара.
- `title: HTMLHeadingElement`  заголовок карточки (название товара).
- `price: HTMLSpanElement` элемент, отображающий цену товара.  


Конструктор принимает два параметра:
- `template: HTMLTemplateElement` HTML-шаблон карточки товара.
- `eventsBroker: IEvents` объект событийного брокера.  


Методы:
- `get id(): string` геттер для получения ID товара.
- `setData(product: TProductCard)` метод для установки данных в карточку товара.
- `render(): HTMLElement` метод для рендеринга карточки товара.
- `clearCategory()` метод для очистки предыдущих стилей категории.


#### Класс ModalContainer  
Управляет отображением модального окна в веб-приложении, отвечает за добавление и замену контента внутри окна, а также за его корректное закрытие. Он освобождает ресурсы контента при закрытии и использует событийный брокер для обработки действий, связанных с модальным окном, таких как закрытие по клику на кнопку.  


- `element: HTMLDivElementv` элемент, в котором находится всё модальное окно. Включает в себя кнопку закрытия и контейнер для контента.
- `closeButton: HTMLButtonElement` отвечает за закрытие модального окна. При нажатии на эту кнопку отправляется событие для закрытия модального окна.
- `contentContainer: HTMLDivElement` область внутри модального окна, куда динамически добавляется и заменяется контент (реализуемый через интерфейс `IModalContainerContent`).
- `content?: IModalContainerContent` хранит текущий контент модального окна. Контент может изменяться, а при замене или закрытии освобождаются ресурсы.  


Конструктор принимает два параметра:  
- `element: HTMLDivElement` это сам контейнер модального окна, внутри которого размещаются все элементы управления и контент.
- `eventBroker: IEvents` объект событийного брокера, который используется для отправки и получения событий, связанных с валидацией данных и завершением заказа.  


Методы:
- `setContent(content: IModalContainerContent): void` заменяет старый контент новым, если ранее был установлен контент. Старый контент удаляется (вызовом метода dispose), и новый контент добавляется в контейнер.
- `open(): void` отображает модальное окно, добавляя к нему CSS-класс 'modal_active', который делает его видимым.
- `close(): void` закрывает модальное окно, вызывая метод dispose текущего контента для очистки ресурсов, и удаляет CSS-класс 'modal_active', делая окно невидимым.  


#### Класс ProductCardPreview  
Предназначен для отображения подробного превью товара в модальном окне. Его основная зона ответственности — визуализация расширенной информации о товаре, такой как изображение, цена, описание, а также возможность добавления товара в корзину.  


- `eventsBroker: IEvents` событийный брокер.
- `element: HTMLButtonElement` корневой элемент карточки товара.
- `image: HTMLImageElement` изображение товара.
- `category: HTMLSpanElement` элемент, отображающий категорию товара.
- `title: HTMLHeadingElement` заголовок карточки (название товара).
- `price: HTMLSpanElement` элемент, отображающий цену товара.
- `description: HTMLParagraphElement` описание товара.
- `addToCartButton: HTMLButtonElement` кнопка "Добавить в корзину".  


Конструктор принимает два параметра:
- `template: HTMLTemplateElement` HTML-шаблон для предварительного просмотра товара.
- `eventsBroker: IEvents` объект событийного брокера.


Методы:
- `setData(product: TProductFullInfo)` метод для заполнения карточки данными о товаре.
- `render(): HTMLElement` метод для рендеринга карточки товара.
- `dispose()` метод для очистки и удаления элемента.
- `clearCategory()` метод для очистки стилей категории.  


#### Класс Cart
Отвечает за отображение корзины товаров в пользовательском интерфейсе. Визуализирует список товаров и общую стоимость.  


- `eventBroker: IEvents` управление событиями между корзиной и другими компонентами приложения.  
- `element: HTMLElement` хранение и управление основным контейнером корзины в пользовательском интерфейсе.
- `itemsList: HTMLUListElement` отображение списка товаров в корзине.
- `price: HTMLSpanElement` отображение итоговой суммы товаров, добавленных в корзину.
- `createOrderButton: HTMLButtonElement` предоставление пользователю возможности создать заказ на основе товаров, добавленных в корзину.
- `itemTemplate: HTMLTemplateElement` генерация карточек товаров для визуализации в списке товаров корзины.
- `cartItems: CartItem[]` список отображаений в корзине.  


Конструктор принимает три параметра:  

  - `template: HTMLTemplateElement` шаблон для создания основного контейнера корзины. Используется для клонирования DOM-элементов, которые представляют корзину.
  - `itemTemplate: HTMLTemplateElement` шаблон для создания отдельных элементов товаров в корзине. Используется для генерации карточек товаров внутри корзины.
  - `eventsBroker: IEvents` используется для подписки на события, связанные с созданием и обработкой заказа, а также для эмиссии событий в процессе выполнения этих операций.  

Методы:  

- `setData(items: TProductCart[]): void` обновление содержимого корзины и расчет итоговой суммы товаров.
- `render(): HTMLElement` возвращает основной DOM-элемент для рендеринга на странице.
- `dispose(): void` очистка и удаление корзины из интерфейса.
- `clearData(): void` очистка данных корзины перед обновлением ее содержимого.  


#### Класс CartItem  
отвечает за представление одного товара в корзине и взаимодействие с пользователем (например, удаление товара). Он управляет отображением данных товара (индекс, название, цена) и взаимодействует с системой событий для удаления товаров из корзины.

- `element: HTMLElement` визуальное представление товара в корзине.
- `index: HTMLSpanElement` отображение индекса товара в списке корзины.
- `title: HTMLSpanElement` отображение названия товара в корзине.
- `price: HTMLSpanElement` отображение цены товара или сообщение об отсутствии цены.
- `deleteButton: HTMLSpanElement` предоставляет пользователю возможность удалить товар из корзины.
- `eventBroker: IEvents` взаимодействие с системой событий для удаления товаров.

Конструктор принимает два параметра:
- `template: HTMLTemplateElement` шаблон для создания DOM-элемента, представляющего отдельный товар в корзине.
- `template: HTMLTemplateElement` объект событийного брокера, через который класс взаимодействует с системой событий.

Методы:
- `setData(index: number, item: TProductCart): void` инициализация и отображение данных товара в элементе корзины.
- `render(): HTMLElement` возвращает DOM-элемент для отображения на странице.
- `dispose(): void` удаление элемента товара из корзины и очистка его данных.  


#### Класс PaymentInfo
Управляет формой для выбора способа оплаты и ввода адреса, обрабатывает события валидации и взаимодействует с системой через событийный брокер. Он обеспечивает корректный ввод данных для дальнейшего оформления заказа. 


- `element: HTMLFormElement` основной HTML-элемент формы.
- `buttonOnlinePayment: HTMLButtonElement` кнопка выбора оплаты онлайн.
- `buttonCashPayment: HTMLButtonElement` кнопка выбора оплаты наличными.
- `buttonNext: HTMLButtonElement` кнопка для перехода к следующему шагу оформления заказа.
- `addressInput: HTMLInputElement` поле для ввода адреса.
- `isAddressValid: boolean` флаг, указывающий на валидность адреса.
- `didPickPaymentType: boolean` флаг, указывающий на выбор способа оплаты.
- `errorMessage: HTMLSpanElement` лемент для отображения сообщений об ошибках.
- `buttonActiveClass: string` CSS-класс для активной кнопки.
- `buttonInactiveClass: string` CSS-класс для неактивной кнопки.  


Конструктор принимает два параметра:
- `template: HTMLTemplateElement` HTML-шаблон формы.
- `eventBroker: IEvents` объект для управления событиями в системе.  


Методы:
- `render()` возвращает HTML-элемент формы.
- `dispose()` удаляет элемент формы и освобождает память.
- `updateNextButton()` обновляет состояние кнопки "Далее" в зависимости от валидности адреса и выбора способа оплаты.  


#### Класс ContactInfo  
Управляет формой ввода контактных данных для завершения заказа. Он обрабатывает ввод данных, выполняет валидацию полей (телефон и email), отображает ошибки при неправильном вводе и управляет состоянием кнопки отправки формы, позволяя завершить заказ только при валидных данных.  


- `element: HTMLFormElement` основная форма для сбора контактной информации (email, телефон).
- `inputPhone: HTMLInputElement` ввод телефона пользователем.
- `inputEmail: HTMLInputElement` ввод email пользователем.
- `submitButton: HTMLButtonElement` кнопка для отправки формы (завершения заказа), которая становится активной только при валидных данных.
- `isPhoneValid: {isValid: boolean, message?: string}` отслеживает состояние валидации телефона (валиден или нет, и если не валиден — сообщение об ошибке).
- `isEmailValid: {isValid: boolean, message?: string}` отслеживает состояние валидации email (валиден или нет, и если не валиден — сообщение об ошибке).
- `errorMessage: HTMLSpanElement` вывод сообщений об ошибках валидации для пользователя.


Конструктор принимает два параметра:  
- `template: HTMLTemplateElement` шаблон, который используется для клонирования формы сбора контактных данных (email, телефон) и других элементов управления.
- `eventBroker: IEvents` объект событийного брокера, который используется для отправки и получения событий, связанных с валидацией данных и завершением заказа.  


Методы:
- `render(): HTMLElement` отобразить форму ввода контактных данных.
- `dispose(): void` удалить форму и освободить связанные ресурсы, когда она больше не нужна.
- `updateNextButton(): void` управление состоянием кнопки отправки (активация/деактивация) в зависимости от валидности введенных данных.


#### Класс TransactionModal  
Предназначен для отображения информации о создании заказа на сервере в модальном окне.  


- `eventBroker: IEvents` событийный брокер.
- `element: HTMLElement` основной элемент модального окна.
- `responseMessage: HTMLSpanElement` элемент для вывода сообщения о результате транзакции.  


Конструктор принимает два параметра:  
- `template: HTMLTemplateElement` шаблон для модального окна.
- `eventBroker: IEvents` объект событийного брокера.  


Методы
- `setError(message: string)` метод для отображения ошибки.
- `setData(transaction: TTransaction)` метод для отображения успешной транзакции.
- `render(): HTMLElement` метод для рендеринга модального окна.
- `dispose(): void` метод для очистки и удаления элемента.


### Слой коммуникации  

## Взаимодействие компонентов  
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.  

- `eventBroker` Создаёт экземпляр EventEmitter, который будет использоваться для связи между различными компонентами через события.  
- `apiDataProvider` этот объект предоставляет интерфейс для взаимодействия с сервером по основному API, используя базовый URL, указанный в API_URL.  
- `restClient` REST-клиент, который обрабатывает HTTP-запросы (например, создание заказов, отправка данных на сервер). Он использует apiDataProvider для отправки запросов.  
- `productsData` этот объект отвечает за управление данными о продуктах, такими как получение списка товаров с сервера и их обработка.
- `cart` управляет данными корзины (добавление/удаление товаров, пересчёт стоимости).
- `imagesDataProvider` объект, который обеспечивает взаимодействие с CDN для загрузки изображений.
- `imagesClient` клиент для получения изображений с сервера (например, изображений товаров) через CDN.
- `orderProcessor` HTML-элемент с классом .page, который является контейнером для всего пользовательского интерфейса..
- `page` этот объект управляет отображением и интерактивностью страницы. Он связывает интерфейс с данными о продуктах и корзине, а также использует eventBroker для синхронизации событий с другими компонентами.
- `productsData.getProducts().then()` Инициализирует получение списка продуктов при загрузке страницы, используя метод getProducts объекта productsData. Этот метод делает асинхронный запрос на сервер, чтобы загрузить продукты..


