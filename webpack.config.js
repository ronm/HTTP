var webpack = require('webpack');

module.exports = {
  entry:  ['./js/HTTP.js'],
  output: {
    filename: './js/http.min.js',
    library: "$http",
    libraryTarget: "var"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}