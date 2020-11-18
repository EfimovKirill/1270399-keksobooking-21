'use strict';

(() => {
  const PIN_PREVIEW = `img/muffin-grey.svg`;
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const DEFAULT_PRICE = 1000;
  const MAX_PRICE = 1000000;
  const IMAGE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const HousingPrices = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  let roomsNumber = document.querySelector(`#room_number`);
  let capacity = document.querySelector(`#capacity`);
  let title = document.querySelector(`#title`);
  let type = document.querySelector(`#type`);
  let price = document.querySelector(`#price`);
  let timeIn = document.querySelector(`#timein`);
  let timeOut = document.querySelector(`#timeout`);
  let images = document.querySelector(`#images`);
  let adFormPhoto = document.querySelector(`.ad-form__photo`);
  let avatar = document.querySelector(`#avatar`);
  let avatarsPreviewImg = document.querySelector(`.ad-form-header__preview img`);

  let validateCapacity = () => {
    if ((roomsNumber.value === `100` && capacity.value !== `0`) || (roomsNumber.value !== `100` && capacity.value === `0`)) {
      capacity.setCustomValidity(`Не для гостей!`);
    } else if (roomsNumber.value < capacity.value) {
      capacity.setCustomValidity(`Не подходит количество мест`);
    } else {
      capacity.setCustomValidity(``);
    }

    capacity.reportValidity();
  };

  let validateTitle = () => {

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

  let setMinPrice = (minPrice) => {
    price.placeholder = minPrice;
    price.setAttribute('min', minPrice);
  }

  let validatePrice = () => {
    let minPrice;

    if (price.validity.valueMissing) {
      price.setCustomValidity(`Обязательное поле!`);
    } else {
      price.setCustomValidity(``);
    }

    switch (type.value) {
      case `flat`:
        minPrice = HousingPrices.FLAT;
        break;
      case `bungalow`:
        minPrice = HousingPrices.BUNGALO;
        break;
      case `house`:
        minPrice = HousingPrices.HOUSE;
        break;
      case `palace`:
        minPrice = HousingPrices.PALACE;
        break;
    }

    setMinPrice(minPrice);

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

  let resetPrice = () => {
  setMinPrice(DEFAULT_PRICE);
  };

  window.form = {
    removeImage,
    validateCapacity,
    resetPrice,
    capacity
  };

})();
