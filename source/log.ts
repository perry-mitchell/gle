import wildcard from "wildcard";
import { getNextColour } from "./colour";
import { getDebugContextPatterns } from "./env";
import { convertArguments } from "./conversion";
import { styleText } from "./compat";
import { DebugContexts, LogColours } from "./types";

let __contextPatterns: DebugContexts = null,
    __contexts: DebugContexts = {};
const __logColours: LogColours = {};

export function createLog(context: string): (...args: Array<any>) => void {
    if (!resolveContext(context)) return () => {};
    const colour = __logColours[context] = (__logColours[context] || getNextColour());
    return function __log(...logArgs: Array<any>): void {
        const text = convertArguments(logArgs);
        const callArgs = [
            ...styleText(text, colour),
            text
        ];
        console.log(...callArgs);
    };
}

export function log(context: string, ...logArgs: Array<any>): void {
    if (!resolveContext(context)) return;
    const colour = __logColours[context] = (__logColours[context] || getNextColour());
    const text = convertArguments(logArgs);
    const callArgs = [
        ...styleText(text, colour),
        text
    ];
    console.log(...callArgs);
}

function resolveContext(context: string): boolean {
    if (!__contextPatterns) {
        __contextPatterns = getDebugContextPatterns();
    }
    if (typeof __contexts[context] === "undefined") {
        for (const pattern in __contextPatterns) {
            if (!wildcard(pattern, context)) continue;
            __contexts[context] = !!__contextPatterns[pattern];
            if (!__contexts[context]) break;
        }
    }
    return __contexts[context];
}
