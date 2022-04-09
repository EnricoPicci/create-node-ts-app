import { setBin } from './templete-customize-functions';

export type Template = {
    folders: string[];
    commands: string[];
    customizeFunctions?: ((appName: string) => void)[];
    customizeFunctionIds?: { package: string; moduelPath: string; functionName: string };
};

export const DefaultTemplateName = 'default';

export const Templates: { [key: string]: Template } = {};

const defaultCommands = [
    // run these commands to make sure we load the newest available version
    'npm i typescript ts-node mocha chai --save-dev',
    'npm i @types/node @types/mocha @types/chai --save-dev',
    'git init',
];

Templates[DefaultTemplateName] = {
    folders: [`default`],
    commands: defaultCommands,
};

Templates['package-exec'] = {
    folders: [`default`, `package-exec`],
    commands: [...defaultCommands],
    customizeFunctions: [setBin],
};
