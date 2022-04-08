import wildcard from "wildcard";
import prettyMS from "pretty-ms";
import { getNextColour } from "./colour.js";
import { getDebugContextPatterns } from "./env.js";
import { convertArguments } from "./conversion.js";
import { styleLogLine } from "./compat.js";
import { getLogRenderer } from "./render.js";
import { DebugContexts, LogColours, LogTimes } from "./types.js";

let __contextPatterns: DebugContexts = null,
    __contexts: DebugContexts = {};
const __logColours: LogColours = {};
const __logTimes: LogTimes = {};

export function createLog(context: string): (...args: Array<any>) => void {
    if (!resolveContext(context)) return (...logArgs: Array<any>) => {};
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
    const now = __logTimes[context] = Date.now();
    const timeSinceLast: number = Math.max(0, now - lastContextTime);
    const text = convertArguments(logArgs, " ");
    const callArgs = styleLogLine(
        context,
        text,
        `+${prettyMS(timeSinceLast, { compact: true })}`,
        colour
    );
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

export function toggleContext(context: string, enabled: boolean): void {
    __contexts[context] = enabled;
}
