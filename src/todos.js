'use strict';

module.exports = function Todos(store) {
  var items = this.items = store.get() || [],
    count = items.length,
    Todo = function (title) {
      this.id = ++count;
      this.title = title;
      this.removed = this.completed = false;
    },
    storeUpdateCb,
    storeSet = function (value) {
      store.set(value);
      if (storeUpdateCb) {
        storeUpdateCb();
      }
    };

  this.onStoreUpdate = function (cb) {
    storeUpdateCb = cb;
  };

  this.get = function () {
    return items.filter(function (item) {
      return !item.removed;
    });
  };

  this.add = function (title) {
    var item = new Todo(title);
    items.unshift(item);
    storeSet(items);
    return item;
  };

  this.update = function (id, props) {
    var i = getItemIndex(id);
    for (var key in props) {
      items[i][key] = props[key];
    }
    storeSet(items);
  };

  this.remove = function (id) {
    items[getItemIndex(id)].removed = true;
    storeSet(items);
  };

  this.restore = function () {
    for (var key in items) {
      items[key].removed = false;
    }
    storeSet(items);
  };

  Object.defineProperties(this, {
    totalActive: {
      get: function () {
        return items.filter(function (item) {
          return !item.removed && !item.completed;
        }).length;
      }
    },
    totalRemoved: {
      get: function () {
        return items.filter(function (item) {
          return item.removed;
        }).length;
      }
    }
  });

  function getItemIndex(id) {
    for (var key in items) {
      if (items[key].id === id) {
        return key;
      }
    }
  }
};
