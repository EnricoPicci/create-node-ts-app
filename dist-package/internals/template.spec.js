"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const templates_1 = require("./templates");
describe(`getTemplate`, () => {
    it(`returns a template`, () => {
        const templateName = 'package-exec';
        const template = (0, templates_1.getTemplate)(templateName);
        (0, chai_1.expect)(template.commands?.length).equal(3);
        (0, chai_1.expect)(template.folders?.length).equal(3);
        (0, chai_1.expect)(template.customizeFunctions?.length).equal(2);
        (0, chai_1.expect)(template.customizeFunctionIds?.length).equal(1);
    });
});
//# sourceMappingURL=template.spec.js.map