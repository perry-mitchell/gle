import wildcard from "wildcard";
import prettyMS from "pretty-ms";
import { getNextColour } from "./colour";
import { getDebugContextPatterns } from "./env";
import { convertArguments } from "./conversion";
import { styleText } from "./compat";
import { getLogRenderer } from "./render";
import { DebugContexts, LogColours, LogTimes } from "./types";

let __contextPatterns: DebugContexts = null,
    __contexts: DebugContexts = {};
const __logColours: LogColours = {};
const __logTimes: LogTimes = {};

export function createLog(context: string): (...args: Array<any>) => void {
    if (!resolveContext(context)) return () => {};
    const colour = __logColours[context] = (__logColours[context] || getNextColour());
    return function __log(...logArgs: Array<any>): void {
        renderLog(context, logArgs, colour);
    };
}

export function log(context: string, ...logArgs: Array<any>): void {
    if (!resolveContext(context)) return;
    const colour = __logColours[context] = (__logColours[context] || getNextColour());
    renderLog(context, logArgs, colour);
}

function renderLog(context: string, logArgs: Array<any>, colour: string): void {
    const lastContextTime: number = __logTimes[context] ? __logTimes[context] : Date.now();
    __logTimes[context] = Date.now();
    const text = convertArguments(logArgs);
    const callArgs = [
        ...styleText(context, colour),
        text,
        ...styleText(`+${prettyMS(lastContextTime, { compact: true })}`, colour)
    ];
    const renderLog = getLogRenderer();
    renderLog(...callArgs);
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
