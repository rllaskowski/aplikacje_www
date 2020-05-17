"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const script_1 = require("../src/script");
require("mocha");
describe("Fibonacci", () => {
    it("should equal 1 for call with 1", () => {
        chai_1.expect(() => script_1.fib(1)).to.equal(1);
    });
});
describe("Fibonacci", () => {
    it("should equal 21 for call with 8", () => {
        chai_1.expect(() => script_1.fib(8)).to.equal(21);
    });
});
