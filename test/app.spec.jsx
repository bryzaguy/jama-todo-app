'use strict';

var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  Todos = require('../src/todos'),
  TodoItem = require('../src/todoItem'),
  TodoList = require('../src/todoList'),
  Footer = require('../src/footer'),
  App = require('../src/app'),
  ENTER_KEY = 13;

describe('Component: App', function () {
  beforeEach(function () {
    this.store = {
      get: jasmine.createSpy('get'),
      set: jasmine.createSpy('set')
    };
    this.todos = new Todos(this.store);
    this.app = TestUtils.renderIntoDocument(<App todos={this.todos} />);
  });

  describe('new-todo input', function () {
    beforeEach(function () {
      this.input = TestUtils
        .findRenderedDOMComponentWithClass(this.app, 'new-todo')
        .getDOMNode();
    });

    describe('when pressing enter', function () {
      beforeEach(function () {
        this.input.value = 'woah';
        TestUtils.Simulate.keyDown(this.input, {
          keyCode: ENTER_KEY
        });
      });

      it('adds todo', function () {
        expect(this.todos.get().length).toBe(1);
        expect(this.todos.get()[0].title).toBe('woah');
      });

      it('clears value after adding todo', function () {
        expect(this.input.value).toBe('');
      });

      it('refreshes todo list', function () {
        var todos = TestUtils
          .scryRenderedComponentsWithType(this.app, TodoItem);

        expect(todos.length).toBe(1);
      });
    });

    it('only adds todo with enter key', function () {
      TestUtils.Simulate.keyDown(this.input, {
        keyCode: 27
      });

      expect(this.todos.get().length).toBe(0);
    });
  });

  describe('todo list', function () {
    it('does not appear if there are no items', function () {
      var list = TestUtils
        .scryRenderedComponentsWithType(this.app, TodoList);

      expect(list.length).toBe(0);
    });
    describe('when todo items exist', function () {
      beforeEach(function () {
        this.todos.add('one');
        this.todos.add('two');

        this.list = TestUtils
          .findRenderedComponentWithType(this.app, TodoList);
      });

      it('has items as property', function () {
        expect(this.list.props.items).toEqual(this.todos.get());
      });

      it('has todos remove method as property', function () {
        expect(this.list.props.remove).toBe(this.todos.remove);
      });

      it('has todos update method as property', function () {
        expect(this.list.props.update).toBe(this.todos.update);
      });
    });
  });

  describe('footer', function () {
    it('does not appear if there are no items', function () {
      var footer = TestUtils
        .scryRenderedComponentsWithType(this.app, Footer);

      expect(footer.length).toBe(0);
    });

    it('does appear if there are only removed items', function () {
      var item = this.todos.add('something');
      this.todos.remove(item.id);

      var footer = TestUtils
        .scryRenderedComponentsWithType(this.app, Footer);

      expect(footer.length).toBe(1);
    });

    describe('when todo items exist', function () {
      beforeEach(function () {
        this.todos.add('one');
        this.todos.add('two');
        this.todos.add('three');
        this.todos.remove(1);

        this.footer = TestUtils
          .findRenderedComponentWithType(this.app, Footer);
      });

      it('has todos restore method as property', function () {
        expect(this.footer.props.restore).toBe(this.todos.restore);
      });

      it('has removed count as property', function () {
        expect(this.footer.props.totalRemoved).toBe(1);
      });

      it('has active count as property', function () {
        expect(this.footer.props.totalActive).toBe(2);
      });
    });
  });
});
