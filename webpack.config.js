// from https://vuejsdevelopers.com/2017/07/31/vue-component-publish-npm/

const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { VueLoaderPlugin } = require("vue-loader");

var config = {
    mode: 'production',
    output: {
      path: path.resolve(__dirname + '/dist/'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /(node_modules|.storybook|stories|docs)/
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          exclude: /(node_modules|.storybook|stories|docs)/,
          options: {
            compilerOptions: {
              compatConfig: {
                MODE: 2
              }
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader'
          ]
        }
      ]
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap : false,
          uglifyOptions: {
            minimize : true,
            mangle: true,
            compress: {
              warnings: false
            }
          }
        })
      ]
    },
    externals: {
      vue: 'vue'
    },
    resolve: {
      alias: {
        vue: '@vue/compat'
      }
    },
    plugins: [new VueLoaderPlugin()]
}

module.exports = [
    merge(config, {
        entry: path.resolve(__dirname + '/src/plugin.js'),
        output: {
        filename: 'scroll-sync.min.js',
        libraryTarget: 'window',
        library: 'ScrollSync',
        },
        target: 'web'
    }),
    merge(config, {
        entry: path.resolve(__dirname + '/src/ScrollSync.vue'),
        output: {
        filename: 'scroll-sync.js',
        libraryTarget: 'umd',
        library: 'vue-scroll-sync',
        umdNamedDefine: true
        },
        target: 'node'
    })
]
