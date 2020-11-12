'use strict';

(() => {
  let roomsNumber = document.querySelector(`#room_number`);
  let capacity = document.querySelector(`#capacity`);
  let type = document.querySelector(`#type`);
  let price = document.querySelector(`#price`);
  let timeIn = document.querySelector(`#timein`);
  let timeOut = document.querySelector(`#timeout`);
  let images = document.querySelector(`#images`);
  let adFormPhoto = document.querySelector(`.ad-form__photo`);
  let avatar = document.querySelector(`#avatar`);
  let avatarsPreviewImg = document.querySelector(`.ad-form-header__preview img`);

  const PIN_PREVIEW = `img/muffin-grey.svg`;

  let validateCapacity = () => {
    if (roomsNumber.value < capacity.value) {
       capacity.setCustomValidity(`Слишком много гостей`);
    } else {
      capacity.setCustomValidity(``);
    }

    capacity.reportValidity();
    roomsNumber.reportValidity();
  };

  let validateTitle = () => {
    let title = document.querySelector(`#title`);

    const MIN_TITLE_LENGTH = 30;
    const MAX_TITLE_LENGTH = 100;

    if (title.validity.valueMissing) {
      title.setCustomValidity(`Обязательное поле!`);
    } else {
      title.setCustomValidity(``);
    }

    let titleValueLength = title.value.length;

    if (titleValueLength < MIN_TITLE_LENGTH) {
      title.setCustomValidity(`Добавьте ${MIN_TITLE_LENGTH - titleValueLength} символа`);
    } else if (titleValueLength > MAX_TITLE_LENGTH) {
      title.setCustomValidity(`Удалите ${titleValueLength - MAX_TITLE_LENGTH} символа`);
    } else {
      title.setCustomValidity(``);
    }

    title.reportValidity();
  };

  let validatePrice = () => {
    let minPrice = 1000;
    const MAX_PRICE = 1000000;

    if (price.validity.valueMissing) {
      price.setCustomValidity(`Обязательное поле!`);
    } else {
      price.setCustomValidity(``);
    }

    switch (type.value) {
      case `flat`:
        minPrice = 1000;
        break;
      case `bungalow`:
        minPrice = 0;
        break;
      case `house`:
        minPrice = 5000;
        break;
      case `palace`:
        minPrice = 10000;
        break;
      default:
        minPrice = 0;
      }

      price.setCustomValidity(``);
      if (price.value < minPrice) {
        price.setCustomValidity(`Слишком дешево`);
      } else if (price.value > MAX_PRICE) {
        price.setCustomValidity(`Слишком дорого`);
      } else {
        price.setCustomValidity(``);
      }

      price.reportValidity();
  };

  let validatePhoto = (usersAvatar, avatarsPreview) => {
    const IMAGE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

    usersAvatar.addEventListener(`change`, () => {
      let file = usersAvatar.files[0];
      let fileName = file.name.toLowerCase();

      let matches = IMAGE_TYPES.some((it) => fileName.endsWith(it));

      if (matches) {
        let reader = new FileReader();

        reader.addEventListener(`load`, () => {
          avatarsPreview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });

    usersAvatar.reportValidity();
  };

  capacity.addEventListener(`change`, validateCapacity);
  roomsNumber.addEventListener(`change`, validateCapacity);
  title.addEventListener(`input`, validateTitle);
  type.addEventListener(`change`, validatePrice);
  price.addEventListener(`input`, validatePrice);

  timeIn.addEventListener(`change`, () => {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener(`change`, () => {
    timeIn.value = timeOut.value;
  });

  validatePhoto(images, adFormPhoto);
  validatePhoto(avatar, avatarsPreviewImg);

  let removeImage = () => {
    avatarsPreviewImg.src = PIN_PREVIEW;
    let typePhotos = avatarsPreviewImg.querySelectorAll(`img`);
    if (typePhotos) {
      typePhotos.forEach((item) => {
        item.remove();
      });
    }
  };

  window.form = {
    removeImage,
    validateCapacity,
    capacity
  };

})();
