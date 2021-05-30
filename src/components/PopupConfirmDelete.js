import Popup from "./Popup.js";
export default class PopupConfirmDelete extends Popup {
    constructor(popUpDelSelector, deleteCardClickHandler){
        super(popUpDelSelector)
        this._deleteCardClickHandler = deleteCardClickHandler;
        this._form = this._popup.querySelector('.form')
    }
    setEventListeners() {
        this._form
        .addEventListener(
            'submit',
            (evt) => {
                evt.preventDefault()
                this._deleteCardClickHandler(this.cardId, this.newCard)
            }
        )
        super.setEventListeners()
    }
    open(cardId, newCard) {
        this.cardId = cardId
        this.newCard = newCard
        super.open()
    }

}