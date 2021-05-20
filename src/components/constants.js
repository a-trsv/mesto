export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pcali.ru/wp-content/uploads/chelyabinsk-oblast.jpg'
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

export const validSettings = {
    formSelector: '.form', // def. popup__form
    inputSelector: '.form__input', // def. popup__input
    submitButtonSelector: '.form__save-button', // def. popup__button
    inactiveButtonClass: 'form__save-button_type_disabled', // def. popup__button_disabled
    inputErrorClass: 'form__input_type_error', // def. popup__input_type_error
    errorClass: 'form__error_type_visible' // def. popup__error_visible
  };

export const cardListSection = '.elements';

// Sprint 8, перенос констант из index.js, согласно ТЗ
// Объявление селекторов
export const popUpSelector = '.popup_type_edit';
export const popUpAddCardSelector = '.popup_type_add';
export const profileTitleSelector = '.profile__title';
export const profileCaptionSelector = '.profile__caption';

// Кнопки
// Кнопка для попапа изменения имени и деятельности
export const openEditForm = document.querySelector('.profile__edit-button');
// Кнопка для попапа добавления новой карточки
export const openAddForm = document.querySelector('.profile__add-button');

// Задаем имя для попапа редактирования имени и деятельности
export const popUpEdit = document.querySelector('.popup_type_edit');
// Задаем имя для попапа добавления карточки
export const popUpAdd = document.querySelector('.popup_type_add');

// Находим инпуты в форме
export const newName = document.querySelector('.form__input_type_name');
export const newJob = document.querySelector('.form__input_type_job');

// Создаем константы для работы шаблона с карточками
export const formElementAdd = document.querySelector('.form_type_add');
// Для работы с отображением полного вида картинок
export const inputName = formElementAdd.querySelector('.form__input_type_addTitle');
export const inputSRC = formElementAdd.querySelector('.form__input_type_addURL');
export const escEvtKey = "Escape";
export const cardTemplate = '.cardsTemplate';