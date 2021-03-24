// Sprint 6

// Определяем невалидные инпуты
const isInputInvalid = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

// Функция переключения состояния кнопки
const toggleSaveButtonState = (inputList, saveButtonElement, {inactiveButtonClass}) => {
  // Если хотя бы один из инпутов не валиден, то отключаем кнопку
  if (isInputInvalid(inputList)) {
    saveButtonElement.classList.add(inactiveButtonClass);
    saveButtonElement.setAttribute('disabled', true);
  } else {
    saveButtonElement.classList.remove(inactiveButtonClass);
    saveButtonElement.removeAttribute('disabled');
  }
};

// Функция вывода состояния ошибки валидации
const showInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

// Функция скрытия состояния ошибки валидации
const hideInputEror = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
};

// Функция проверки валидности поля
const verifyInput = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  if (inputElement.validity.valid) {
    // Если поле заполнено корректно
    // border-bottom по умолчанию, скрываем span с ошибкой
    hideInputEror(formElement, inputElement, {inputErrorClass, errorClass});
  } else {
    // Если поле имеет невалидные данные
    // border-bottom инпута красный, выводим span с ошибкой
    showInputError(formElement, inputElement, {inputErrorClass, errorClass});
  }
};

// Получаем данные по полям и ищем кнопку сабмита
const getInputListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
  // Находим все инпуты в любой форме на странице
  // Находим кнопку сабмита
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const saveButtonElement = formElement.querySelector(submitButtonSelector);
  // Для каждого инпута нужно добавить слушатель,
  // нужно проверить на валидность заполненого поля,
  // изменить состояние кнопки сабмита (отключаем кнопку если поля не валидны)
  inputList.forEach(
    inputElement => {
      inputElement.addEventListener('input', () => {
        // Проверка валидности
        verifyInput(formElement, inputElement, rest);
        toggleSaveButtonState(inputList, saveButtonElement, rest);
      });
       // Переключение состояния кнопки
       toggleSaveButtonState(inputList, saveButtonElement, rest);
    }
  );
};

// Запускаем функцию проверки валидности заполнения формы
const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  // Для каждого найденного элемента формы блокируем отправку на сервер,
  formList.forEach(
    formElement => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      // затем навешиваем свой слушатель на инпуты формы
      getInputListeners(formElement, rest);
    }
  );
};

enableValidation({
  formSelector: '.form', // def. popup__form
  inputSelector: '.form__input', // def. popup__input
  submitButtonSelector: '.form__save-button', // def. popup__button
  inactiveButtonClass: 'form__save-button_type_disabled', // def. popup__button_disabled
  inputErrorClass: 'form__input_type_error', // def. popup__input_type_error
  errorClass: 'form__error_type_visible' // def. popup__error_visible
});
