import Card from '../components/Card.js';
import { 
  initialCards, 
  validSettings, 
  cardListSection,
  popUpSelector,
  popUpAddCardSelector,
  profileTitleSelector,
  profileCaptionSelector,
  openEditForm,
  openAddForm, 
  popUpEdit,
  popUpAdd,
  newName, 
  newJob, 
  container,
  inputName,
  inputSRC
} from '../components/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopUpWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import '../pages/index.css';
import html from '../index.html';

// Попап для редактирования имени и деятельности
const userInfo = new UserInfo({profileTitleSelector, profileCaptionSelector})
const popupForm = new PopUpWithForm(popUpSelector, editFormSubmitHandler)
popupForm.setEventListeners()
openEditForm.addEventListener(
  'click',
  () => {
    popupForm.open()
    editFormValidator.resetValidation();
    const newUserInfo = userInfo.getUserInfo();
    newName.value = newUserInfo.name;
    newJob.value = newUserInfo.job
  }
)
// Сабмит для попапа редактирования имени и деятельности
function editFormSubmitHandler() {
  const userInfoArray = {
    name: newName.value,
    job: newJob.value
  }
  userInfo.setUserInfo(userInfoArray)
  popupForm.close()
}

// Попап для добавления карточек
const popupAdd = new PopUpWithForm(popUpAddCardSelector, addCardSubmitHandler)
popupAdd.setEventListeners()
openAddForm.addEventListener(
  'click',
  () => {
    popupAdd.open()
    cardFormValidator.resetValidation();
  }
)
// Сабмит для попапа для добавления карточек
function addCardSubmitHandler() {
  const card = new Card ({name: inputName.value, link: inputSRC.value}, '.cardsTemplate', cardImageClickHandler);
  const newCard = card.generateCard()
  container.prepend(newCard)
  popupAdd.close();
}

// Попап с полноразмерным фото
const popupWithImage = new PopupWithImage('.popup_type_photo')
popupWithImage.setEventListeners()
function cardImageClickHandler(url, text) {
  popupWithImage.open(url, text)
}

// Создание и рендер для карточек "по умолчанию"
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.cardsTemplate', cardImageClickHandler);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    },
  }, cardListSection);
// отрисовка карточек
cardsList.renderItems();

// Валидация
const editFormValidator = new FormValidator(validSettings, popUpEdit);
const cardFormValidator = new FormValidator(validSettings, popUpAdd);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();