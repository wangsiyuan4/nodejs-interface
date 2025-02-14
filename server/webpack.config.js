/*
 * @Author: wsy
 * @Date: 2023-12-07 11:38:18
 * @LastEditors: wsy
 * @LastEditTime: 2023-12-07 11:38:18
 * @FilePath: ThingUEV5.0.1-EA_GuiYangBian/Project/webpack.config.js
 * @Description:
 */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseUrl = '../dist'
module.exports = {
    mode: 'production',
    target: 'node', // 设置目标为Node.js
    entry: './app.js', // 入口文件路径
    output: {
        path: path.resolve(__dirname, baseUrl), // 输出目录
        filename: 'app-bundle.js', // 输出文件名
        libraryTarget: 'commonjs2',
        clean: true
    },
    optimization: {
        usedExports: true, // 开启 Tree Shaking 功能，用于删除未被使用的代码。
        minimize: false, // 关闭代码压缩
    },
    module: {
        rules: [
            {
                test: /\.js$/, // 使用正则表达式匹配所有的JS文件
                exclude: /node_modules/, // 排除node_modules目录
                use: {
                    loader: 'babel-loader', // 使用Babel进行转译
                    options: {
                        presets: ['@babel/preset-env'] // 使用预设配置
                    }
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'config.env'), to: path.resolve(__dirname, `${ baseUrl }/config.env`) },
            ]
        })
    ]
};
