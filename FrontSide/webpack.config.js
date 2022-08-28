/// <binding />
"use strict";
var path = require("path");
var WebpackNotifierPlugin = require("webpack-notifier");
module.exports = {
    entry: ['babel-polyfill', "./React/src/index.js"],
    output: {
        path: path.resolve(__dirname, "./React/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    devtool: "inline-source-map",
    plugins: [new WebpackNotifierPlugin()],
    resolve: {
        extensions: ['.js', '.jsx'],
    }
};