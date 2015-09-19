'use strict';

var Store = require('../src/store');

describe('store', function () {
  beforeEach(function () {
    this.key = 'a-super-unique-key';
    this.store = new Store(this.key);
  });

  afterEach(function () {
    localStorage.clear();
  });

  it('is able to set to localStorage', function () {
    this.store.set(['woah']);
    expect(localStorage.getItem(this.key)).toBe('["woah"]');
  });

  it('is able to get from localStorage', function () {
    localStorage.setItem(this.key, '["crazy"]');
    expect(this.store.get(this.key)).toEqual(['crazy']);
  });
});
