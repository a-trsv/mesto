import Popup from './Popup.js';
export default class PopUpWithForm extends Popup {
    constructor(popUpSelector, submitHandler // function
        ) {
            super(popUpSelector)
            this._submitHandler = submitHandler
            this._form = this._popup.querySelector('.form')
        }
    
    _getInputValues() {
        // Должен вернуть значения полей с введенными данными из формы
        // name & job для popupedit
        // url + title для popupadd
        const values = {}
        const inputs = [...this._form.querySelectorAll('.form__input')]
        inputs.forEach(input => {
            values[input.name] = input.value
        })
        return values // Понадобится при вызове сабмита формы
    }

    setEventListeners() {
        this._form
        .addEventListener(
            'submit',
            () => {
                const data = this._getInputValues()
                this._submitHandler(data)
            }
        )
        super.setEventListeners()
    }

    close() {
        this._form.reset()
        super.close()
    }
}

// fuction addCardSubmitHandler(data) {
//     const card = new Card(data) // Смотри Card.js
//     prepend...
// }

// fuction editProfileHandler() {
//    zamenyam starie dannie iz inputa formi
// }

// const addCardPopup = new PopUpWithForm('.popup_type_add', addCardSubmitHandler())
// const editProfilePopup = new PopUpWithForm('.popup_type_edit', editProfileHandler())