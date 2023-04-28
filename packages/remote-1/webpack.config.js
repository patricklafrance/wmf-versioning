// ts-check

import ModuleFederationPlugin from "webpack/lib/container/ModuleFederationPlugin.js";

/** @type {import("webpack").Configuration} */

export default {
    mode: "development",
    target: "web",
    devtool: "inline-source-map",
    entry: "./src/index.js",
    output: {
        publicPath: "http://localhost:8081/",
    },
    devServer: {
        port: 8081,
        historyApiFallback: true,
        // Otherwise hot reload in the host failed with a CORS error
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
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
            name: "remote1",
            filename: "remoteEntry.js",
            exposes: {
              "./HelloWorld.jsx": "./src/HelloWorld.jsx"
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
        })
    ]
};