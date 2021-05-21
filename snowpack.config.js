import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    buildOptions: {
        clean: true,
        out: path.resolve(__dirname, "./dist")
    },

    optimize: {
        minify: false,
        target: "es2017"
    },

    plugins: [
        ["@snowpack/plugin-typescript"]
    ],

    root: path.resolve(__dirname, "./source")
};
