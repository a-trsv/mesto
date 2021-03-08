// Задаем имя для попапа редактирования имени и деятельности
const popUpEdit = document.querySelector('.popup_type_edit');

// Задаем имя для попапа добавления карточки
const popUpAdd = document.querySelector('.popup_type_add');

// Задаем имя для Попапа с картинкой
const popUpPhoto = document.querySelector('.popup_type_photo');

const formElement = document.querySelector('.form_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileCaption = document.querySelector('.profile__caption');
const newName = document.querySelector('.form__input_type_name');
const newJob = document.querySelector('.form__input_type_job');

// Создаем константы для работы шаблона с карточками
const cardsContainer = document.querySelector('.elements');
const formElementAdd = document.querySelector('.form_type_add');
const templateElement = document.querySelector('.cardsTemplate');

// Данные для загрузки карточек по умолчанию
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pubg.pw/wp-content/uploads/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Кнопки
// Кнопки для попапа изменения имени и деятельности
const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = document.querySelector('.popup__close-button_type_edit');

// Кнопки для попапа добавления новой карточки
const addCardButton = document.querySelector('.profile__add-button');
const closeAddButton = document.querySelector('.popup__close-button_type_add');

// Кнопки для закрытия попапа с картинкой
const closePopUpPhotoButton = document.querySelector('.popup__close-button_type_photo');

// Функции
// Создаем карточки
function createCard(item) {
	const newItem = templateElement.content.cloneNode(true);
	const title = newItem.querySelector('.element__title');
	title.textContent = item.name;
  const URL = newItem.querySelector('.element__image');
  URL.src = item.link;
  URL.alt = ('На фото:' + ' ' + item.name);
	return newItem;
}

// Рендер страницы с карточками
function cardsRender() {
	const result = initialCards.map(function(item) {
		const newTask = createCard(item);
    addCardsListener(newTask);
		return newTask;
	});

	cardsContainer.append(...result);
}
cardsRender();

// Функция открытия и закрытия попапа
function togglePopUp() {
  popUpEdit.classList.toggle('popup_active');
  getCurrentNameAndJob ();
}

// Открываем и закрываем попап для добавления карточки
function togglePopUpAdd() {
  popUpAdd.classList.toggle('popup_active');
}

// функция удаления карточки
function deleteCard(evt) {
	const target = evt.target;
	const currentCard = target.closest('.element');
	currentCard.remove();
}

// Для закрытия открытого попапа по кнопке
function closePopUp() {
  popUpEdit.classList.remove('popup_active');
  popUpAdd.classList.remove('popup_active');
  popUpPhoto.classList.remove('popup_active');
}

// Ищем клики для удаления карточки
function addCardsListener(element) {
	const deleteButton = element.querySelector('.element__delete-button');
	deleteButton.addEventListener('click', deleteCard);
  // Добавляем возможность проставить лайк
  element.querySelector('.element__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
   });
   const imageLink =  element.querySelector('.element__image');
   const imageCaption = element.querySelector('.element__title');
   imageLink.addEventListener('click', function togglePopUpPhoto(){
    popUpPhoto.classList.toggle('popup_active');
    const popUpPhotoSRC = document.querySelector('.popup__image');
    popUpPhotoSRC.src = imageLink.src;
    const popUpPhotoCaption = document.querySelector('.popup__title_type_photo');
    popUpPhotoCaption.textContent = imageCaption.textContent;

  });
}

// Получаем актуальные значения в placeholder
function getCurrentNameAndJob() {
  newName.value = profileTitle.textContent;
  newJob.value = profileCaption.textContent;
}

// Получите значение полей из свойства value
// Выберите элементы, куда должны быть вставлены значения полей
// Вставьте новые значения с помощью textContent
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = newName.value;
  profileCaption.textContent = newJob.value;
  closePopUp();
}

// Добавляем имя и картинку в карточку, после добавления обновялем слушатель клика на иконку удаления,
// затем очищаем placeholder на значение по умолчанию
function addTaskFormListener(evt) {
	evt.preventDefault();
	const inputName = formElementAdd.querySelector('.form__input_type_addTitle');
	const inputTitle = inputName.value;
  const inputSRC = formElementAdd.querySelector('.form__input_type_addURL');
  const inputLink = inputSRC.value;
	const newTask = createCard({ name: inputTitle, link: inputLink});
	addCardsListener(newTask);
	cardsContainer.prepend(newTask);
	inputName.value = '';
  inputSRC.value = '';
  closePopUp();
}

// Сохранить введенные данные для создания карточки и обновить содержимое всех карточек
formElementAdd.addEventListener('submit', addTaskFormListener);

// Сохранить введенные данные для изменения имени и деятельности
formElement.addEventListener('submit', formSubmitHandler);

// Открытие и закрытие попапа для изменения имени и деятельности
editButton.addEventListener('click', togglePopUp);
closeEditButton.addEventListener('click', closePopUp);

// Открытие и закрытие попапа для добавления карточек
addCardButton.addEventListener('click', togglePopUpAdd);
closeAddButton.addEventListener('click', closePopUp);

// Закрытие попапа просмотра фотографии по кнопке
closePopUpPhotoButton.addEventListener('click', closePopUp);
