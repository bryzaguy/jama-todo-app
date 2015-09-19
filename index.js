'use strict';

var App = require('./src/app'),
  React = require('react'),
  Todos = require('./src/todos'),
  Store = require('./src/store'),
  key = 'todo-app-store',
  element = React.createElement(App, {
    todos: new Todos(new Store(key))
  }),
  div = document.getElementById('todo-app');

React.render(element, div);
