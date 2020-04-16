"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const script_1 = require("../scripts/script");
const chai_1 = require("chai");
require("mocha");
describe("Fibonacci", () => {
    it("should equal 0 for call with 0", () => {
        chai_1.expect(script_1.fib(0)).to.equal(42);
    });
});
//# sourceMappingURL=test_fib.js.map