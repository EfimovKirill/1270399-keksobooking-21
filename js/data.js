'use strict';

(() => {
  let successWindow = document.querySelector(`#success`).content.querySelector(`.success`);
  let errorWindow = document.querySelector(`#error`).content.querySelector(`.error`);
  let main = document.querySelector(`main`);
  let reset = document.querySelector(`.ad-form__reset`);

  let pressEsc = (evt, action) => {
    if (evt.key === `Escape`) {
      action();
    }
  };

  let closeSuccess = () => {
    let success = document.querySelector(`.success`);
    success.remove();
    document.removeEventListener(`keydown`, onSuccessEscPress);
  };

  let clickOnSuccess = () => {
    closeSuccess();
  };

  let onSuccessEscPress = (evt) => {
    pressEsc(evt, closeSuccess);
  };

  let onSuccess = () => {
    main.insertAdjacentElement(`afterbegin`, successWindow);
    successWindow.addEventListener(`click`, clickOnSuccess);
    document.addEventListener(`keydown`, onSuccessEscPress);
  };

  let closeError = () => {
    let error = document.querySelector(`.error`);
    error.remove();
    document.removeEventListener(`keydown`, onErrorEscPress);
  };

  let clickOnError = () => {
    closeError();
  };

  let onErrorEscPress = (evt) => {
    pressEsc(evt, closeError);
  };

  let onError = () => {
    main.insertAdjacentElement(`afterbegin`, errorWindow);
    let closeErrorButton = document.querySelector(`.error__button`);
    closeErrorButton.addEventListener(`click`, clickOnError);
    errorWindow.addEventListener(`click`, clickOnError);
    document.addEventListener(`keydown`, onErrorEscPress);
  };

  let deactivatePage = () => {
    window.map.allMap.classList.add(`map--faded`);
    window.map.deactivateForm();
    window.map.removePin();
    window.map.removeCard();
    window.filter.deactivate();
    window.movepin.startPosition();
    window.form.removeImage();
  };

  let resetButton = (evt) => {
    evt.preventDefault();
    deactivatePage();
  };

  reset.addEventListener(`click`, resetButton);

  let submitSuccess = () => {
    onSuccess();
    deactivatePage();
  };

  window.map.adForm.addEventListener(`submit`, (evt) => {
    window.backend.upload(submitSuccess, onError, new FormData(window.map.adForm));
    evt.preventDefault();
  });
})();
