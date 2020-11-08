'use strict';

(() => {
  const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_POST = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT_IN_MS = 10000;

  let StatusCode = {
    OK: 200
  };

  let createXhr = (onSuccess, onError, method, url) => {
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

    xhr.open(method, url);
    return xhr;
  };

  let load = (onSuccess, onError) => {
    createXhr(onSuccess, onError, `GET`, URL_GET).send();
  };

  let upload = (onSuccess, onError, data) => {
    createXhr(onSuccess, onError, `POST`, URL_POST).send(data);
  };

  window.backend = {
    load,
    upload
  };

})();
