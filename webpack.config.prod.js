const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/index_bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/,
        query: {
          presets: ['react', 'env']
        }
      },
      { 
        test: /\.jsx$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/,
        query: {
          presets: ['react', 'env']
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
          options: { url: false }
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
      // TODO: Use a url loader to load fonts and images - Could optimise images at this point - If I do this, shouldn't be a need to copy 'fonts' and 'img', as below using CopyWebpackPlugin - CSS image and font paths should be as follows (due to all paths being relative to main.scss):
      // ./common/img or simply common/img
      // ./common/fonts or simply common/fonts

      // ,
      // {
      //   test: /\.(eot|svg|ttf|woff|woff2|png)$/, 
      //   loader: 'url-loader'
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin([
      {from:'client/common/fonts',to:'fonts'},
      {from:'client/common/img',to:'img'}
    ]),
    new webpack.optimize.UglifyJsPlugin()
  ]
}