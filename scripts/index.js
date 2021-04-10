// Sprint 7
import { Card } from './Card.js';
import { initialCards, validSettings } from './constants.js';
import { FormValidator } from './FormValidator.js';
//Sprint7
// Задаем имя для контейнера для формирования карточек
const container = document.querySelector('.elements');
// Задаем имя для попапа редактирования имени и деятельности
const popUpEdit = document.querySelector('.popup_type_edit');

// Задаем имя для попапа добавления карточки
const popUpAdd = document.querySelector('.popup_type_add');

const editFormValidator = new FormValidator(validSettings, popUpEdit);
const cardFormValidator = new FormValidator(validSettings, popUpAdd);

// Задаем имя для Попапа с картинкой
const popUpPhoto = document.querySelector('.popup_type_photo');

const formElement = document.querySelector('.form_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileCaption = document.querySelector('.profile__caption');
const newName = document.querySelector('.form__input_type_name');
const newJob = document.querySelector('.form__input_type_job');

// Создаем константы для работы шаблона с карточками
const formElementAdd = document.querySelector('.form_type_add');

// Для работы с отображением полного вида картинок
const popUpPhotoSRC = document.querySelector('.popup__image');
const popUpPhotoCaption = document.querySelector('.popup__title_type_photo');
const inputName = formElementAdd.querySelector('.form__input_type_addTitle');
const inputSRC = formElementAdd.querySelector('.form__input_type_addURL');

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

// Функции открытия и закрытия любого попапа
function openPopup(popup) {
  popup.classList.add('popup_active');
  // Накладываем слушатель клика ESC
  document.addEventListener('keydown', regESCButtonPressed);
  document.addEventListener('click', regPopUpMissedClick);
}

// Ищем уже открытый попап и закрываем его
function closePopUp() {
  const openedPopup = document.querySelector('.popup_active');
  openedPopup.classList.remove('popup_active');
  // Снимаем слушатель клика ESC
  document.removeEventListener('keydown', regESCButtonPressed);
  document.removeEventListener('click', regPopUpMissedClick);
}

// Закрываем попап по нажатию esc
function regESCButtonPressed(evt) {
  if(evt.key === "Escape") {
    closePopUp();
  }
}

// Закрываем попап по клику вне его области
function regPopUpMissedClick(evt) {
  if(evt.target.classList.contains('popup')) {
    closePopUp();
  }
}

// Функция открытия попапа для измения имени и деятельности
function togglePopUp() {
  openPopup(popUpEdit);
  getCurrentNameAndJob ();
}

// Открываем попап для добавления карточки
function togglePopUpAdd() {
  openPopup(popUpAdd);
  formElementAdd.reset();
}

// Получаем актуальные значения в placeholder
function getCurrentNameAndJob() {
  newName.value = profileTitle.textContent;
  newJob.value = profileCaption.textContent;
}

// Получите значение полей из свойства value
// Выберите элементы, куда должны быть вставлены значения полей
// Вставьте новые значения с помощью textContent
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = newName.value;
  profileCaption.textContent = newJob.value;
  closePopUp();
}

// Добавляем имя и картинку в карточку, после добавления обновляем слушатель клика на иконку удаления,
// затем очищаем placeholder на значение по умолчанию
function addTaskFormListener(evt) {
	evt.preventDefault();
	const inputTitle = inputName.value;
  const inputLink = inputSRC.value;
  renderCard({ name: inputTitle, link: inputLink}, true);
  closePopUp();
}

function createCard (item) {
  const card = new Card (item, '.cardsTemplate');
	return card.generateCard();
}

function renderCard (item, toEnd) {
  const card = createCard(item);
  const method = toEnd ? 'prepend' : 'append';
  container[method](card);
}

initialCards.forEach((item) => {
  renderCard(item);
});

// Sprint 7
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

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

export {
  popUpPhotoSRC,
  popUpPhotoCaption,
  popUpPhoto,
  openPopup,
}