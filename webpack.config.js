const webpack = require("webpack");
module.exports = {
  entry: {
    dev: ['webpack/hot/dev-server', './main.js', './demo/demo.js'],
    dist: ['./main.js']
  },
  output: {
    path: './',
    filename: 'build/[name].bookmarkList.js',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.ProvidePlugin({
      "window.pubsub": "pubsub"
    })
  ],
  contentBase: './demo', // for webpack dev server
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass' // sass -> css -> javascript -> inline style
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      { 
        test: /\.(woff|png|jpg|gif)$/, 
        loader: 'url-loader?limit=10000' 
      }
    ]
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  }
};