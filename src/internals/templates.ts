import { setAppNameInReadme, setBin } from './template-customize-functions';

// a Template is an object which contains the following properties:
// folders: an array of strings, each string is the name of a folder in the "template-folders" folder
//          the files in these folders are copied to the app folder
// commands: an array of strings, each string is a command that is executed after creating the app folder from within the app folder
// customizeFunctions: an array of functions, each function is called after creating the app folder from within the app folder
// customizeFunctionIds: an array of Objects, each with a madule and a functionName property - using the module and the functionName
//                      the real function is loaded and then is called after creating the app folder from within the app folder
export type Template = {
    folders?: string[];
    commands?: string[];
    customizeFunctions?: ((appName: string) => void)[];
    customizeFunctionIds?: FunctionId[];
};
type FunctionId = { module: string; functionName: string };

export const DefaultTemplateName = 'default';

const Templates: { [key: string]: Template } = {};

const defaultCommands = [
    // run these commands to make sure we load the newest available version of the various dependencies
    // however we need to have chai at version 4.3.6 because the version 5.0.0 is ESM only and this
    // makes it incompatible with mocha and ts-node
    // https://github.com/mochajs/mocha/issues/5073
    'npm i typescript ts-node mocha chai@^4.3.6 --save-dev',
    'npm i @types/node @types/mocha @types/chai@^4.3.0 --save-dev',
    'git init',
];

Templates[DefaultTemplateName] = {
    folders: ['base', 'sample-code'],
    customizeFunctions: [setAppNameInReadme],
    commands: defaultCommands,
};

Templates['package'] = {
    folders: ['base', `package`],
    customizeFunctions: [setAppNameInReadme],
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
    customizeFunctions: [setAppNameInReadme, setBin],
    commands: defaultCommands,
};

export function getTemplate(name: string) {
    let template = Templates[name];
    return template;
}
