import sinon from "sinon";
import { expect } from "chai";
import { createLog, log, setLogRenderer } from "../../dist/index.js";

describe("log", function() {
    beforeEach(function() {
        this.consoleLog = sinon.spy();
        setLogRenderer(this.consoleLog);
    });

    afterEach(function() {
        setLogRenderer();
    });

    describe("createLog", function() {
        it("outputs a log function", function() {
            const logger = createLog("test:createLog");
            expect(logger).to.be.a("function");
        });
    });
});
