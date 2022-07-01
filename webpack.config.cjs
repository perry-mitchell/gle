const path = require("path");
const { IgnorePlugin } = require("webpack");
const ResolveTypeScriptPlugin = require("resolve-typescript-plugin");

const config = {
    entry: path.resolve(__dirname, "./source/index.ts"),

    experiments: {
        outputModule: true
    },

    externalsType: "module",

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
                resolve: {
                    fullySpecified: false
                }
            }
        ]
    },

    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "./dist/web"),
        library: {
            type: "module"
        },
        environment: {
            module: true
        }
    },

    plugins: [
        new IgnorePlugin({
            resourceRegExp: /ansi-styles/
        })
    ],

    resolve: {
        extensions: [".ts", ".js"],
        fallback: {
            fs: false,
            net: false
        },
        plugins: [
            // Handle .ts => .js resolution
            new ResolveTypeScriptPlugin()
        ]
    },

    target: "web"
};

module.exports = config;
