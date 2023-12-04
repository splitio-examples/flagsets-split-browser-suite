const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = [{
  mode: 'production',
  entry: {
    index: './client/index-on.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      title: 'Split flag sets example: filtering by flag set & production mode',
      template: './client/index.html'
    }),
  ],
  output: {
    filename: '[name].bundle-on.js',
    chunkFilename: '[name].bundle-on.js',
    path: path.resolve(__dirname, 'dist', 'on')
  },
}, {
  mode: 'production',
  entry: {
    index: './client/index-off.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      title: 'Split flag sets example: no filtering by flag set & production mode',
      template: './client/index.html'
    }),
  ],
  output: {
    filename: '[name].bundle-off.js',
    chunkFilename: '[name].bundle-off.js',
    path: path.resolve(__dirname, 'dist', 'off')
  },
}];
