'use strict';

(() => {
  const PIN_WIDTH = 40;
  const PIN_HEIGHT = 40;
  const PINS_COUNT_DEFAULT = 5;
  const DEFAULT_FILTER_TYPE = `any`;
  const MIN_PRICE = 10000;
  const MAX_PRICE = 50000;

  let generateId = (prefix) => {
    return `${prefix}-${(~~(Math.random() * 1e8)).toString(16)}`;
  };

  let rusHouseType = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  let offers = [];

  let map = document.querySelector(`.map`);
  let mapPins = map.querySelector(`.map__pins`);
  let mapPinsTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let adForm = document.querySelector(`.ad-form`);
  let mapFiltersForm = document.querySelector(`.map__filters`);
  let mapPinMain = document.querySelector(`.map__pin--main`);
  let housingTypeElement = document.querySelector(`#housing-type`);
  let housingPriceElement = document.querySelector(`#housing-price`);
  let housingRoomsElement = document.querySelector(`#housing-rooms`);
  let housingGuestsElement = document.querySelector(`#housing-guests`);
  let housingFeaturesElement = document.querySelector(`#housing-features`);
  let fragment = document.createDocumentFragment();
  let cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  let mapFiltersContainer = map.querySelector(`.map__filters-container`);
  let pinsContainer = document.createElement(`div`);

  let successHandler = (data) => {
    offers = data.map((item) => {
      item.id = generateId(`offer`);

      return item;
    });
    turnOnPage();
  };

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
    card.querySelector(`.popup__type`).textContent = rusHouseType[element.offer.type];
    card.querySelector(`.popup__text--capacity`).textContent = `${element.offer.rooms} комнаты для ${element.offer.guests}`;
    card.querySelector(`.popup__text--time`).textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;

    let popupFeatures = card.querySelector(`.popup__features`);
    popupFeatures.innerHTML = ``;
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

  let renderOffers = (arrayOfPins) => {
    let pinsCount = arrayOfPins.length > PINS_COUNT_DEFAULT ? PINS_COUNT_DEFAULT : arrayOfPins.length;

    pinsContainer.innerHTML = ``;

    for (let i = 0; i < pinsCount; i++) {
      let pin = createPinsElement(arrayOfPins[i]);
      pin.dataset.offerId = arrayOfPins[i].id;
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
      let offerId = button.dataset.offerId;
      let currentOffer = offers.find((offer) => offer.id === offerId);
      let currentPopup = createCard(currentOffer);
      openPopup(currentPopup);
      let closeCard = document.querySelector(`.popup__close`);
      closeCard.addEventListener(`click`, closePopup);
      document.addEventListener(`keydown`, onPopupEscPress);
    }
  });

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

  let disabledFieldSets = (form, booleanValue) => {
    let fieldSets = form.children;
    for (let i = 0; i < fieldSets.length; i++) {
      fieldSets[i].disabled = booleanValue;
    }
  };

  let turnOffPage = () => {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    mapFiltersForm.classList.add(`ad-form--disabled`);

    disabledFieldSets(adForm, true);
    disabledFieldSets(mapFiltersForm, true);
  };

  turnOffPage();

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

  let clickMouseButton = (click) => {
    if (typeof click === `object`) {
      window.backend.load(successHandler, errorHandler);
    }
  };

  mapPinMain.addEventListener(`mousedown`, clickMouseButton);

  mapPinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      window.backend.load(successHandler, errorHandler);
    }
  });

  const checkPrice = function (offer) {
    switch (housingPriceElement.value) {
      case `any`:
        return true;
      case `low`:
        return (offer.offer.price < MIN_PRICE);
      case `middle`:
        return (offer.offer.price >= MIN_PRICE) && (offer.offer.price <= MAX_PRICE);
      case `high`:
        return (offer.offer.price > MAX_PRICE);
      default:
        return offer === housingPriceElement.value;
    }
  };

  let checkFeatures = () => Array.from(housingFeaturesElement.querySelectorAll(`input:checked`)).map(function (feature) {
    return feature.value;
  });

  let filterOffers = (dataOffers) => {
    return dataOffers
      .filter((offer) => {
          let isOfferFit = !!(offer.offer);
          let isTypeFit = housingTypeElement.value === DEFAULT_FILTER_TYPE ? true : offer.offer.type === housingTypeElement.value;
          let isPriceFit = checkPrice(offer);
          let isRoomsFit = housingRoomsElement.value === DEFAULT_FILTER_TYPE ? true : offer.offer.rooms === +housingRoomsElement.value;
          let isGuestsFit = housingGuestsElement.value === DEFAULT_FILTER_TYPE ? true : offer.offer.guests === +housingGuestsElement.value;
          let isFeaturesFit = checkFeatures().every((feature) => offer.offer.features.includes(feature));
          return isOfferFit && isTypeFit && isPriceFit && isRoomsFit && isGuestsFit && isFeaturesFit;
        }).slice(0, PINS_COUNT_DEFAULT);
  };

  let onFilterChange = window.debounce.debounce(() => {
    let filteredElements = filterOffers(offers);
    renderOffers(filteredElements);
  });

  mapFiltersForm.addEventListener(`change`, () => {
    onFilterChange();
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

  let deactivateFilter = () => {
    mapFiltersForm.reset();
  };

  window.map = {
    mapPinMain,
    adForm,
    allMap: map,
    deactivateForm,
    removePin,
    removeCard,
    deactivateFilter
  };

})();
