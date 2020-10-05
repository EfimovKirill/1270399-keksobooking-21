'use strict';

// Объявление переменных
const HOUSING_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const SERVICES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const PIN_WIDTH = 40;
const PIN_HEIGHT = 40;
const PINS_COUNT = 8;

// Поиск элементов
let map = document.querySelector(`.map`);
let mapPins = map.querySelector(`.map__pins`);
let mapPinsTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

// Открытие карты
map.classList.remove(`map--faded`);

// Функция для создание случайного числа
let getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция создание массива меток с объектами
let createPinArray = function () {
  let pins = [];
  for (let i = 0; i <= PINS_COUNT - 1; i++) {
    pins[i] = {
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
  }
  return pins;
};

// Функция, создающая метку
let createPinElement = function (pinValue) {
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
  createPinArray(PINS_COUNT);
  for (let i = 1; i <= PINS_COUNT; i++) {
    fragment.appendChild(createPinElement(pins[i]));
  }
  mapPins.appendChild(fragment);
};

addPinElement();
