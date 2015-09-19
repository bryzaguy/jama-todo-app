'use strict';

var React = require('react');

function pluralize(word, count) {
  return word + (count !== 1 ? 's' : '');
}

module.exports = React.createClass({
  render: function () {
    var active = this.props.totalActive,
      removed = this.props.totalRemoved;

    var restore = (
      <button className="clear-completed"
              onClick={this.props.restore}>
              Restore {removed} removed {pluralize('item', removed)}
      </button>);

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{active}</strong> {pluralize('item', active)} left
        </span>
        {removed > 0 && restore}
      </footer>);
  }
});
