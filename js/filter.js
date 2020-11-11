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
    if (price.value === `any`) {
      arrayOfPins = arrayOfPins.filter((element) => {
        let cost = {
          middle: (elementPrice) => {
            return elementPrice >= 10000 && elementPrice < 50000;
          },
          low: (elementPrice) => {
            return elementPrice < 10000;
          },
          high: (elementPrice) => {
            return elementPrice >= 50000;
          }
        };
        return cost[price.value](element.offer.price);
      });
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
      arrayOfPins = arrayOfPins.filter((pin) => {
        return checkboxes.every((checked) => pin.offer.features.indexOf(checked) !== -1);
      });
    }
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

