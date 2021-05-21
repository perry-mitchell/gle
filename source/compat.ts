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

export function styleLogLine(prefix: string, content: string, suffix: string, hexColour: string): Array<string> {
    const globalObject = getGlobalObject();
    if (globalObject.process?.stdout?.isTTY === true) {
        // Use ANSI styling
        const colourOpen = ansiStyles.color.ansi16m(...ansiStyles.hexToRgb(hexColour));
        return [
            `${colourOpen}${prefix}${ansiStyles.color.close}`,
            content,
            `${colourOpen}${suffix}${ansiStyles.color.close}`
        ];
    } else if (globalObject.navigator?.userAgent) {
        return [
            `%c${prefix} %c${content} %c${suffix}`,
            `color:${hexColour}`,
            "",
            `color:${hexColour}`
        ];
    }
    // Use no colour
    return [prefix, content, suffix];
}
