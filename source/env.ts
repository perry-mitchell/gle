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
    if (storageAvailable(globalObj) && typeof globalObj.localStorage?.debug === "string") {
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

/**
 * Check if storage is available
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 */
 function storageAvailable(win: Window): boolean {
    let storage: Storage;
    try {
        storage = win.localStorage;
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            typeof DOMException !== "undefined" &&
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}
