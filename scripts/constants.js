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

const validSettings = {
    formSelector: '.form', // def. popup__form
    inputSelector: '.form__input', // def. popup__input
    submitButtonSelector: '.form__save-button', // def. popup__button
    inactiveButtonClass: 'form__save-button_type_disabled', // def. popup__button_disabled
    inputErrorClass: 'form__input_type_error', // def. popup__input_type_error
    errorClass: 'form__error_type_visible' // def. popup__error_visible
  };

  export {
    initialCards,
    validSettings
}