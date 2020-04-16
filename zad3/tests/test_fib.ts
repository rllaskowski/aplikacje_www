import { fib } from "../scripts/script"
import { expect } from "chai";
import "mocha";


describe("Fibonacci", () => {
    it("should equal 0 for call with 0", () => {
        expect(fib(0)).to.equal(42);
    });
});