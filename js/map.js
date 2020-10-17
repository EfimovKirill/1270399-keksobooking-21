'use strict';

(() => {
  const PIN_WIDTH = 40;
  const PIN_HEIGHT = 40;

  // Поиск элементов
  let map = document.querySelector(`.map`);
  let mapPins = map.querySelector(`.map__pins`);
  let mapPinsTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let adForm = document.querySelector(`.ad-form`);
  let mapFiltersForm = document.querySelector(`.map__filters`);
  let mapPinMain = document.querySelector(`.map__pin--main`);

  // Функция, создающая метку
  let createPinsElement = (pinValue) => {
    let pinElement = mapPinsTemplate.cloneNode(true);

    pinElement.style.left = pinValue.location.x + PIN_WIDTH / 2 + `px`;
    pinElement.style.top = pinValue.location.y + PIN_HEIGHT / 2 + `px`;
    pinElement.querySelector(`img`).src = pinValue.author.avatar;
    pinElement.querySelector(`img`).alt = pinValue.offer.title;

    return pinElement;
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
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    mapFiltersForm.classList.remove(`ad-form--disabled`);

    disabledFieldSets(adForm, false);
    disabledFieldSets(mapFiltersForm, false);
  };

  let successHandler = (pinsValue) => {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < window.data.pinsCount - 1; i++) {
      fragment.appendChild(createPinsElement(pinsValue[i]));
    }
    mapPins.appendChild(fragment);
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
      switch (click.button) {
        case 0: turnOnPage();
        case 0: window.backend.load(successHandler,errorHandler);
      }
    }
  };

  mapPinMain.addEventListener(`mousedown`, clickMouseButton);

  // Функция нажатия клавиши enter
  mapPinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      turnOnPage();
      window.backend.load(successHandler,errorHandler);
    }
  });

  window.map = {
    mapPinMain: mapPinMain
  };

})();
