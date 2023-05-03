// ts-check

import ModuleFederationPlugin from "webpack/lib/container/ModuleFederationPlugin.js";
import path from "path";

/** @type {import("webpack").Configuration} */
export default {
    mode: "production",
    target: "web",
    entry: "./src/index.js",
    output: {
        path: path.resolve("dist"),
        // The trailing / is very important, otherwise paths will ne be resolved correctly.
        publicPath: "http://localhost:8081/",
        clean: true
    },
    optimization: {
        minimize: false
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
                    singleton: true
                },
                "react-dom": {
                    singleton: true
                },
                "useless-lib": {
                    singleton: true
                }
            }
        })
    ]
};