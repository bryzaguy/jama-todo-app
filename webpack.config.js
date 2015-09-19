'use strict';

module.exports = {
  entry: './index.js',
  output: {
    filename: 'app.js',
    path: 'js'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'jsx-loader!eslint-loader'
    }, {
      test: /\.js*$/,
      loader: 'eslint-loader'
    }]
  },
  resolve: {
    alias: {},
    extensions: ['', '.js', '.jsx']
  }
};
