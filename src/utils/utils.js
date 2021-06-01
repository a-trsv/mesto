// UX: визуализация процесса загрузки для кнопок сабмита
function renderLoading(isLoading, popupElement) {
    if(isLoading && popupElement.classList.contains('popup_type_add')) {
      popupElement.querySelector('.form__save-button').textContent = 'Создать'
    }
    else if (isLoading) {
      popupElement.querySelector('.form__save-button').textContent = 'Сохранение...'
    } else {
      popupElement.querySelector('.form__save-button').textContent = 'Сохранить'
    }
  }

  export {
    renderLoading
  }