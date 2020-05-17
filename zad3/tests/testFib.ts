import { expect } from "chai";
import { fib } from "../src/script";
import "mocha"

describe("Fibonacci", () => {
    it("should equal 1 for call with 1", () => {
        expect(fib(1)).to.equal(1);
    });
});

describe("Fibonacci", () => {
    it("should equal 21 for call with 8", () => {
        expect(fib(8)).to.equal(21);
    });
});