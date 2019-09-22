'use strict'

const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const HappyPack = require('happypack');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: '[name].[hash:16].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',  // 可取值 'body'  'head'  true, false,其中'body'和true效果一样
      minify: {
        html5: true
      },
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HappyPack({
      loaders: ['babel-loader?presets[]=es2015']
    })
  ],
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, '../public'),
    compress: true, // 开启gzip压缩
    historyApiFallback: true, //  history模式时404将显示/index.html的内容
    hot: true,
    noInfo: true,  // 隐藏打包信息
    open: true,
    proxy: {}
  }
})