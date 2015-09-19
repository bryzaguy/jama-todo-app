'use strict';

module.exports = function Store(key) {
  return {
    get: function () {
      return JSON.parse(localStorage.getItem(key));
    },
    set: function (val) {
      localStorage.setItem(key, JSON.stringify(val));
    }
  };
};
