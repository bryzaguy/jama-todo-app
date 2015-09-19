'use strict';

var React = require('react'),
  ENTER_KEY = 13,
  ESCAPE_KEY = 27;

module.exports = React.createClass({
  getInitialState: function () {
    return {
      title: this.props.todo.title
    };
  },
  update: function () {
    this.props.update({
      title: this.state.title
    });
    this.props.exit();
  },
  onChange: function (e) {
    this.state.title = e.target.value;
    this.setState(this.state);
  },
  onKeyDown: function (e) {
    if (e.keyCode === ESCAPE_KEY) {
      this.setState(this.getInitialState());
      this.props.exit();
    } else if (e.keyCode === ENTER_KEY) {
      this.update();
    }
  },
  componentDidUpdate: function () {
    React.findDOMNode(this.refs.title).focus();
  },
  render: function () {
    return (
      <li className="editing">
        <input className="edit" 
              value={this.state.title}
              onChange={this.onChange}
              onBlur={this.update}
              onKeyDown={this.onKeyDown}
              ref="title" />
      </li>);
  }
});
