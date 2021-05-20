import ansiStyles from "ansi-styles";

export function getGlobalObject(): any {
    if (typeof window !== "undefined") {
        return window;
    } else if (typeof global !== "undefined") {
        return global;
    } else if (typeof self !== "undefined"){
        return self;
    }
    throw new Error("Unable to determine global context");
}

export function styleText(text: string, hexColour: string): Array<string> {
    const globalObject = getGlobalObject();
    if (globalObject.process?.stdout?.isTTY === true) {
        // Use ANSI styling
        return [
            `${ansiStyles.color.ansi16m(...ansiStyles.hexToRgb(hexColour))}${text}${ansiStyles.color.close}`
        ];
    } else if (globalObject.navigator?.userAgent) {
        // Use console colours
        return [`%c${text}`, `color:${hexColour}`];
    }
    // Use no colour
    return [text];
}
