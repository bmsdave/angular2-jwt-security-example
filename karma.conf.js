var path = require('path');

module.exports = function(config) {
  var testWebpackConfig = require('./webpack.test.config.js');
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [ ],
    files: [ { pattern: 'spec-bundle.js', watched: false } ],
    preprocessors: { 'spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },
    webpack: testWebpackConfig,
    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'json' },
        { type: 'html' }
      ]
    },
    webpackServer: { noInfo: true },
    reporters: [ 'mocha', 'coverage' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [
      'PhantomJS'
    ],
    singleRun: true
  });

};
