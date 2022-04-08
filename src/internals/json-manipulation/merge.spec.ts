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

// describe(`mergeJsonFiles`, () => {
//     it(`should merge 2 json files`, () => {
//         const j1 = `${process.cwd()}/package.json`;
//         const j2 = `${process.cwd()}/package-lock.json`;

//         const result = mergeJsonFiles(j1, j2);
//         expect(result).to.be.an('object');
//     });
// });
