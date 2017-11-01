var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');
var candelaPlugins = require('candela/webpack');

var loaders = require('./loaders');

module.exports = candelaPlugins({
  devtool: 'cheap-module-source-eval',
  entry: {
    index: './src/vis/Mousebrain/index.js'
  },
  output: {
    library: 'mousebrain',
    libraryTarget: 'umd',
    path: path.resolve('build'),
    filename: 'mousebrain.js'
  },
  module: {
    rules: loaders
  }
});
