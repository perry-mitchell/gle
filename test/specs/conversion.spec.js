import { expect } from "chai";
import { convertArguments } from "../../dist/node/conversion.js";

async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

describe("conversion", function() {
    describe("convertArguments", function() {
        it("joins items", function() {
            const output = convertArguments(["a", "b", "c"], " ");
            expect(output).to.equal("a b c");
        });
    });
});
