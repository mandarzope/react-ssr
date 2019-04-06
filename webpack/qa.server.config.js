const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require("./helper");
const merge = require('webpack-merge')
const baseWebpackConfig = require('./common.server.config')
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

let app = process.env.APP;
if (!app) {
    app = 'homepage'
}
var t = new Date().valueOf();
module.exports = merge(baseWebpackConfig, {
    target: 'node',
    entry: `./src/${app}/lambda.tsx`,
    output: {
        libraryTarget: 'commonjs2',
        filename: 'server.js',
        path: resolve(`lambda-server/${app}`)
    },
    plugins: [
        new webpack.DefinePlugin({
            env: JSON.stringify('qa'),
            backend: JSON.stringify('https://api-qa.arvi.in'),
            frontend: JSON.stringify('http://qa.arvi.in'),
            cdn: JSON.stringify('https://cdn.arvi.in'),
            data: JSON.stringify('http://qa.arvi.in/data'),
            key_id: JSON.stringify('rzp_test_wJAkpBJ1VvsXSK'),
            appLocation: JSON.stringify(app),
            'process.env.NODE_ENV': JSON.stringify('dev'),
            'process.env.IS_TEST': JSON.stringify('true'),
            'process.env.IS_BROWSER': JSON.stringify('false')
        }),
        new CopyWebpackPlugin([
            { from: `./server-static/${app}/server.txt`, to: `server.txt` },
        ], {
                copyUnmodified: true
            })
    ],
    node: { fs: 'empty' }
});