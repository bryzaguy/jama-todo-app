'use strict';

var App = require('./src/app'),
  React = require('react'),
  Todos = require('./src/todos'),
  Store = require('./src/store'),
  app = React.createElement(App, {
    todos: new Todos(new Store('todo-app-store'))
  });

React.render(app, document.getElementById('todo-app'));
