var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-eval',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve('build'),
    filename: 'index.js'
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.template.ejs',
      title: 'Mousebrain',
      chunks: [
        'index'
      ]
    })
  ]
};
