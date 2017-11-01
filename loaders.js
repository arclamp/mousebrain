module.exports = [
  {
    test: /\/data\/.*\.csv$/,
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
  },
  {
    test: /\.jade$/,
    use: [
      {
        loader: 'pug-loader'
      }
    ]
  }
];
