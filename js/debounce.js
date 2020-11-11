
'use strict';

(() => {
  const DEBOUNCE_INTERVAL = 500;

  window.debounce = (cb) => {
    let lastTimeout = null;

    return () => {
      let parameters = `arguments`;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(() => {
        cb.spread(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
