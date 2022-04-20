"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplate = exports.DefaultTemplateName = void 0;
const template_customize_functions_1 = require("./template-customize-functions");
// exported for testing purposes only
exports.DefaultTemplateName = 'default';
const Templates = {};
const defaultCommands = [
    // run these commands to make sure we load the newest available version
    'npm i typescript ts-node mocha chai --save-dev',
    'npm i @types/node @types/mocha @types/chai --save-dev',
    'git init',
];
Templates[exports.DefaultTemplateName] = {
    folders: [`default`],
    customizeFunctions: [template_customize_functions_1.setAppNameInReadme],
    commands: defaultCommands,
};
Templates['package'] = {
    folders: [`default`, `package`],
    customizeFunctions: [template_customize_functions_1.setAppNameInReadme],
    customizeFunctionIds: [
        { module: `${__dirname}/template-customize-functions`, functionName: 'setOutdirInScriptVersion' },
    ],
    commands: defaultCommands,
};
Templates['package-exec'] = {
    folders: [`default`, `package`, `package-exec`],
    customizeFunctionIds: [
        { module: `${__dirname}/template-customize-functions`, functionName: 'setOutdirInScriptVersion' },
    ],
    customizeFunctions: [template_customize_functions_1.setAppNameInReadme, template_customize_functions_1.setBin],
    commands: defaultCommands,
};
function getTemplate(name) {
    let template = Templates[name];
    return template;
}
exports.getTemplate = getTemplate;
//# sourceMappingURL=templates.js.map