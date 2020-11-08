'use strict';

(() => {
  const PIN_WIDTH = 40;
  const PIN_HEIGHT = 40;
  const PINS_COUNT_DEFAULT = 5;

  let offers = [];

  // Поиск элементов
  let map = document.querySelector(`.map`);
  let mapPins = map.querySelector(`.map__pins`);
  let mapPinsTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let adForm = document.querySelector(`.ad-form`);
  let mapFiltersForm = window.filter.filters;
  let mapPinMain = document.querySelector(`.map__pin--main`);
  let housingTypeElement = document.querySelector(`#housing-type`);
  let fragment = document.createDocumentFragment();
  let cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  let mapFiltersContainer = map.querySelector(`.map__filters-container`);
  let pinsContainer = document.createElement(`div`);

  let successHandler = (data) => {
    offers = [...data];
    turnOnPage();
  };

  // Функция, создающая метку
  let createPinsElement = (pinValue) => {
    let pinElement = mapPinsTemplate.cloneNode(true);

    pinElement.style.left = pinValue.location.x + PIN_WIDTH / 2 + `px`;
    pinElement.style.top = pinValue.location.y + PIN_HEIGHT / 2 + `px`;
    pinElement.querySelector(`img`).src = pinValue.author.avatar;
    pinElement.querySelector(`img`).alt = pinValue.offer.title;

    return pinElement;
  };

  let createCard = (element) => {
    let card = cardTemplate.cloneNode(true);

    card.querySelector(`.popup__title`).textContent = element.offer.title;
    card.querySelector(`.popup__text--address`).textContent = element.offer.address;
    card.querySelector(`.popup__text--price`).textContent = `${element.offer.price} ₽/ночь`;
    card.querySelector(`.popup__type`).textContent = element.offer.type;
    card.querySelector(`.popup__text--capacity`).textContent = `${element.offer.rooms} комнаты для ${element.offer.guests}`;
    card.querySelector(`.popup__text--time`).textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;

    let popupFeatures = card.querySelector(`.popup__features`);
    element.offer.features.forEach((el) => {
      let popupFeatureItem = document.createElement(`li`);
      popupFeatureItem.className = `popup__feature popup__feature--${el}`;
      popupFeatures.appendChild(popupFeatureItem);
    });

    card.querySelector(`.popup__description`).textContent = element.offer.description;
    let popupPhotos = card.querySelector(`.popup__photos`);
    element.offer.photos.forEach((el) => {
      let popupPhotoItem = document.createElement(`img`);
      popupPhotoItem.className = `popup__photo`;
      popupPhotoItem.src = el;
      popupPhotoItem.width = 45;
      popupPhotoItem.height = 40;
      popupPhotoItem.alt = `Фотография жилья`;
      popupPhotos.appendChild(popupPhotoItem);
    });
    card.querySelector(`.popup__avatar`).src = element.author.avatar;

    return card;
  };

  // Функция, отрисовывающая попап
  let renderOffers = (arrayOfPins) => {
    let pinsCount = arrayOfPins.length > PINS_COUNT_DEFAULT ? PINS_COUNT_DEFAULT : arrayOfPins.length;

    pinsContainer.innerHTML = ``;

    for (let i = 0; i < pinsCount; i++) {
      let pin = createPinsElement(arrayOfPins[i]);
      pin.dataset.offerIndex = i;
      fragment.appendChild(pin);
    }

    pinsContainer.appendChild(fragment);
    mapPins.appendChild(pinsContainer);
  };

  let onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      closePopup();
    }
  };

  mapPins.addEventListener(`click`, (evt) => {
    let targetPin = evt.target;
    let targetMap = targetPin.parentElement;

    if ((targetMap.classList.contains(`map__pin`) && targetMap.classList.length === 1)
      || (targetMap.classList.contains(`map__pin`) && targetMap.classList.length === 1)) {
      let button = targetPin.closest(`.map__pin`);
      let offerIndex = button.dataset.offerIndex;
      let currentOffer = offers[offerIndex];
      let currentPopup = createCard(currentOffer);
      openPopup(currentPopup);
      let closeCard = document.querySelector(`.popup__close`);
      closeCard.addEventListener(`click`, closePopup);
      document.addEventListener(`keydown`, onPopupEscPress);
    }
  });

  // Функция, открывающая попап
  let openPopup = (popup) => {
    let mapCard = map.querySelector(`.map__card`);
    if (mapCard) {
      mapCard.remove();
    }
    fragment.appendChild(popup);
    map.insertBefore(fragment, mapFiltersContainer);
  };

  let closePopup = () => {
    let card = document.querySelector(`.popup`);
    card.remove();
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  // Функция для отключения поля
  let disabledFieldSets = (form, booleanValue) => {
    let fieldSets = form.children;
    for (let i = 0; i < fieldSets.length - 1; i++) {
      fieldSets[i].disabled = booleanValue;
    }
  };

  // Деактивация страницы
  let turnOffPage = () => {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    mapFiltersForm.classList.add(`ad-form--disabled`);

    disabledFieldSets(adForm, true);
    disabledFieldSets(mapFiltersForm, true);
  };

  turnOffPage();

  // Активация страницы
  let turnOnPage = () => {
    if (map.classList.contains(`map--faded`)) {
      renderOffers(offers);
    }

    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    mapFiltersForm.classList.remove(`ad-form--disabled`);

    disabledFieldSets(adForm, false);
    disabledFieldSets(mapFiltersForm, false);
  };

  let errorHandler = (errorMessage) => {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.style.color = `white`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  // Функция нажатия кнопки мыши
  let clickMouseButton = (click) => {
    if (typeof click === `object`) {
      window.backend.load(successHandler, errorHandler);
    }
  };

  mapPinMain.addEventListener(`mousedown`, clickMouseButton);

  // Функция нажатия клавиши enter
  mapPinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      window.backend.load(successHandler, errorHandler);
    }
  });

  housingTypeElement.addEventListener(`change`, () => {
    let filteredOffers = window.filter.filterPins(offers);
    renderOffers(filteredOffers);
  });

  let deactivateForm = () => {
    turnOffPage();
    adForm.reset();
  };

  let removePin = () => {
    let mapPinItems = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    mapPinItems.forEach((item) => {
      item.remove();
    });
  };

  let removeCard = () => {
    let mapCard = map.querySelector(`.map__card`);
    if (mapCard) {
      mapCard.remove();
    }
  };

  window.map = {
    mapPinMain,
    adForm,
    allMap: map,
    deactivateForm,
    removePin,
    removeCard
  };

})();
