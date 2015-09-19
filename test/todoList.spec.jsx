'use strict';

var TodoList = require('../src/todoList'),
  TodoItem = require('../src/todoItem'),
  EditTodoItem = require('../src/editTodoItem'),
  React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  find = TestUtils.findRenderedComponentWithType,
  findAll = TestUtils.scryRenderedComponentsWithType,
  render = TestUtils.renderIntoDocument;

describe('Component: TodoList', function () {
  it('renders no todos if no items or edit items exist', function () {
    var list = render(<TodoList items={[]} />);

    expect(findAll(list, TodoItem)).toEqual([]);
    expect(findAll(list, EditTodoItem)).toEqual([]);
  });

  describe('each item', function () {
    beforeEach(function () {
      this.removeSpy = jasmine.createSpy('remove');
      this.updateSpy = jasmine.createSpy('update');
      this.list = render(
        <TodoList items={[{id:1}]} update={this.updateSpy} remove={this.removeSpy} />
      );
      this.item = find(this.list, TodoItem);
    });

    it('has remove method as parameter bound to the item id', function () {
      this.item.props.remove();
      expect(this.removeSpy).toHaveBeenCalledWith(1);
    });

    it('has update method as parameter bound to the item id', function () {
      this.item.props.update();
      expect(this.updateSpy).toHaveBeenCalledWith(1);
    });

    it('has edit method as parameter bound to the item id', function () {
      this.item.props.edit();
      expect(this.list.state.editId).toBe(1);
    });

    describe('in edit mode', function () {
      beforeEach(function () {
        this.item.props.edit();
        this.editItem = find(this.list, EditTodoItem);
      });

      it('has update method as parameter', function () {
        this.editItem.props.update();
        expect(this.updateSpy).toHaveBeenCalledWith(1);
      });

      it('has exitEdit method as parameter', function () {
        expect(this.editItem.props.exit).toBe(this.list.exitEdit);
      });

      it('has todo as parameter', function () {
        expect(this.editItem.props.todo).toEqual({
          id: 1
        });
      });

      describe('exitEdit method', function () {
        it('exits edit mode', function () {
          this.list.exitEdit();
          expect(findAll(this.list, EditTodoItem).length).toBe(0);
          expect(findAll(this.list, TodoItem).length).toBe(1);
        });
      });
    });
  });

  describe('list of todos', function () {
    beforeEach(function () {
      var noop = function () {};
      this.items = [{
        id: 0
      }, {
        id: 1
      }];

      this.list = render(<TodoList items={this.items}
                                   remove={noop}
                                   update={noop} />);
    });
    it('displays list of todos in same order', function () {
      var result = findAll(this.list, TodoItem);

      expect(result[0].props.todo).toBe(this.items[0]);
      expect(result[1].props.todo).toBe(this.items[1]);
    });
  });
});
