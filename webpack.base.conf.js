const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer');  //自动添加css前缀插件
const pxtorem = require('postcss-pxtorem'); //rem转化
// var HappyPack = require('happypack');
// const os = require('os');
// var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const postcssOpts = {
    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
    plugins: () => [
        autoprefixer({
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8"
            ],
            grid: true   
        }),
        pxtorem({ rootValue: 100, propWhiteList: [] })
    ],
};
module.exports = {
    
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].js',
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), path.join(__dirname, 'src')],
        extensions: ['.web.js', '.jsx', '.js', '.json','css','scss']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader?cacheDirectory=true',
                exclude: /node_modules/,
            },
            // {
            //     test: /\.(js|jsx)$/,
            //     exclude: /node_modules/,
            //     loader: 'happypack/loader?id=happybabel'
            // },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    // MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader', options: postcssOpts }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    // MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader', options: postcssOpts },
                    'sass-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    // MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader', options: postcssOpts },
                    'less-loader'
                ]
            },
            {

                test: /\.(svg)$/i,
                loader: 'svg-sprite-loader',
                include: [
                    require.resolve('antd-mobile').replace(/warn\.js$/, '')
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/',   //在output基础上，修改输出图片文件的位置
                        publicPath: '../images/',  //修改背景图引入url的路径
                        limit: 10000
                    }
                },
                exclude: [
                    require.resolve('antd-mobile').replace(/warn\.js$/, '')
                ],
            }
        ]
    },
    
    plugins: [
        //定义全局变量
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        // new MiniCssExtractPlugin({
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        // }),
        //生成html
        new HtmlWebpackPlugin({
            chunks: ['a','app'],
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        // new HappyPack({
        //     id: 'happybabel',
        //     loaders: ['babel-loader'],
        //     threadPool: happyThreadPool,
        //     cache: true,
        //     verbose: true
        // })
    ],
}