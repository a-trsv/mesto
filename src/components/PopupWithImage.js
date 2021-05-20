import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popUpSelector) {
        super(popUpSelector)
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupTitle = this._popup.querySelector('.popup__title_type_photo');
    }
    open(url, text) {
        this._popupImage.src = url
        this._popupImage.alt = ('Крупным планом:' + ' ' + text);
        this._popupTitle.textContent = text
        super.open()
    }
}