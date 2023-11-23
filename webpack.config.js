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
      title: 'Split RUM Agent example: async loading & production mode',
      template: './client/index.html'
    }),
  ],
  output: {
    filename: '[name].bundle-on.js',
    chunkFilename: '[name].bundle-on.js',
    path: path.resolve(__dirname, 'dist', 'on')
  },
}, {
  mode: 'development',
  entry: {
    index: './client/index-off.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      title: 'Split RUM Agent example: sync loading & development mode',
      template: './client/index.html'
    }),
  ],
  output: {
    filename: '[name].bundle-off.js',
    chunkFilename: '[name].bundle-off.js',
    path: path.resolve(__dirname, 'dist', 'off')
  },
}];
