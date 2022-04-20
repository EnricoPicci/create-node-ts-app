"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const merge_1 = require("./merge");
describe(`mergeJson`, () => {
    it(`should merge a json object into another`, () => {
        const keyA = 'ka';
        const keyB = 'kb';
        const valA = 'a';
        const valB = 'b';
        const jA = { [keyA]: valA };
        const jB = { [keyB]: valB };
        const result = (0, merge_1.mergeJson)(jA, jB);
        (0, chai_1.expect)(result).to.be.an('object');
        (0, chai_1.expect)(result[keyA]).equal(valA);
        (0, chai_1.expect)(result[keyB]).equal(valB);
    });
    it(`should merge a json object into another and the second json should override the first one`, () => {
        const key = 'sameKey';
        const valA = 'a';
        const valB = 'b';
        const jA = { [key]: valA };
        const jB = { [key]: valB };
        const result = (0, merge_1.mergeJson)(jA, jB);
        (0, chai_1.expect)(result).to.be.an('object');
        (0, chai_1.expect)(Object.keys(result).length).equal(1);
        (0, chai_1.expect)(result[key]).equal(valB);
    });
});
//# sourceMappingURL=merge.spec.js.map