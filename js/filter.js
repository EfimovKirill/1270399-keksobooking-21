'use strict';

(() => {
  let housingType = document.querySelector(`#housing-type`);

  let filterPins = (arrayOfPins) => {
    if (housingType.value === `any`) {
      return arrayOfPins;
    }
    let filteredPins = arrayOfPins.filter((element) => {
      return element.offer.type === housingType.value;
    });

    return filteredPins;
  };

  window.filter = {
    filterPins,
  };
})();

