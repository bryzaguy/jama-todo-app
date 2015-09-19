'use strict';

var React = require('react');

function stateToggle(item) {
  return '\t(' + (item.completed ? 'X' : '_') + ')\t';
}

module.exports = React.createClass({
  linkTemplate: 'mailto:?subject=Check out my todos!&body=',
  bodyTemplate: 'Hey friend,\n\nCheck out my todos:\n\n',
  email: function (e) {
    e.preventDefault();

    var body = this.props.items
      .reduce(function (result, item) {
        return result + stateToggle(item) + item.title + '\n';
      }, this.bodyTemplate);

    var link = this.linkTemplate + encodeURIComponent(body);
    this.props.window.location = link;
  },
  render: function () {
    var style = {
      fontSize: '1.5em'
    };

    return (
      <div className="info">
        <a href="/email"
           style={style}
           onClick={this.email}>
          Click here to share your todos
        </a>
      </div>);
  }
});
