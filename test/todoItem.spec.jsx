'use strict';

var TodoItem = require('../src/todoItem'),
  React = require('react/addons'),
  TestUtils = React.addons.TestUtils;

describe('Component: TodoItem', function () {

  beforeEach(function () {
    this.todo = {
      id: 23,
      title: 'cool',
      completed: false
    };
    this.updateSpy = jasmine.createSpy('update');
    this.removeSpy = jasmine.createSpy('remove');
    this.editSpy = jasmine.createSpy('edit');

    var item = (<TodoItem todo={this.todo} 
                          update={this.updateSpy} 
                          remove={this.removeSpy}
                          edit={this.editSpy} />);

    this.item = TestUtils.renderIntoDocument(item).getDOMNode();
    this.label = this.item.firstChild.childNodes[1];
    this.checkbox = this.item.firstChild.firstChild;
  });

  describe('initally', function () {
    it('defaults to view', function () {
      expect(this.item.className).toBe('');
      expect(this.checkbox.checked).toBe(false);
    });

    it('contains todo title', function () {
      expect(this.label.innerText).toBe('cool');
    });

    it('is completed if todo status is completed', function () {
      var item = TestUtils.renderIntoDocument(
        <TodoItem todo={{completed: true}} />
      ).getDOMNode();
      var checkbox = item.firstChild.firstChild;

      expect(item.className).toBe('completed');
      expect(checkbox.checked).toBe(true);
    });

    it('disables editing if completed', function () {
      var spy = jasmine.createSpy('edit-completed');
      var item = TestUtils.renderIntoDocument(
        <TodoItem todo={{completed: true}} edit={spy} />
      ).getDOMNode();
      var label = item.firstChild.childNodes[1];

      TestUtils.Simulate.doubleClick(label);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('clicking remove', function () {
    beforeEach(function () {
      var button = this.item.firstChild.lastChild;
      TestUtils.Simulate.click(button);
    });

    it('calls remove', function () {
      expect(this.removeSpy).toHaveBeenCalledWith();
    });
  });

  describe('checking complete', function () {
    beforeEach(function () {
      this.checkbox = this.item.firstChild.firstChild;
      TestUtils.Simulate.change(this.checkbox, {
        target: {
          checked: true
        }
      });
    });

    it('calls update with completed todo', function () {
      expect(this.updateSpy).toHaveBeenCalledWith({
        completed: true
      });
    });

    it('marks todo as active if checked again', function () {
      TestUtils.Simulate.change(this.checkbox, {
        target: {
          checked: false
        }
      });
      expect(this.todo.completed).toBe(false);
    });
  });

  describe('double clicking label', function () {
    beforeEach(function () {
      TestUtils.Simulate.doubleClick(this.label);
    });

    it('enables editing', function () {
      expect(this.editSpy).toHaveBeenCalledWith();
    });
  });
});
