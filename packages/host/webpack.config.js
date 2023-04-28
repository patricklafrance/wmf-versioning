// ts-check

import HtmlWebpackPlugin from "html-webpack-plugin";
import ModuleFederationPlugin from "webpack/lib/container/ModuleFederationPlugin.js";

/** @type {import("webpack").Configuration} */
export default {
    mode: "development",
    target: "web",
    devtool: "inline-source-map",
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    entry: "./src/index.js",
    output: {
        // The trailing / is very important, otherwise paths will ne be resolved correctly.
        publicPath: "http://localhost:8080/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "swc-loader"
                }
            },
            {
                // https://stackoverflow.com/questions/69427025/programmatic-webpack-jest-esm-cant-resolve-module-without-js-file-exten
                test: /\.js/,
                resolve: {
                    fullySpecified: false
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "host",
            remotes: {
                remote1: "remote1@http://localhost:8081/remoteEntry.js",
                remote2: "remote2@http://localhost:8082/remoteEntry.js"
            },
            shared: {
                "react": {
                  singleton: true,
                  strictVersion: true
                },
                "react-dom": {
                  singleton: true,
                  strictVersion: true
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
};
