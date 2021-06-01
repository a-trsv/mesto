import {escEvtKey} from '../utils/constants.js'
export default class Popup {
    constructor(popUpSelector) {
        this._popup = document.querySelector(popUpSelector)
        this._handleEscClose = this._handleEscClose.bind(this) // Жесткая привязка, чтобы не было потери контекста ф-ии
        this._regPopUpMissedClick = this._regPopUpMissedClick.bind(this)
    }

    open() {
        this._popup.classList.add('popup_active')
        document.addEventListener('keydown', this._handleEscClose)
        document.addEventListener('mousedown', this._regPopUpMissedClick)
       
    }

    close() {
        this._popup.classList.remove('popup_active')
        document.removeEventListener('keydown', this._handleEscClose)
        document.removeEventListener('mousedown', this._regPopUpMissedClick)
    }

    _handleEscClose(evt) {
        if(evt.key === escEvtKey) {
            this.close()
        }
    }

    _regPopUpMissedClick(evt) {
        if (evt.target !== this._popup) return; {
            this.close()
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__close-button')
        .addEventListener(
            'click',
            () => this.close()
        )
    }
}