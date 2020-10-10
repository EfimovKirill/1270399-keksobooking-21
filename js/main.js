'use strict';

// Объявление переменных
const HOUSING_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const SERVICES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const PIN_WIDTH = 40;
const PIN_HEIGHT = 40;
const PINS_COUNT = 8;
const PIN_SIZE_WIDTH = 65;
const PIN_SIZE_HEIGHT = 85;

// Поиск элементов
let map = document.querySelector(`.map`);
let mapPins = map.querySelector(`.map__pins`);
let mapPinsTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
let adForm = document.querySelector(`.ad-form`);
let mapFiltersForm = document.querySelector(`.map__filters`);
let mapPinMain = document.querySelector(`.map__pin--main`);
let address = document.querySelector(`#address`);
let roomsNumber = document.querySelector(`#room_number`);
let сapacity = document.querySelector(`#capacity`);

// Открытие карты
map.classList.remove(`map--faded`);

// Функция для создание случайного числа
let getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция создание массива меток с объектами
let createPinsArray = function (pinsCount) {
  let pins = [];
  for (let i = 1; i <= pinsCount; i++) {
    let pin = {
      author: {
        avatar: `img/avatars/user0` + i + `.png`
      },
      offer: {
        title: `Жильё ` + i,
        address: getRandomNumber(0, 601) + getRandomNumber(0, 601),
        price: getRandomNumber(0, 5001),
        type: HOUSING_TYPES[getRandomNumber(0, HOUSING_TYPES.length)],
        rooms: getRandomNumber(0, 4),
        guests: getRandomNumber(0, 4),
        checkin: TIMES[getRandomNumber(0, TIMES.length)],
        checkout: TIMES[getRandomNumber(0, TIMES.length)],
        features: SERVICES.slice(0, getRandomNumber(0, SERVICES.length)),
        description: `Опишите Ваше желье...`,
        photos: PHOTOS.slice(0, getRandomNumber(0, PHOTOS.length))
      },
      location: {
        x: getRandomNumber(0, 1201),
        y: getRandomNumber(130, 631)
      }
    };
    pins.push(pin);
  }
  return pins;
};

let arrayOfPins = createPinsArray(PINS_COUNT);

// Функция, создающая метку
let createPinsElement = function (pinValue) {
  let pinElement = mapPinsTemplate.cloneNode(true);

  pinElement.style.left = pinValue.location.x + PIN_WIDTH / 2 + `px`;
  pinElement.style.top = pinValue.location.y + PIN_HEIGHT / 2 + `px`;
  pinElement.querySelector(`img`).src = pinValue.author.avatar;
  pinElement.querySelector(`img`).alt = pinValue.offer.title;

  return pinElement;
};

// Функция, добавляющая метку
let addPinElement = function () {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i <= arrayOfPins.length - 1; i++) {
    fragment.appendChild(createPinsElement(arrayOfPins[i]));
  }
  mapPins.appendChild(fragment);
};

addPinElement();

// Деактивация страницы
let turnOffPage = function () {
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  mapFiltersForm.classList.add(`ad-form--disabled`);

  let disabledFieldSets = function (form) {
    let fieldSets = form.children;
    for (let i = 0; i < fieldSets.length - 1; i++) {
      fieldSets[i].disabled = true;
    }
  };

  disabledFieldSets(adForm);
  disabledFieldSets(mapFiltersForm);
};
turnOffPage();

// Функция нажатия кнопки мыши
const clickMouseButton = function (click) {
  if (typeof click === `object`) {
    switch (click.button) {
      case 0: turnOnPage();
    }
  }
};

mapPinMain.addEventListener(`mousedown`, clickMouseButton);

// Активация страницы
let turnOnPage = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  mapFiltersForm.classList.remove(`ad-form--disabled`);

  let enabledFieldSets = function (form) {
    let fieldSets = form.children;
    for (let i = 0; i < fieldSets.length - 1; i++) {
      fieldSets[i].disabled = false;
    }
  };

  enabledFieldSets(adForm);
  enabledFieldSets(mapFiltersForm);
};

// Функция нажатия клавиши enter
mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    turnOnPage();
  }
});

// Поле с адресом
const renderAddress = function () {
  let mapPinX = Math.round(parseInt(mapPinMain.style.left, 10) + (PIN_SIZE_WIDTH / 2));
  let mapPinY = Math.round(parseInt(mapPinMain.style.top, 10) + PIN_SIZE_HEIGHT);

  address.value = mapPinX + `,` + mapPinY;
};
renderAddress();

// Валидация поля с количество мест
const validateCapacity = function () {
  сapacity.addEventListener(`change`, function () {
    if (roomsNumber.value < сapacity.value) {
      сapacity.setCustomValidity(`Слишком много гостей`);
    } else {
      сapacity.setCustomValidity(``);
    }
  });
  roomsNumber.addEventListener(`change`, function () {
    if (roomsNumber.value < сapacity.value) {
      сapacity.setCustomValidity(`Слишком много гостей`);
    } else {
      сapacity.setCustomValidity(``);
    }
  });
};

validateCapacity();
