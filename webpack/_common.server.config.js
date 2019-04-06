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
                test: /\.(css|less|scss)$/,
                loader: 'ignore-loader'
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: /node_modules/

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