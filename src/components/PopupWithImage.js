import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popUpSelector) {
        super(popUpSelector)
    }
    open(url, text) {
        this._popup
        .querySelector('.popup__image')
        .src = url
        this._popup
        .querySelector('.popup__title_type_photo')
        .textContent = text
        super.open()
    }
}