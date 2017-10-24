var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');
var candelaPlugins = require('candela/webpack');

module.exports = candelaPlugins({
  devtool: 'cheap-module-source-eval',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve('build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\/data\/test\.csv$/,
        use: 'raw-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        ]
      }
    ]
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
});
