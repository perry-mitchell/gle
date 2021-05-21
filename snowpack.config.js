import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    buildOptions: {
        clean: true,
        out: path.resolve(__dirname, "./dist")
    },

    plugins: [
        ["@snowpack/plugin-typescript"]
    ],

    root: path.resolve(__dirname, "./source")
};
