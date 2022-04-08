const BROWSER_COLOURS = [
    "#a0937d",
    "#a7c5eb",
    "#bdd2b6",
    "#cc7351",
    "#d35d6e",
    "#e08f62",
    "#fbc6a4",
    "#f4a9a8",
    "#ce97b0",
    "#5aa469",
    "#70af85",
    "#8b5e83",
    "#8f4068",
    "#9dad7f",
    "#94d0cc",
    "#949cdf"
];

let __sessionColours: Array<string> = null;

export function getNextColour(): string {
    if (!__sessionColours) {
        __sessionColours = [...BROWSER_COLOURS];
        shuffleArray(__sessionColours);
    }
    const colour = __sessionColours.shift();
    __sessionColours.push(colour);
    return colour;
}

function shuffleArray<T>(array: Array<T>): void {
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
