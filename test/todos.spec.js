'use strict';

var Todos = require('../src/todos');

describe('todos', function () {
  beforeEach(function () {
    this.store = {
      get: jasmine.createSpy('get'),
      set: jasmine.createSpy('set')
    };
    this.todos = new Todos(this.store);
  });

  describe('initally', function () {
    it('attempts to get items from store', function () {
      expect(this.store.get).toHaveBeenCalled();
    });

    it('uses an empty array if none in store', function () {
      expect(this.todos.items).toEqual([]);
    });
  });

  describe('get method', function () {
    it('returns active items', function () {
      var items = [{
        'bob': 1
      }, {
        'bill': 3
      }];

      this.store.get = function () {
        return items.concat({
          'steve': 4,
          removed: true
        });
      };

      expect(new Todos(this.store).get()).toEqual(items);
    });
  });

  describe('add method', function () {
    beforeEach(function () {
      this.item = this.todos.add('sup');
    });

    it('adds item with default id of 1', function () {
      expect(this.item.title).toBe('sup');
    });

    it('sets default id of 1', function () {
      expect(this.item.id).toBe(1);
    });

    it('adds item as active', function () {
      expect(this.item.completed).toBe(false);
    });

    it('can add many items', function () {
      this.todos.add('sup yo');
      expect(this.todos.items.length).toBe(2);
    });

    it('increments id with more adds', function () {
      expect(this.todos.add('sup yo').id).toBe(2);
    });

    it('puts new todos on top', function () {
      expect(this.todos.add('sup yo')).toBe(this.todos.items[0]);
    });

    it('prevents id collisions with stored items', function () {
      this.store.get = function () {
        return [{}, {}];
      };

      expect(new Todos(this.store).add('boom').id).toBe(3);
    });

    it('stores resulting items', function () {
      expect(this.store.set).toHaveBeenCalledWith(this.todos.items);
    });
  });

  describe('update method', function () {
    beforeEach(function () {
      this.todos.items.push({
        'id': 3,
        'woah': false
      });
      this.todos.update(3, {
        'woah': true
      });
    });

    it('updates an item', function () {
      expect(this.todos.items).toEqual([{
        'id': 3,
        'woah': true
      }]);
    });

    it('stores resulting items', function () {
      expect(this.store.set).toHaveBeenCalledWith(this.todos.items);
    });

    it('calls onStoreUpdate callback', function () {
      var cb = jasmine.createSpy('storeUpdated');
      this.todos.onStoreUpdate(cb);
      this.todos.update(3, {});
      expect(cb).toHaveBeenCalled();
    });
  });

  describe('remove method', function () {
    beforeEach(function () {
      this.todos.items.push({
        'id': 3,
        'well': 'yes'
      });
      this.todos.remove(3);
    });

    it('removes an item', function () {
      expect(this.todos.get()).toEqual([]);
    });

    it('stores resulting items', function () {
      expect(this.store.set).toHaveBeenCalledWith(this.todos.items);
    });

    it('calls onStoreUpdate callback', function () {
      var cb = jasmine.createSpy('storeUpdated');
      var item = this.todos.add('stuff');
      this.todos.onStoreUpdate(cb);
      this.todos.remove(item.id);
      expect(cb).toHaveBeenCalled();
    });
  });

  describe('restore method', function () {
    beforeEach(function () {
      this.todos.items.push({
        removed: true
      });
      this.todos.items.push({
        removed: true
      });
      this.todos.restore();
    });

    it('makes all removed items active again', function () {
      expect(this.todos.get().length).toBe(2);
    });

    it('stores resulting items', function () {
      expect(this.store.set).toHaveBeenCalledWith(this.todos.items);
    });

    it('calls onStoreUpdate callback', function () {
      var cb = jasmine.createSpy('storeUpdated');
      this.todos.onStoreUpdate(cb);
      this.todos.restore();
      expect(cb).toHaveBeenCalled();
    });
  });

  describe('totalActive property', function () {
    it('counts items that are not removed', function () {
      this.todos.items.push({
        removed: true
      });
      this.todos.items.push({
        removed: true
      });
      this.todos.items.push({
        removed: false
      });

      expect(this.todos.totalActive).toBe(1);
    });

    it('counts items that are not completed', function () {
      this.todos.items.push({
        completed: true
      });
      this.todos.items.push({
        completed: false
      });
      this.todos.items.push({
        completed: false
      });

      expect(this.todos.totalActive).toBe(2);
    });
  });

  describe('totalRemoved property', function () {
    it('counts items that are removed', function () {
      this.todos.items.push({
        removed: true
      });
      this.todos.items.push({
        removed: true
      });
      this.todos.items.push({
        removed: false
      });

      expect(this.todos.totalRemoved).toBe(2);
    });
  });

  describe('onStoreUpdate callback', function () {
    it('is called when the store is updated', function () {
      var cb = jasmine.createSpy('storeUpdated');
      this.todos.onStoreUpdate(cb);
      this.todos.add('sup yo');
      expect(cb).toHaveBeenCalled();
    });
  });
});
