'use strict';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    browsers: ['Safari'],
    reporters: ['progress'],

    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    exclude: ['node_modules'],

    preprocessors: {
      '**/*.spec.js*': ['webpack']
    },

    files: [
      '**/*.spec.js*'
    ],

    webpackMiddleware: {
      noInfo: true
    },

    webpack: require('./webpack.config')
  });
};
