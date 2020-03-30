const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
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
    mode:'development',
    entry: entry,
    devtool: 'eval-source-map',
    plugins: [
        //定义全局变量
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        //热替换
        new webpack.HotModuleReplacementPlugin(),
        //编译过程出错时会直接跳过，保证了输出资源不会包含错误
        new webpack.NoEmitOnErrorsPlugin(),
        // webpack启动后自动打开游览器
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        })
    ],
    devServer: {
        port: 8080,
        host: '0.0.0.0',
        historyApiFallback: true, //不跳转
        disableHostCheck: true,
        inline: true, //实时刷新
        hot: true  // 启用 webpack 的模块热替换特性
    }
});
