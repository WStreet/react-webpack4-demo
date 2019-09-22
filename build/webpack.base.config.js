'use strict'

const path = require('path');

const DIST_PATH = path.resolve(__dirname, '../dist');

module.exports = {
  entry: {
    app: './src/index.js',
    framework: ['react', 'react-dom'], // 抽出框架代码
  },
  output: {
    path: DIST_PATH,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader', // 在HTML文件中插入 <style> 标签
          },
          {
            loader: 'css-loader', // 获取引用资源，比如 @import,url()
          },
          {
            loader: 'postcss-loader', //自动加前缀
            options: { // 此处配置信息也可以在根目录下创建postcss.config.js
              plugins: [
                require('autoprefixer')
              ]
            }
          },
          { loader: "less-loader" }
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|svg|eot|woff2|tff)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8129,
              publicPath: '/',
              name: "images/[name].[ext]",
            },
          }
        ],
        //注意limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
        // 大于限制数字时，url-loader内部默认使用file-loader处理
        // 也可以指定fallback为指定的loader去处理
        exclude: /node_modules/
      },
    ]
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all', // 可选值 all async initial
      minChunks: 1,
      minSize: 0,
      automaticNameDelimiter: '-',
      cacheGroups: {
        framework: {
          test: "framework",
          name: "framework",
          enforce: true
        }
      }
    }
  }
}