'use strict';

var React = require('react'),
  TodoList = require('./todoList'),
  Footer = require('./footer'),
  ENTER_KEY = 13;

module.exports = React.createClass({
  componentDidMount: function () {
    this.props.todos.onStoreUpdate(this.forceUpdate.bind(this));
  },
  onKeyDown: function (e) {
    if (e.keyCode === ENTER_KEY) {
      var input = React.findDOMNode(this.refs.newTodo);
      this.props.todos.add(input.value);
      input.value = '';
    }
  },
  render: function () {
    var list,
      footer,
      todos = this.props.todos,
      items = todos.get();

    if (items.length) {
      list = (<TodoList items={items} 
                        remove={todos.remove}
                        update={todos.update} />);
    }

    if (items.length || todos.totalRemoved) {
      footer = (<Footer restore={todos.restore} 
                        totalActive={todos.totalActive} 
                        totalRemoved={todos.totalRemoved} />);
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" 
                 placeholder="What needs to be done?" 
                 onKeyDown={this.onKeyDown}
                 ref="newTodo"
                 autofocus />
        </header>
        {list}
        {footer}
      </section>);
  }
});
