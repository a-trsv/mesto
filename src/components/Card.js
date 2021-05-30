class Card {
  constructor(item, cardSelector, thisUser, handleCardClick, deleteCardClick, api) {
    this._name = item.name
    this._url = item.link
    this._id = item._id
    this.api = api
    this._item = item
    this._thisUser = thisUser
    this._caption = item.name
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
    this._deleteCardClick = deleteCardClick
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
    this._likeButton.addEventListener('click', () => {
        if(this.likeActive()){
          this.api.deleteLike(this._item._id)
          .then(item => {
            this._item.likes = item.likes
            this._likeButton.classList.remove('element__like-button_active')
            this._like.textContent = item.likes.length
          })
        } else {
          this.api.setLike(this._item._id)
          .then(item => {
            this._item.likes = item.likes
            this._likeButton.classList.add('element__like-button_active')
            this._like.textContent = item.likes.length
          })
        }
      
		});
    this._deleteButton.addEventListener('click', () => {
      this._deleteCardClick(this._id, this._element)
		});
    // Слушатель клика на картинку для открытия попапа
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._url, this._caption); // ведет к popupWithImage.open()
    })
	}

  likeActive() {
    let boolean = false
    // Получаем все лайки на всех карточках страницы
    // Проверяем все лайки на странице на наличие в них нашего id
    // возвращаем тру, если нашли, если нет, то возвращаем ошибочку
    this._item.likes.forEach(everyLike => {
      if(everyLike._id.includes(this._thisUser)) {
        boolean = true
      }
    })
    return boolean
  }

  _handleOpenImageClick() {
    popUpPhotoSRC.src = this._url;
    popUpPhotoSRC.alt = ('Крупным планом:' + ' ' + this._name);
    popUpPhotoCaption.textContent = this._name;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector('.element__delete-button')
    this._cardCaption = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button')
    this._like = this._element.querySelector('.element__like-count')
    this._cardCaption.textContent = this._name;
    this._cardImage.src = this._url;
    this._cardImage.alt = ('На фото: ' + ' ' + this._name);
    this._setEventListeners(); // навесим слушатели кликов лайка и удаления карточки
    
    if(this.likeActive()) {
      this._likeButton.classList.add('element__like-button_active')
    }
   
    // Рисуем проставленные другими юзерами лайки, если таких нет, пишем 0
    if (this._item.likes.length > 0) {
      this._like.textContent = this._item.likes.length;
    } else {
      this._like.textContent = '0';
       //console.log('laikov net :((')
    }

    //console.log(this._item.owner._id)
    // Сравнивам строки, если _id совпадают, то это я создал карточку и могу ее удалить
    if(this._thisUser === this._item.owner._id) {
      this._deleteButton.classList.remove('element__delete-button_type_hidden')
    } else {
      // чужое удалить нельзя, скрываем иконку
      this._deleteButton.classList.add('element__delete-button_type_hidden')
    }

    return this._element;
    }
  }

export {
  Card
}