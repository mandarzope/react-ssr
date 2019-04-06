const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("./helper");

module.exports = {
    resolve: {
        alias: {
            '@': resolve('src')
        },
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                options: {
                    happyPackMode: true,
                    transpileOnly: true
                },
                exclude: [/node_modules/],
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    'sass-loader',
                ]
            }
        ]
    },
    optimization: {
        minimize: false
    },
    plugins: [

    ],
    devtool: '#source-maps',
};