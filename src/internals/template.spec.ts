import { expect } from 'chai';
import { getTemplate } from './templates';

describe(`getTemplate`, () => {
    it(`returns a template`, () => {
        const templateName = 'package-exec';
        const template = getTemplate(templateName);
        expect(template.commands?.length).equal(3);
        expect(template.folders?.length).equal(3);
        expect(template.customizeFunctions?.length).equal(1);
        expect(template.customizeFunctionIds?.length).equal(1);
    });
});
