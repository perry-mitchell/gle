export function convertArguments(...args: Array<any>): string {
    return args
        .map((arg: any) => {
            if (Array.isArray(arg)) {
                return `[${convertArguments(arg)}]`;
            }
            if (arg && typeof arg === "object" && typeof arg.toString === "function") {
                return arg.toString();
            }
            if (typeof arg === "function") {
                return arg.toString();
            }
            return `${arg}`;
        })
        .join(" ");
}
