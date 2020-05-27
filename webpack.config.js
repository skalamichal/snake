const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.js'
  },
  devServer: {
    contentBase: './dist' //where contents are served from
  },
  plugins: [
    isProduction ? new MiniCssExtractPlugin() : false,
    new HtmlWebpackPlugin({
      filename: 'index.html', // name of html file to be created
      template: './src/index.html' // source from which html file would be created
    })
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.js$/, //using regex to tell babel exactly what files to transcompile
        exclude: /node_modules/, // files to be ignored
        use: {
          loader: 'babel-loader' // specify the loader
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
          },   // creates style nodes from JS strings
          'css-loader',     // translates CSS into CommonJS
          'less-loader'     // compiles Less to CSS
        ],
      },
      {
        test: /\.wav$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'audio/[name].[ext]',
            }
          }
        ]
      }
    ]
  }
}
