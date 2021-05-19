export default class UserInfo {
    constructor({profileTitleSelector, profileCaptionSelector}) {
        this._name = document.querySelector(profileTitleSelector);
        this._job = document.querySelector(profileCaptionSelector);
    }   

    getUserInfo() {
        const userInfoObj = {
            name: this._name.textContent,
            job: this._job.textContent
        }
        return userInfoObj
    }

    setUserInfo({name, job}) {
        this._name.textContent = name
        this._job.textContent = job
    }
}

// // dlya index.js:
// const userInfo = new UserInfo({name: '.profile__title', job: '.profile__caption'})
// //iz index.js
// const popupForm = new PopUpWithForm(popUpSelector, editFormSubmitHandler)
// function editFormSubmitHandler(data) {
//     userInfo.setUserInfo(data)
// }

// Создайте класс UserInfo
// Класс UserInfo отвечает за управление отображением информации о пользователе на странице. 
// Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
// Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.