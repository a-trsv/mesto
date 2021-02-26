let editButton = document.querySelector('.profile__edit-button');
let popUp = document.querySelector('.popup');
let closeEditButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.form');
let profileTitle = document.querySelector('.profile__title');
let profileCaption = document.querySelector('.profile__caption');
let newName = document.querySelector('.form__input_type_name');
let newJob = document.querySelector('.form__input_type_job');

// Получаем актуальные значения в placeholder
function getCurrentNameAndJob() {
  newName.value = profileTitle.textContent;
  newJob.value = profileCaption.textContent;
}

// Функция открытия и закрытия попапа
function togglePopUp() {
  popUp.classList.toggle('popup_active');
  getCurrentNameAndJob ();
}

// Для закрытия открытого попапа по кнопке
function closePopUp() {
  popUp.classList.remove('popup_active');
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

// Сохранить введенные данные
formElement.addEventListener('submit', formSubmitHandler);

// Открытие и закрытие попапа
editButton.addEventListener('click', togglePopUp);
closeEditButton.addEventListener('click', togglePopUp);
