export default class UserInfo {
    constructor({profileTitleSelector, profileCaptionSelector, profileAvatarSelector}) {
        this._name = document.querySelector(profileTitleSelector)
        this._job = document.querySelector(profileCaptionSelector)
        this._avatar = document.querySelector(profileAvatarSelector)
    }   

    getUserInfo() {
        const userInfoObj = {
            name: this._name.textContent,
            about: this._job.textContent
        }
        return userInfoObj
    }

    setUserInfo({name, about, id}) {
        this._name.textContent = name
        this._job.textContent = about
        this._id = id
    }

    getUserId() {
        const userId = this._id
        return userId
    }
    
    // Выкладываем адрес картинки с сервера
    setUserAvatar(avatar) {
        this._avatar.src = avatar
    }
}