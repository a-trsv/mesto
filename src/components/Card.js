class Card {
  constructor(item, cardSelector, user, handleCardClick, deleteCardClick, {setLike, deleteLike}) {
    this._name = item.name
    this._url = item.link
    this._id = item._id
    this._item = item
    this._user = user
    this._caption = item.name
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
    this._deleteCardClick = deleteCardClick
    this._setLike = setLike
    this._deleteLike = deleteLike
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true)
  
    return cardElement
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      // Если мы уже ставили лайк карточке, то можем его снять
        if(this.islikeActive()){
          this._deleteLike(this._item._id)
          this._removeLike(this._item._id)
        } else {
          // Если мы еще не ставили лайк карточке, то можем его поставить
          this._setLike(this._item._id)
          this._setLikeActive(this._item._id)
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

  setLikes(item) {
    this._item.likes = item.likes
    this._like.textContent = item.likes.length
  }

  _setLikeActive() {
    this._likeButton.classList.add('element__like-button_active')
  }

  _removeLike() {
    this._likeButton.classList.remove('element__like-button_active')
  }

  islikeActive() {
    // Если наших лайков нет
    let likeIsActive = false
    // Получаем все лайки на всех карточках страницы
    // Проверяем все лайки на странице на наличие в них нашего id
    // возвращаем тру, если нашли, если нет, то возвращаем ошибочку
    this._item.likes.forEach(everyLike => {
      if(everyLike._id.includes(this._user)) {
        likeIsActive = true
       // Поиск обнаружен наши лайки, может снимать лайк
      }
    })
    return likeIsActive
    // Наших лайков нет, снимать лайки нельзя
  }

  _handleOpenImageClick() {
    popUpPhotoSRC.src = this._url;
    popUpPhotoSRC.alt = ('Крупным планом:' + ' ' + this._name)
    popUpPhotoCaption.textContent = this._name
  }

  generateCard() {
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector('.element__delete-button')
    this._cardCaption = this._element.querySelector('.element__title')
    this._cardImage = this._element.querySelector('.element__image')
    this._likeButton = this._element.querySelector('.element__like-button')
    this._like = this._element.querySelector('.element__like-count')
    this._cardCaption.textContent = this._name
    this._cardImage.src = this._url
    this._cardImage.alt = ('На фото: ' + ' ' + this._name)
    this._setEventListeners(); // навесим слушатели кликов лайка и удаления карточки

    // После обновления страницы, проверяем, может мы уже поставили лайк 
    if(this.islikeActive()) {
      this._likeButton.classList.add('element__like-button_active')
    }
   
    // Рисуем проставленные другими юзерами лайки, если таких нет, пишем 0
    if (this._item.likes.length > 0) {
      this._like.textContent = this._item.likes.length
    } else {
      this._like.textContent = '0';
    }

    //console.log(this._item.owner._id)
    // Сравнивам строки, если _id совпадают, то это я создал карточку и могу ее удалить
    if(this._user === this._item.owner._id) {
      this._deleteButton.classList.remove('element__delete-button_type_hidden')
    } else {
      // чужое удалить нельзя, скрываем иконку
      this._deleteButton.classList.add('element__delete-button_type_hidden')
    }

    return this._element
    }
  }

export {
  Card
}