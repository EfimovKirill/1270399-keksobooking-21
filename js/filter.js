'use strict';

(() => {
  let filters = document.querySelector(`.map__filters`);
  let type = document.querySelector(`#housing-type`);
  let price = document.querySelector(`#housing-price`);
  let rooms = document.querySelector(`#housing-rooms`);
  let guests = document.querySelector(`#housing-guests`);
  let features = document.querySelector(`#housing-features`);

  let filterType = (arrayOfPins) => {
    return type.value === `any` ? arrayOfPins : arrayOfPins.filter((element) => element.offer.type === type.value);
  };

  let filterPrice = (arrayOfPins) => {
    switch (price.value) {
      case `low`:
        return arrayOfPins.filter((offerEl) => {
          let price = offerEl.offer.price;

          return price < 10000;
        });
      case `middle`:
        return arrayOfPins.filter((offerEl) => {
          let price = offerEl.offer.price;

          return price >= 10000 && price < 50000;
        });
      case `high`:
        return arrayOfPins.filter((offerEl) => {
          let price = offerEl.offer.price;

          return price >= 50000;
        });
      default:
        return arrayOfPins;
    }
  };

  let filterRooms = (arrayOfPins) => {
    return rooms.value === `any` ? arrayOfPins : arrayOfPins.filter((element) => element.offer.rooms === +rooms.value);
  };

  let filterGuests = (arrayOfPins) => {
    return guests.value === `any` ? arrayOfPins : arrayOfPins.filter((element) => element.offer.guests === +guests.value);
  };

  let filterFeatures = (arrayOfPins) => {
    let checkboxes = Array.from(features.querySelectorAll(`.map__checkbox:checked`))
    .map((element) => element.value);

    if (checkboxes.length > 0) {
      return arrayOfPins.filter((pin) => {
        return checkboxes.every((checked) => pin.offer.features.indexOf(checked) !== -1);
      });
    }

    return arrayOfPins;
  };

  let deactivate = () => {
    filters.reset();
  };

  window.filter = {
    filters,
    type,
    price,
    rooms,
    guests,
    features,
    filterType,
    filterRooms,
    filterPrice,
    filterGuests,
    filterFeatures,
    deactivate
  };
})();

