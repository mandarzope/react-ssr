const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require("./helper");
const merge = require('webpack-merge')
const baseWebpackConfig = require('./common.client.config')
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let app = process.env.APP;
if (!app) {
    app = 'homepage'
}
var t = new Date().valueOf();

module.exports = merge(baseWebpackConfig, {
    entry: `./src/${app}/index.tsx`,
    output: {
        path: resolve('dist'),
        filename: 'build.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: `!!handlebars-loader!src/${app}/index.html`,
            templateParameters: {
                GTM_ID: 'GTM-5WHC9VH',
                gtm_auth: 'doKeUbB1PpnJ6HwyUo7qDQ',
                gtm_preview: 'env-2'
            }
        }),
        new webpack.EnvironmentPlugin({
            IS_BROWSER: "true"
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            env: JSON.stringify('qa'),
            backend: JSON.stringify('http://localhost:3000'),
            // backend: JSON.stringify('https://api-qa.arvi.in'),
            frontend: JSON.stringify('http://localhost:8081'),
            cdn: JSON.stringify('https://cdn.arvi.in'),
            data: JSON.stringify('http://localhost:8081/data'),
            key_id: JSON.stringify('rzp_test_wJAkpBJ1VvsXSK'),
            basename: JSON.stringify('/'),
            'process.env.PUBLIC_URL': JSON.stringify('http://localhost:8081'),
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.IS_TEST': JSON.stringify('true'),
            'process.env.IS_BROWSER': JSON.stringify('true'),
        })
    ],
    devServer: {
        // host: '192.168.2.9',
        host: '0.0.0.0',
        port: 8081,
        historyApiFallback: true,
    },
    node: { fs: 'empty' }
});