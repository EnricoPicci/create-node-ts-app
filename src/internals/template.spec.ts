import { expect } from 'chai';
import { getTemplate } from './templates';

describe(`getTemplate`, () => {
    it(`returns a template`, () => {
        const templateName = 'exec-cmd';
        const template = getTemplate(templateName);
        expect(template.commands?.length).equal(3);
        expect(template.folders?.length).equal(2);
        expect(template.customizeFunctions?.length).equal(2);
        expect(template.customizeFunctionIds?.length).equal(1);
    });
});
