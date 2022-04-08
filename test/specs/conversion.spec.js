import { expect } from "chai";
import { convertArguments } from "../../dist/node/conversion.js";

describe("conversion", function() {
    describe("convertArguments", function() {
        it("joins items", function() {
            const output = convertArguments(["a", "b", "c"], " ");
            expect(output).to.equal("a b c");
        });
    });
});
