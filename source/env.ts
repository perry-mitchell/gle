import { getGlobalObject } from "./compat.js";
import { DebugContexts } from "./types.js";

export function getDebugContextPatterns(): DebugContexts {
    const flags = getEnvironmentDebugFlags();
    return flags.reduce((output: DebugContexts, flag: string) => {
        let newFlag = flag.trim(),
            enabled = true;
        if (/^-/.test(newFlag)) {
            newFlag = newFlag.substring(1);
            enabled = false;
        }
        if (output[newFlag] !== false) {
            output[newFlag] = enabled;
        }
        return output;
    }, {});
}

function getEnvironmentDebugFlags(): Array<string> {
    const globalObj = getGlobalObject();
    const debugFlags = new Set<string>();
    if (typeof globalObj.localStorage?.debug === "string") {
        globalObj.localStorage.debug.split(",").forEach((flag: string) => debugFlags.add(flag));
    }
    if (typeof globalObj.process?.env?.DEBUG === "string") {
        globalObj.process.env.DEBUG.split(",").forEach((flag: string) => debugFlags.add(flag));
    }
    return [...debugFlags];
}

export function getEnvironmentType(): "node" | "browser" {
    if (typeof process === "undefined" || (<any> process).type === 'renderer' || (<any> process).browser === true || (<any> process).__nwjs) {
        return "browser";
    }
    return "node";
}
