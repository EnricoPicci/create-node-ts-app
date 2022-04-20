import { setAppNameInReadme, setBin } from './template-customize-functions';

export type Template = {
    folders?: string[];
    commands?: string[];
    customizeFunctions?: ((appName: string) => void)[];
    customizeFunctionIds?: { module: string; functionName: string }[];
};

// exported for testing purposes only
export const DefaultTemplateName = 'default';

const Templates: { [key: string]: Template } = {};

const defaultCommands = [
    // run these commands to make sure we load the newest available version
    'npm i typescript ts-node mocha chai --save-dev',
    'npm i @types/node @types/mocha @types/chai --save-dev',
    'git init',
];

Templates[DefaultTemplateName] = {
    folders: [`default`],
    customizeFunctions: [setAppNameInReadme],
    commands: defaultCommands,
};

Templates['package'] = {
    folders: [`default`, `package`],
    customizeFunctions: [setAppNameInReadme],
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
    customizeFunctions: [setAppNameInReadme, setBin],
    commands: defaultCommands,
};

export function getTemplate(name: string) {
    let template = Templates[name];
    return template;
}
