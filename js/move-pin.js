'use strict';

(() => {
  const PIN_SIZE_WIDTH = 64;
  const HALF_PIN_SIZE = Math.round(PIN_SIZE_WIDTH/2);
  const PIN_SIZE_HEIGHT = 72;
  const MAX_WIDTH = 1137 + HALF_PIN_SIZE;
  const MIN_WIDTH = 0 - HALF_PIN_SIZE - 1;
  const START_WIDTH = 600 - HALF_PIN_SIZE;
  const START_WIDTH_VALUE = 600;
  const MAX_HEIGHT = 631 - PIN_SIZE_HEIGHT;
  const MIN_HEIGHT = 129 - PIN_SIZE_HEIGHT;
  const START_HEIGHT = 303 + PIN_SIZE_HEIGHT;
  const START_HEIGHT_VALUE = 447;

  let mapPinMain = window.map.mapPinMain;

  let address = document.querySelector(`#address`);
  address.value = START_WIDTH_VALUE + `,` + START_HEIGHT_VALUE;

  address.setAttribute(`readonly`, ``);

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    let onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((mapPinMain.offsetTop - shift.y) < MAX_HEIGHT && (mapPinMain.offsetTop - shift.y) > MIN_HEIGHT && (mapPinMain.offsetLeft - shift.x) < MAX_WIDTH && (mapPinMain.offsetLeft - shift.x) > MIN_WIDTH) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + `px`;
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + `px`;
        address.value = (mapPinMain.offsetLeft - shift.x + HALF_PIN_SIZE) + `,` + (mapPinMain.offsetTop - shift.y + PIN_SIZE_HEIGHT);
      }
    };

    let onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        let onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          mapPinMain.removeEventListener(`click`, onClickPreventDefault);
        };
        mapPinMain.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  let getPinStartPosition = () => {
    mapPinMain.style.left = `${START_WIDTH}px`;
    mapPinMain.style.top = `${START_HEIGHT}px`;
  };

  let setStartCoordinates = () => {
    address.value = START_WIDTH_VALUE + `,` + START_HEIGHT_VALUE;
  };

  window.movePin = {
    startPosition: getPinStartPosition,
    setStartCoordinates
  };

})();
