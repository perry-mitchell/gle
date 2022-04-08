import { expect } from "chai";
import { getDebugContextPatterns, getEnvironmentType } from "../../dist/node/env.js";

describe("env", function() {
    describe("getDebugContextPatterns", function() {
        it("returns an object", function() {
            const patt = getDebugContextPatterns();
            expect(patt).to.be.an("object");
        });
    });

    describe("getEnvironmentType", function() {
        it("returns correct type", function() {
            expect(getEnvironmentType()).to.equal("node");
        });
    });
});
