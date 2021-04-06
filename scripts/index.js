// Sprint 7
import { Card } from './Card.js';
import { initialCards, validSettings } from './constants.js';
import { FormValidator } from './FormValidator.js';
//Sprint7

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
const formElementAdd = document.querySelector('.form_type_add');

// Для работы с отображением полного вида картинок
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
  clearFormErrors();
}

// Ищем уже открытый попап и закрываем его
function closePopUp() {
  const openedPopup = document.querySelector('.popup_active');
  openedPopup.classList.remove('popup_active');
  // Снимаем слушатель клика ESC
  document.removeEventListener('keydown', regESCButtonPressed);
  document.removeEventListener('click', regPopUpMissedClick);
  formElementAdd.reset();
}

// Поиск и удаление ошибок в форме при закрытии невалидной формы
function clearFormErrors() {
  // Очистка span
  const formError = document.querySelectorAll('.form__error');
  formError.forEach((error) => {
    error.classList.remove('form__error_type_visible');
  });
  // Снятие красного бордера
  const inputError = document.querySelectorAll('.form__input');
  inputError.forEach((error) => {
    error.classList.remove('form__input_type_error');
  });
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
  const card = new Card({ name: inputTitle, link: inputLink});
	const cardElement = card.generateCard();
	elements.prepend(cardElement);
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

// Sprint 7
// Находим контейнер, в котором будут карточки: <section class="elements">
const elements = document.querySelector('.elements');

initialCards.forEach((item) => {
  const card = new Card (item);
	const cardElement = card.generateCard();
	elements.append(cardElement);
});

// Подключаем валидацию форм
const editFormValidator = new FormValidator(validSettings, popUpEdit);
const cardFormValidator = new FormValidator(validSettings, popUpAdd);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();
//Sprint7 END

export {
  popUpPhoto,
  openPopup,
}