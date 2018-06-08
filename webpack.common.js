const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

const extractBaseCSS = new ExtractTextPlugin("css/[name].css");
const extractCriticalCSS = new ExtractTextPlugin("css/critical.css");

const BUILD_DIR = path.resolve(__dirname, './dist');
const APP_DIR = path.resolve(__dirname, './src');

module.exports = {
  entry: {
    app: APP_DIR + '/js/app.js',
    library: APP_DIR + '/js/library.js'
  },
  output: {
    filename: '[name].js',
    path: BUILD_DIR
  },
  devServer: {
    contentBase: BUILD_DIR
  },
  module: {
    rules: [
        {
          test : /\.jsx$/,
          exclude: /node_modules/,
          loader : 'babel-loader'
        },
        {
          test: /\.js$/,
          loader: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }]
        },
        {
          test: /\.css/i,
          exclude: /\.crit.css/,
          loader: extractBaseCSS.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  sourceMap: false,
                  url: false,
                  config: {
                    path: './postcss.config.js'
                  }
                }
              },
              'postcss-loader'
            ]
            })
          },
          {
            test: /\.crit.css/i,
            loader: extractCriticalCSS.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    sourceMap: true,
                    url: false,
                    config: {
                      path: './postcss.config.js'
                    }
                  }
                },
                'postcss-loader'
              ]
            })
          }]
    },
    plugins : [
      new WebpackNotifierPlugin({
        excludeWarnings: true
      }),
      new FlowBabelWebpackPlugin({
        warn: true
      }),
      new CleanWebpackPlugin(['dist/*.*'], {
        watch: true,
        verbose:  true
      }),
      new HtmlWebpackPlugin({
        title: 'insert title here',
        hash: true,
        filename: BUILD_DIR + '/index.html',
        template: APP_DIR + '/templates/main.ejs',
        inlineSource: '.(crit.css)$',
        excludeChunks: ['library']
      }),
      extractBaseCSS,
      extractCriticalCSS,
      new StyleExtHtmlWebpackPlugin('css/critical.css'), // inline critical css in head
      new CopyWebpackPlugin([
        {
          from: './src/fonts',
          to :  'fonts'
        }
      ]),
      new CopyWebpackPlugin([
        {
          context: './src/css/**/*',
          from: "*.+(.png|.jpg)",
          flatten: true,
          to : 'css'
        }
      ]),
      new CopyWebpackPlugin([
        {
          context: './src/js/components/**/*',
          from: "*.+(.png|.jpg)",
          flatten: true,
          to : 'css'
        }
      ])
  ]
};
