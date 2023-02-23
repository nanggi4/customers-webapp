const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
module.exports = {
  entry: {
    'index': './src/index.tsx',
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    'axios': 'axios',
    'clsx': 'clsx',
    'aws-amplify': 'aws_amplify',
    'html-react-parser': 'HTMLReactParser',
    'chart.js': 'Chart',
    'chart.js/auto': 'Chart'
  },
  cache: true,
  optimization: {
     minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ],
    splitChunks: {
      // chunks: 'all',
      // chunkFilename: '[name].bundle.js',
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        // vendor: {
        //   // chunks: 'initial',
        //   chunks: 'all',
        //   name: 'vendor',
        //   enforce: true,
        // },
        // reactVendor: {
        //   test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        //   name: "reactvendor"
        // },
        datamplanVendor: {
          test: /[\\/]node_modules[\\/](@datamplan)[\\/]/,
          name: "datamplanVendor"
        },
        mobxVendor: {
          test: /[\\/]node_modules[\\/](mobx)(mobx-react)(mobx-react-lite)[\\/]/,
          name: "mobxVendor"
        },
        materialuiVendor: {
          test: /[\\/]node_modules[\\/](@material-ui)[\\/]/,
          name: "materialuiVendor"
        },
        vendor: {
          test: /[\\/]node_modules[\\/](!@material-ui)(!mobx)(!mobx-react)(!mobx-react-lite)[\\/]/,
          name: "vendor"
        },
      },
    },
    removeAvailableModules: false, // for - speed up
    removeEmptyChunks: false, // for - speed up
    // splitChunks: false // for - speed up
  },
  node: {
    child_process: "empty",
    fs: "empty", // if unable to resolve "fs"
    http2: false,
  },
  resolve: {
    extensions: ['*', '.mjs', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'components': path.resolve(__dirname, '.', 'src', 'components'),
      // 'containers': path.resolve(__dirname, '..', 'src', 'containers'),
      // 'assets': path.resolve(__dirname, '..', 'src', 'assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        exclude: /node_modules/,
        options: {
          loader: 'tsx', // Or 'ts' if you don't need tsx
          target: 'es2015'
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env.common', // load this now instead of the ones in '.env'
      // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      // systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      // silent: true, // hide any errors
      // defaults: false // load '.env.defaults' as the default values if empty.
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })    
  ],
};
