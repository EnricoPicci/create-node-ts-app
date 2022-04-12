import { expect } from 'chai';
import { mergeJson } from './merge';

describe(`mergeJson`, () => {
    it(`should merge a json object into another`, () => {
        const keyA = 'ka';
        const keyB = 'kb';
        const valA = 'a';
        const valB = 'b';
        const jA = { [keyA]: valA };
        const jB = { [keyB]: valB };

        const result = mergeJson(jA, jB);
        expect(result).to.be.an('object');
        expect(result[keyA]).equal(valA);
        expect(result[keyB]).equal(valB);
    });
    it(`should merge a json object into another and the second json should override the first one`, () => {
        const key = 'sameKey';
        const valA = 'a';
        const valB = 'b';
        const jA = { [key]: valA };
        const jB = { [key]: valB };

        const result = mergeJson(jA, jB);
        expect(result).to.be.an('object');
        expect(Object.keys(result).length).equal(1);
        expect(result[key]).equal(valB);
    });
});
