'use strict';

(() => {
  const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;
  const TIMEOUT_IN_MS = 10000;

  let StatusCode = {
    OK: 200
  };

  let load = (onSuccess, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL_GET);
    xhr.send();
  };

  window.backend = {
    load
  };

})();
