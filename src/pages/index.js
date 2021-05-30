import { Card } from '../components/Card.js';
import { 
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
  inputName,
  inputSRC,
  cardTemplate,
  profileAvatarSelector,
  popUpAvatar,
  openAvatarForm,
  profileAvatarFormSelector,
  newAvatar,
  popUpDelSelector,
  popUpDeleteCard
} from '../components/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import PopUpWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

// Sprint 9
import Api from '../components/Api.js'
import PopupConfirmDelete from '../components/PopupConfirmDelete.js';
const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1',
  groupId: 'cohort-24',
  token: '4d34d552-bc81-44cb-b18a-2296a1ced45f'
})

api.getUserApi()
.then((apiUserData) => {
  // Загрузка имени и деятельности с сервера
  userInfo.setUserInfo({
    name: apiUserData.name,
    about: apiUserData.about,
    id: apiUserData._id
  })
  // Загрузка Аватарки с сервера
  userInfo.setUserAvatar(apiUserData.avatar)
})

api.getCards()
.then((apiCardData) => {
  cardsList.renderItems(apiCardData)
})

// Попап для редактирования имени и деятельности
const userInfo = new UserInfo({profileTitleSelector, profileCaptionSelector, profileAvatarSelector})
const popupForm = new PopUpWithForm(popUpSelector, editFormSubmitHandler)
popupForm.setEventListeners()
openEditForm.addEventListener(
  'click',
  () => {
    popupForm.open()
    editFormValidator.resetValidation()
    const newUserInfo = userInfo.getUserInfo()
    newName.value = newUserInfo.name
    newJob.value = newUserInfo.about
  }
)
// Сабмит для попапа редактирования имени и деятельности
function editFormSubmitHandler() {
  renderLoading(true, popUpEdit)
  const userInfoArray = {
    name: newName.value,

    about: newJob.value
  }
  api.patchUserApi(userInfoArray)
  .then(()=> {
    userInfo.setUserInfo(userInfoArray)
    popupForm.close()
  })
  .finally(() => {
    renderLoading(false, popUpEdit)
  })
}

const popupAvatarForm = new PopUpWithForm(profileAvatarFormSelector, uploadAvatarHandler)
popupAvatarForm.setEventListeners()
openAvatarForm.addEventListener(
  'click',
  () => {
    popupAvatarForm.open()
    avatarFormValidator.resetValidation()
  }
)

function uploadAvatarHandler() {
  renderLoading(true, popUpAvatar)
  const avatarSRC = newAvatar.value
  api.patchUserAvatar(avatarSRC)
  .then(() => {
    userInfo.setUserAvatar(avatarSRC)
    popupAvatarForm.close()
  })
  .finally(() => {
    renderLoading(false, popUpAvatar)
  })
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
  renderLoading(true, popUpAdd)
  const cardInfoArray = {
    name: inputName.value,
    link: inputSRC.value
  }
  api.postCard(cardInfoArray)
  .then((apiCardData) => {
    createCardFunction({
      name: apiCardData.name,
      link: apiCardData.link,
      likes: apiCardData.likes,
      _id: apiCardData._id,
      owner: apiCardData.owner
    })
    popupAdd.close();
  })
  .finally(() => {
    renderLoading(false, popUpAdd)
  })
}

// Попап для удаления карточек
const popupConfirmDelete = new PopupConfirmDelete(popUpDelSelector, deleteCardHandler)
popupConfirmDelete.setEventListeners()
function deleteCardClickHandler(cardId, newCard) {
  popupConfirmDelete.open(cardId, newCard)
}
function deleteCardHandler(cardId, newCard) {
  renderLoading(true, popUpDeleteCard)
  api.deleteCard(cardId)
  .then(() => {
    newCard.remove()
    popupConfirmDelete.close()
  })
  .finally(() => {
    renderLoading(false, popUpDeleteCard)
  })
}

// Создание и рендер для карточек "по умолчанию"
const cardsList = new Section({
  renderer: (item) => {
    createCardFunction(item)
    },
  }, cardListSection);

  function createCardFunction(item) {
    const card = new Card(item, cardTemplate, userInfo.getUserId(), cardImageClickHandler, deleteCardClickHandler, api)
    const newCard = card.generateCard();
    cardsList.addItem(newCard);
  }

// Попап с полноразмерным фото
const popupWithImage = new PopupWithImage('.popup_type_photo')
popupWithImage.setEventListeners()
function cardImageClickHandler(url, text) {
  popupWithImage.open(url, text)
}

// Валидация
const editFormValidator = new FormValidator(validSettings, popUpEdit);
const cardFormValidator = new FormValidator(validSettings, popUpAdd);
const avatarFormValidator = new FormValidator(validSettings, popUpAvatar);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// UX: визуализация процесса загрузки для кнопок сабмита
function renderLoading(isLoading, popupElement) {
  if(isLoading && popupElement.classList.contains('popup_type_add')) {
    popupElement.querySelector('.form__save-button').textContent = 'Создать'
  }
  else if (isLoading) {
    popupElement.querySelector('.form__save-button').textContent = 'Сохранение...'
  } else {
    popupElement.querySelector('.form__save-button').textContent = 'Сохранить'
  }
}
