import sinon from "sinon";
import { expect } from "chai";
import stripAnsi from "strip-ansi";
import { createLog, log, setLogRenderer, toggleContext } from "../../dist/index.js";

async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

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

        describe("created log function", function() {
            beforeEach(function() {
                this.context = `test:createLog:${Math.floor(Math.random() * 999999)}`;
                toggleContext(this.context, true);
                this.log = createLog(this.context);
            });

            it("logs expected information", function() {
                this.log("this is a test", [1, 2, 3]);
                const logArgs = this.consoleLog.firstCall.args;
                const plain = stripAnsi(logArgs.join(" "));
                expect(plain).to.equal(`${this.context} this is a test [1, 2, 3] +0ms`);
            });

            it("logs time differences", async function() {
                this.log("line 1");
                await sleep(50);
                this.log("line 2");
                const logArgs = this.consoleLog.secondCall.args;
                const plain = stripAnsi(logArgs.join(" "));
                expect(plain).to.match(/line 2 \+\d{2,3}ms$/);
            });
        });
    });

    describe("log", function() {
        beforeEach(function() {
            this.context = `test:createLog:${Math.floor(Math.random() * 999999)}`;
            toggleContext(this.context, true);
        });

        it("logs expected information", function() {
            log(this.context, "this is a test", [1, 2, 3]);
            const logArgs = this.consoleLog.firstCall.args;
            const plain = stripAnsi(logArgs.join(" "));
            expect(plain).to.equal(`${this.context} this is a test [1, 2, 3] +0ms`);
        });
    });
});
