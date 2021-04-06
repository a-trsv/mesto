class FormValidator {
    constructor(validSettings) {
       this._validSettings = validSettings;
       
    }

    // Определяем невалидные инпуты
    _isInputInvalid = (inputList) => {
        return inputList.some(inputElement => !inputElement.validity.valid);
    };
  
    // Функция переключения состояния кнопки
    _toggleSaveButtonState = (inputList, saveButtonElement) => {
        // Если хотя бы один из инпутов не валиден, то отключаем кнопку
        if (this._isInputInvalid(inputList)) {
        saveButtonElement.classList.add(this._validSettings.inactiveButtonClass);
        saveButtonElement.setAttribute('disabled', true);
        } else {
        saveButtonElement.classList.remove(this._validSettings.inactiveButtonClass);
        saveButtonElement.removeAttribute('disabled');
        }
    };
  
    // Функция вывода состояния ошибки валидации
    _showInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._validSettings.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._validSettings.errorClass);
    };

     // Функция скрытия состояния ошибки валидации
    _hideInputEror = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._validSettings.inputErrorClass);
        errorElement.classList.remove(this._validSettings.errorClass);
  };

    _verifyInput = (formElement, inputElement) => {
        if (inputElement.validity.valid) {
        // Если поле заполнено корректно
        // border-bottom по умолчанию, скрываем span с ошибкой
        this._hideInputEror(formElement, inputElement);
        } else {
        // Если поле имеет невалидные данные
        // border-bottom инпута красный, выводим span с ошибкой
        this._showInputError(formElement, inputElement);
        }
    };

    _getInputListeners = (formElement) => {
        // Находим все инпуты в любой форме на странице
        // Находим кнопку сабмита
        const inputList = Array.from(formElement.querySelectorAll(this._validSettings.inputSelector));
        const saveButtonElement = formElement.querySelector(this._validSettings.submitButtonSelector);
        // Для каждого инпута нужно добавить слушатель,
        // нужно проверить на валидность заполненого поля,
        // изменить состояние кнопки сабмита (отключаем кнопку если поля не валидны)
        inputList.forEach(
          inputElement => {
            inputElement.addEventListener('input', () => {
              // Проверка валидности
              this._verifyInput(formElement, inputElement);
              this._toggleSaveButtonState(inputList, saveButtonElement);
            });
             // Переключение состояния кнопки
             this._toggleSaveButtonState(inputList, saveButtonElement);
          }
        );
      };

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._validSettings.formSelector));
        formList.forEach(
          formElement => {
            formElement.addEventListener('submit', (evt) => {
              evt.preventDefault();
            });
            // затем навешиваем свой слушатель на инпуты формы
            this._getInputListeners(formElement);
          }
        );
    }
}

export {
    FormValidator
}