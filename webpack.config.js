var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './src/js/db.js',
    './src/js/app.js',
    './src/css/style.css'
  ],
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.js'
  },
  module : {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js']
  }
}
