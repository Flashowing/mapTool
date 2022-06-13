const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')
const cesiumSource = 'node_modules/cesium/Build/Cesium'

const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = {
  publicPath: './',
  assetsDir: './static',
  productionSourceMap: false,
  lintOnSave: false, // 是否开启eslint
  devServer: {
    open: true,
    // host: 'test.local.com',
    // port: 443,
    // disableHostCheck: true,
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, './https/test.local.com-key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, './https/test.local.com.pem'))
    // }
  },
  configureWebpack: (config) => {
    let plugins = []
    if (process.env.NODE_ENV === 'production') {
      plugins = [
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify('static')
        }),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Workers'), to: 'static/Workers' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'static/Assets' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty'), to: 'static/ThirdParty' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'static/Widgets' }]),
        ComponentsPlugin({
          resolvers: [VantResolver()],
        }),
      ]
    } else {
      plugins = [
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify('')
        }),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Workers'), to: 'Workers' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty'), to: 'ThirdParty' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
        ComponentsPlugin({
          resolvers: [VantResolver()],
        }),
      ]
    }
    return {
      module: {
        unknownContextCritical: false,
        rules: [
          {
            test: /\.js$/,
            enforce: 'pre',
            include: path.resolve(__dirname, 'node_modules/cesium/Source'),
            sideEffects: false,
            use: [
              {
                loader: 'strip-pragma-loader',
                options: {
                  pragmas: {
                    debug: false
                  }
                }
              }
            ]
          }
        ]
      },
      optimization: {
        usedExports: true,
        splitChunks: {
          maxInitialRequests: Infinity,
          minSize: 0,
          maxSize: 250000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              chunks: 'all',
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                return `npm.${packageName.replace('@', '')}`
              }
            },
            commons: {
              name: 'Cesium',
              test: /[\\/]node_modules[\\/]cesium/,
              priority: 10,
              chunks: 'all'
            }
          }
        }
      },
      output: {
        sourcePrefix: ' '
      },
      amd: {
        toUrlUndefined: true
      },
      resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm.js',
          '@': path.resolve('src')
        }
      },
      node: {
        fs: 'empty',
        Buffer: false,
        http: 'empty',
        https: 'empty',
        zlib: 'empty'
      },
      plugins: plugins
    }
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'gykjcq.com', // 开发者标示
        win: {
          icon: 'my.ico' // windows系统中icon需要256*256的ico格式图片，更换应用图标亦在此处
        },
        nsis: {
          // nsis配置参数
          oneClick: false, // 可单击打开
          allowToChangeInstallationDirectory: true, // 允许用户选择安装位置
          perMachine: true
        }
      }
    }
  }
}
