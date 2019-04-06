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
    entry: `./src/${app}/server.tsx`,
    output: {
        libraryTarget: 'commonjs2',
        filename: 'server.js',
        path: resolve(`server/${app}`)
    },
    plugins: [
        new webpack.DefinePlugin({
            env: JSON.stringify('qa'),
            backend: JSON.stringify('http://localhost:3000'),
            // backend: JSON.stringify('https://api-qa.arvi.in'),
            frontend: JSON.stringify('http://localhost:8081'),
            cdn: JSON.stringify('https://cdn.arvi.in'),
            data: JSON.stringify('http://localhost:8081/data'),
            key_id: JSON.stringify('rzp_test_wJAkpBJ1VvsXSK'),
            appLocation: JSON.stringify(app),
            'process.env.NODE_ENV': JSON.stringify('dev'),
            'process.env.IS_TEST': JSON.stringify('true'),
            'process.env.IS_BROWSER': JSON.stringify('false')
        }),
        new CopyWebpackPlugin([
            { from: `./server-static/${app}/server.txt`, to: `server.txt` },
            // { from: 'data', to: 'data' }
        ], {
                copyUnmodified: true
            })
    ],
    node: { fs: 'empty' }
});