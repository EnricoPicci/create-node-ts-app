import { expect } from 'chai';
import { getTemplate } from './templates';

describe(`getTemplate`, () => {
    it(`returns a template that extends another template`, () => {
        const templateName = 'package-exec';
        const template = getTemplate(templateName);
        expect(template.commands?.length).equal(3);
    });
});
