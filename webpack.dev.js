const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
module.exports = env => merge(common, {
  devtool: 'source-map', // only for development
  output: {
    path: path.resolve(__dirname, `dist-${env.STAGE}`),
    publicPath: `publicPath`,
    filename: '[name].min.js',
    sourceMapFilename: '[name].js.map', // only for development
  },
  plugins: [
    new Dotenv({
      path: `./.env.${env.STAGE}`, // load this now instead of the ones in '.env'
      // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      // systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      // silent: true, // hide any errors
      // defaults: false // load '.env.defaults' as the default values if empty.
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src')+'/index.ejs',
      filename: path.resolve(__dirname, `dist-${env.STAGE}`)+'/index.html',
      environment: {
        product: env.PRODUCT,
        stage: env.STAGE
      }
    }),
    new webpack.SourceMapDevToolPlugin({}) // only for development
  ],
});