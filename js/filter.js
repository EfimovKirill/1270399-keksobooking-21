'use strict';

(() => {
  let housingType = document.querySelector(`#housing-type`);
  let filters = document.querySelector(`.map__filters`);

  let filterPins = (arrayOfPins) => {
    return housingType.value === `any` ? arrayOfPins : arrayOfPins.filter((element) => element.offer.type === housingType.value);
  };

  let deactivate = () => {
    filters.reset();
  };

  window.filter = {
    filters,
    filterPins,
    deactivate
  };
})();

