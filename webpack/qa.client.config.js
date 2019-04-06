const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require("./helper");
const merge = require('webpack-merge')
const baseWebpackConfig = require('./common.client.config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

let app = process.env.APP;
if (!app) {
    app = 'homepage'
}
var t = new Date().valueOf();

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    entry: `./src/${app}/index.tsx`,
    output: {
        publicPath: `/`,
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js',
        path: resolve('dist/' + app),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `!!handlebars-loader!src/${app}/index.html`,
            templateParameters: {
                GTM_ID: 'GTM-5WHC9VH',
                gtm_auth: 'doKeUbB1PpnJ6HwyUo7qDQ',
                gtm_preview: 'env-2'
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css"
        }),
        new webpack.DefinePlugin({
            env: JSON.stringify('qa'),
            frontend: JSON.stringify('https://qa.arvi.in'),
            cdn: JSON.stringify('https://cdn.arvi.in'),
            backend: JSON.stringify('https://api-qa.arvi.in'),
            data: JSON.stringify('https://admin-qa.arvi.in/data'),
            key_id: JSON.stringify('rzp_test_wJAkpBJ1VvsXSK'),
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.IS_TEST': JSON.stringify('true'),
            'process.env.IS_BROWSER': JSON.stringify('true'),
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false
                },
                keep_classnames: undefined,
                keep_fnames: false
            }
        }),
        new CopyWebpackPlugin([
            { from: 'src/favicon.ico', to: 'favicon.ico' },
            // { from: 'data', to: 'data' }
        ], {
                copyUnmodified: true
            })
    ]
});