export type Template = { folders: string[]; commands: string[]; customizeFunction?: () => void };

export const DefaultTemplateName = 'default';

export const Templates: { [key: string]: Template } = {};

Templates[DefaultTemplateName] = {
    folders: [`default`],
    commands: [
        'npm i typescript ts-node mocha chai --save-dev',
        'npm i @types/node @types/mocha @types/chai --save-dev',
        'git init',
    ],
};
