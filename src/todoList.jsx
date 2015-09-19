'use strict';

var React = require('react'),
  TodoItem = require('./todoItem'),
  EditTodoItem = require('./editTodoItem');

module.exports = React.createClass({
  getInitialState: function () {
    return {};
  },
  edit: function (id) {
    this.setState({
      editId: id
    });
  },
  exitEdit: function () {
    this.edit(null);
  },
  render: function () {
    var items = this.props.items.map(function (item) {
      var type = this.state.editId === item.id ? EditTodoItem : TodoItem;
      return React.createElement(type, {
        todo: item,
        update: this.props.update.bind(null, item.id),
        remove: this.props.remove.bind(null, item.id),
        edit: this.edit.bind(this, item.id),
        exit: this.exitEdit,
        key: item.id
      });
    }.bind(this));

    return (<section className="main">
              <ul className="todo-list">{items}</ul>
            </section>);
  }
});
