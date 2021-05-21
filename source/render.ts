export type LogRenderer = (...args: Array<string>) => void;

function __renderConsole(...args: Array<string>) {
    console.log(...args);
}

let __renderer = __renderConsole;

export function getLogRenderer(): LogRenderer {
    return __renderer;
}

export function setLogRenderer(renderer: LogRenderer): void {
    __renderer = renderer;
}
