class FormValidator {
  constructor(validSettings, form) {
    this._validSettings = validSettings
    this._form = form
    this._inputSelector = validSettings.inputSelector
    this._submitButtonSelector = validSettings.submitButtonSelector
    this._inactiveButtonClass = validSettings.inactiveButtonClass
    this._inputErrorClass = validSettings.inputErrorClass
    this._errorClass = validSettings.errorClass
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
    this._saveButtonElement = this._form.querySelector(this._submitButtonSelector)
  } 

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });

    this._toggleSaveButtonState();
  }

  // Определяем хотя бы один инпут невалидный?
  _isInputInvalid = () => {
      return this._inputList.some(inputElement => !inputElement.validity.valid);
  };

  // Функция переключения состояния кнопки
  _toggleSaveButtonState = () => {
      // Если хотя бы один из инпутов не валиден, то отключаем кнопку
      if (this._isInputInvalid(this._inputList)) {
        this._saveButtonElement.classList.add(this._inactiveButtonClass)
        this._saveButtonElement.setAttribute('disabled', true)
      } else {
        this._saveButtonElement.classList.remove(this._inactiveButtonClass)
        this._saveButtonElement.removeAttribute('disabled')
      }
  };

  // Функция вывода состояния ошибки валидации
  _showInputError = (inputListElement) => {
    this._errorElement = this._form.querySelector(`#${inputListElement.id}-error`);
    inputListElement.classList.add(this._inputErrorClass)
    this._errorElement.textContent = inputListElement.validationMessage
    this._errorElement.classList.add(this._errorClass)
  };

   // Функция скрытия состояния ошибки валидации
  _hideInputError = (inputListElement) => {
    this._errorElement = this._form.querySelector(`#${inputListElement.id}-error`)
    inputListElement.classList.remove(this._inputErrorClass)
    this._errorElement.classList.remove(this._errorClass)
};

  _verifyInput = (inputListElement) => {
      if (inputListElement.validity.valid) {
      // Если поле заполнено корректно
      // border-bottom по умолчанию, скрываем span с ошибкой
      this._hideInputError(inputListElement)
      } else {
      // Если поле имеет невалидные данные
      // border-bottom инпута красный, выводим span с ошибкой
      this._showInputError(inputListElement)
      }
  };

  _getInputListeners = () => {
      // Для каждого инпута нужно добавить слушатель,
      // нужно проверить на валидность заполненого поля,
      // изменить состояние кнопки сабмита (отключаем кнопку если поля не валидны)
      this._inputList.forEach(
        inputListElement => {
          inputListElement.addEventListener('input', () => {
            // Проверка валидности
            this._verifyInput(inputListElement)
            this._toggleSaveButtonState()
          });
           // Переключение состояния кнопки
           
           this._toggleSaveButtonState()
        }
      );
    };

  enableValidation() {
          this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
          })
          // затем навешиваем свой слушатель на инпуты формы
          this._getInputListeners()
  }
}

export {
  FormValidator
}