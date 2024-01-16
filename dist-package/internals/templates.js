"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplate = exports.DefaultTemplateName = void 0;
const template_customize_functions_1 = require("./template-customize-functions");
exports.DefaultTemplateName = 'default';
const Templates = {};
const defaultCommands = [
    // run these commands to make sure we load the newest available version of the various dependencies
    'npm i typescript ts-node mocha chai@^4.3.6 --save-dev',
    'npm i @types/node @types/mocha @types/chai@^4.3.0 --save-dev',
    'git init',
];
Templates[exports.DefaultTemplateName] = {
    folders: ['base', 'sample-code'],
    customizeFunctions: [template_customize_functions_1.setAppNameInReadme],
    commands: defaultCommands,
};
Templates['package'] = {
    folders: ['base', `package`],
    customizeFunctions: [template_customize_functions_1.setAppNameInReadme],
    customizeFunctionIds: [
        { module: `${__dirname}/template-customize-functions`, functionName: 'setOutdirInScriptVersion' },
    ],
    commands: defaultCommands,
};
Templates['exec-cmd'] = {
    folders: ['base', `exec-cmd`],
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