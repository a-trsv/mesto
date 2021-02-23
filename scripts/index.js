let editButton = document.querySelector('.profile__edit-button');
let popUp = document.querySelector('.popup');
let closeEditButton = document.querySelector('.popup__close-button');
let saveEditButton = document.querySelector('.form__save-button')
let formElement = document.querySelector('.form');
nameInput = document.querySelector('.profile__title').textContent;
jobInput = document.querySelector('.profile__caption').textContent;

// Получаем актуальные значения в placeholder
document.getElementsByName('input-name')[0].value = nameInput;
document.getElementsByName('input-job')[0].value = jobInput;

// Функция открытия и закрытия попапа
function togglePopUp() {
  popUp.classList.toggle('popup__active');
}

// Открытие и закрытие попапа
editButton.addEventListener('click', togglePopUp);
closeEditButton.addEventListener('click', togglePopUp);
saveEditButton.addEventListener('click', togglePopUp);

// Для закрытия открытого попапа по кнопке
function closePopUp () {
  popUp.classList.remove('popup__active');
  popUp.classList.add('popup');
}

// Получите значение полей jobInput и nameInput из свойства value
// Выберите элементы, куда должны быть вставлены значения полей
// Вставьте новые значения с помощью textContent

function formSubmitHandler (evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = (document.querySelector('.form__input_name').value);
  document.querySelector('.profile__caption').textContent = (document.querySelector('.form__input_job').value);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      closePopUp();
    }
  });
}

formElement.addEventListener('submit', formSubmitHandler);
