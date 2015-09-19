'use strict';

var React = require('react');

module.exports = React.createClass({
  remove: function () {
    this.props.remove();
  },
  onComplete: function (e) {
    this.props.update({
      completed: e.target.checked
    });
  },
  onDoubleClick: function () {
    if (!this.props.todo.completed) {
      this.props.edit();
    }
  },
  render: function () {
    var todo = this.props.todo;
    return (
      <li className={todo.completed ? 'completed' : ''}>
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 defaultChecked={todo.completed}
                 onChange={this.onComplete} />
          <label onDoubleClick={this.onDoubleClick}>
            {this.props.todo.title} 
          </label>
          <button className="destroy" onClick={this.remove} />
        </div>
      </li>);
  }
});
