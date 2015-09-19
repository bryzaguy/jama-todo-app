'use strict';

var EditTodoItem = require('../src/editTodoItem'),
  React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  ENTER_KEY = 13,
  ESCAPE_KEY = 27;

describe('Component: EditTodoItem', function () {

  beforeEach(function () {
    this.todo = {
      id: 23,
      title: 'cool'
    };
    this.updateSpy = jasmine.createSpy('update');
    this.exitEditSpy = jasmine.createSpy('exitEdit');

    var item = (<EditTodoItem todo={this.todo} 
                              update={this.updateSpy} 
                              exit={this.exitEditSpy} />);

    this.item = TestUtils.renderIntoDocument(item).getDOMNode();
    this.input = this.item.lastChild;
  });

  describe('when pressing escape', function () {
    beforeEach(function () {
      this.input.value = 'super cool';
      TestUtils.Simulate.change(this.input);
      TestUtils.Simulate.keyDown(this.input, {
        keyCode: ESCAPE_KEY
      });
    });

    it('exits edit', function () {
      expect(this.exitEditSpy).toHaveBeenCalled();
    });

    it('does not update item', function () {
      expect(this.updateSpy).not.toHaveBeenCalled();
      expect(this.input.value).toBe('cool');
    });
  });

  describe('when pressing enter', function () {
    beforeEach(function () {
      this.input.value = 'super cool';
      TestUtils.Simulate.change(this.input);
      TestUtils.Simulate.keyDown(this.input, {
        keyCode: ENTER_KEY
      });
    });

    it('exits edit', function () {
      expect(this.exitEditSpy).toHaveBeenCalled();
    });

    it('updates item', function () {
      expect(this.input.value).toBe('super cool');
      expect(this.updateSpy).toHaveBeenCalledWith({
        title: 'super cool'
      });
    });
  });

  describe('when changing focus', function () {
    beforeEach(function () {
      this.input.value = 'toast';
      TestUtils.Simulate.change(this.input);
      TestUtils.Simulate.blur(this.input);
    });

    it('exits edit', function () {
      expect(this.exitEditSpy).toHaveBeenCalled();
    });

    it('updates item', function () {
      expect(this.input.value).toBe('toast');
      expect(this.updateSpy).toHaveBeenCalledWith({
        title: 'toast'
      });
    });
  });
});
