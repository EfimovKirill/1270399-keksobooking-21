'use strict';

(() => {
  // Поиск элементов
  let roomsNumber = document.querySelector(`#room_number`);
  let сapacity = document.querySelector(`#capacity`);
  let type = document.querySelector(`#type`);
  let price = document.querySelector(`#price`);
  let timeIn = document.querySelector(`#timein`);
  let timeOut = document.querySelector(`#timeout`);
  let images = document.querySelector(`#images`);
  let adFormPhoto = document.querySelector(`.ad-form__photo`);
  let avatar = document.querySelector(`#avatar`);
  let avatarsPreviewImg = document.querySelector(`ad-form-header__avatarsPreview img`);

  const PIN_PREVIEW = `img/muffin-grey.svg`;

  // Валидация поля с количество мест
  let validateCapacity = (field) => {
    field.addEventListener(`change`, () => {
      if (roomsNumber.value < сapacity.value) {
        сapacity.setCustomValidity(`Слишком много гостей`);
      } else {
        сapacity.setCustomValidity(``);
      }
    });
  };

  // Валидация заголовка объявления
  let validateTitle = () => {
    let title = document.querySelector(`#title`);

    const MIN_TITLE_LENGTH = 30;
    const MAX_TITLE_LENGTH = 100;

    if (title.validity.valueMissing) {
      title.setCustomValidity(`Обязательное поле!`);
    } else {
      title.setCustomValidity(``);
    }

    title.addEventListener(`input`, () => {
      let titleValueLength = title.value.length;

      if (titleValueLength < MIN_TITLE_LENGTH) {
        title.setCustomValidity(`Добавьте ${MIN_TITLE_LENGTH - titleValueLength} символа`);
      } else if (titleValueLength > MAX_TITLE_LENGTH) {
        title.setCustomValidity(`Удалите ${titleValueLength - MAX_TITLE_LENGTH} символа`);
      } else {
        title.setCustomValidity(``);
      }
    });
  };

  // Валидация цены на жилье
  let validatePrice = () => {
    let minPrice = 1000;
    const MAX_PRICE = 1000000;

    if (price.validity.valueMissing) {
      price.setCustomValidity(`Обязательное поле!`);
    } else {
      price.setCustomValidity(``);
    }

    type.addEventListener(`change`, () => {
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
    });

    price.addEventListener(`input`, () => {
      price.setCustomValidity(``);
      if (price.value < minPrice) {
        price.setCustomValidity(`Слишком дешево`);
      } else if (price.value > MAX_PRICE) {
        price.setCustomValidity(`Слишком дорого`);
      } else {
        price.setCustomValidity(``);
      }
    });
  };

  // Установка одинакого времени
  let setSameTime = () => {
    timeIn.addEventListener(`change`, () => {
      timeOut.value = timeIn.value;
    });

    timeOut.addEventListener(`change`, () => {
      timeIn.value = timeOut.value;
    });
  };

  // Валидация фото
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
  };

  validateCapacity(сapacity);
  validateCapacity(roomsNumber);
  validateTitle();
  validatePrice();
  setSameTime();
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
    removeImage
  };

})();
