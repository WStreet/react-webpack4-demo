'use strict'

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
// HtmlWebpackPlugin https://segmentfault.com/a/1190000013883242
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true, //把生成的 index.html 文件的内容的没用空格去掉，减少空间
        removeAttributeQuotes: true
      },
    }),
    new CleanWebpackPlugin()
  ]
});