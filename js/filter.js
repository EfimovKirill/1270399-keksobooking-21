'use strict';

(() => {
  let housingType = document.querySelector(`#housing-type`);

  let filterPins = (arrayOfPins) => {
    return housingType.value === `any` ? arrayOfPins : arrayOfPins.filter((element) => element.offer.type === housingType.value);
  };

  let deactivate = () => {
    filters.reset();
  };

  window.filter = {
    filterPins,
    deactivate
  };
})();

