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
