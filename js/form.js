'use strick';

(() => {
  // Поиск элементов
  let roomsNumber = document.querySelector(`#room_number`);
  let сapacity = document.querySelector(`#capacity`);

  // Валидация поля с количество мест
  let validateCapacity = (field) => {
    field.addEventListener(`change`,  () => {
      if (roomsNumber.value < сapacity.value) {
        сapacity.setCustomValidity(`Слишком много гостей`);
      } else {
        сapacity.setCustomValidity(``);
      }
    });
  };

  validateCapacity(сapacity);
  validateCapacity(roomsNumber);
})();
