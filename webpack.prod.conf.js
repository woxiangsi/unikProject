const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const merge = require('webpack-merge')
const developmentBaseConf = require('./webpack.base.conf')
let entry = {
    a:'./src/common/jsNativeInteraction/mobile_agent_plugin.js',
    app: './src/main.js',
}
if(process.env.NETWORK_ENV=='DEVELOP'){
    entry = {
        a:'./src/common/jsNativeInteraction/mobile_agent_plugin.js',
        app: './src/main.js',
    }
}
if(process.env.NETWORK_ENV=='DEVELOP2'){
    entry = {
        a:'./src/common/jsNativeInteraction/mobile_agent_plugin.js',
        app: './src/main2.js',
    }
}
module.exports = merge(developmentBaseConf,{
    mode:'production',
    devtool: 'cheap-module-source-map',
    entry:entry,
    // optimization: {
    //     splitChunks: {
    //         chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    //     },
    // },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        minimize: true,
        minimizer: [
          new UglifyJsPlugin({
            sourceMap: true,
            parallel: true,
            uglifyOptions: {
              compress: {
                drop_console: true,
                keep_fnames: true
              },
              mangle: {
                keep_fnames: true
              }
            }
          }),
          new OptimizeCSSAssetsPlugin()
        ],
        usedExports: true,
        sideEffects: true,
        splitChunks: {
            chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
        },
    },
    plugins: [
        //清楚dist 文件
        new CleanWebpackPlugin(),
       
    ]
})
