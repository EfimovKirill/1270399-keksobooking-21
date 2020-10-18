'use strict';

(() => {

// Объявление переменных
  const PINS_COUNT = 8;
  /*
  const HOUSING_TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const TIMES = [`12:00`, `13:00`, `14:00`];
  const SERVICES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  // Функция для создание случайного числа
  let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  // Функция создание массива меток с объектами
  let createPinsArray = (pinsCount) => {
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
  */

  window.data = {
    pinsCount: PINS_COUNT
  };

})();

