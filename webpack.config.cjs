const path = require("path");
const ResolveTypeScriptPlugin = require("resolve-typescript-plugin");

const config = {
    entry: path.resolve(__dirname, "./source/index.ts"),

    externals: [
        "ansi-styles"
    ],

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
        libraryTarget: "commonjs2"
    },

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
