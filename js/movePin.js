'use strict';

(() => {
  let mapPinMain = window.map.mapPinMain;
  const PIN_SIZE_WIDTH = 62;
  const PIN_SIZE_HEIGHT = 72;
  const MAX_HEIGHT = 630;
  const MIN_HEIGHT = 130;
  const MAX_WIDTH = 1135 + (PIN_SIZE_WIDTH / 2);
  const MIN_WIDTH = 0 - (PIN_SIZE_WIDTH / 2);

  let address = document.querySelector(`#address`);
  address.value = 575 + `,` + 454;

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
        address.value = (mapPinMain.offsetLeft - shift.x + PIN_SIZE_WIDTH / 2) + `,` + (mapPinMain.offsetTop - shift.y + PIN_SIZE_HEIGHT);
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

})();
