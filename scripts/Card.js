import { popUpPhotoSRC, popUpPhotoCaption, openPopup, popUpPhoto } from './index.js'
class Card {
  constructor(item, cardSelector) {
    this._name = item.name
    this._url = item.link
    // Подпись для попапа с картинкой
    this._caption = item.name
    this._cardSelector = cardSelector
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
  
    return cardElement;
  }

  _setEventListeners() {
		this._element.querySelector('.element__like-button').addEventListener('click', () => {
			this._handleLikeButtonClick();
		});
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
			this._handleDeleteButtonClick();
		});
    // Слушатель клика на картинку для открытия попапа
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenImageClick();
    })
	}

  _handleLikeButtonClick() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleDeleteButtonClick() {
    this._element.remove();
  }

  _handleOpenImageClick() {
    openPopup(popUpPhoto); // Применяем общую функцию открытия попапа
    popUpPhotoSRC.src = this._url;
    popUpPhotoSRC.alt = ('Крупным планом:' + ' ' + this._name);
    popUpPhotoCaption.textContent = this._name;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._url;
    this._element.querySelector('.element__image').alt = ('На фото:' + ' ' + this._name);
    this._setEventListeners(); // навесим слушатели кликов лайка и удаления карточик
    return this._element;
    
    }
  }

export {
  Card
}