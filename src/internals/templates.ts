import { setBin } from './template-customize-functions';

export type Template = {
    extend?: string;
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
    commands: defaultCommands,
};

Templates['package'] = {
    extend: DefaultTemplateName,
    folders: [`package-exec`],
    customizeFunctionIds: [
        { module: `${__dirname}/template-customize-functions`, functionName: 'setOutdirInScriptVersion' },
    ],
};

Templates['package-exec'] = {
    extend: `package`,
    folders: [`package-exec`],
    customizeFunctions: [setBin],
};

export function getTemplate(name: string) {
    let template = Templates[name];
    if (template.extend) {
        const superTemplate = getTemplate(template.extend);
        // first merge the templates, with template overriding superTemplate
        template = {
            ...superTemplate,
            ...template,
        };
        // then merge the arrays adding to the template arrays the values from the equvalent array in the superTemplate
        Object.entries(superTemplate).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                const _template = template as any;
                if (!(template as any)[key]) {
                    (template as any)[key] = [];
                }
                (template as any)[key] = Array.from(new Set<any>([..._template[key], ...value]).values());
            }
        });
    }
    return template;
}
