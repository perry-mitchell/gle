import { getGlobalObject } from "./compat";
import { DebugContexts } from "./types";

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
