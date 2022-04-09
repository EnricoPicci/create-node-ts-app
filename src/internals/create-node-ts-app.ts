import { execSync } from 'child_process';
import { cpSync, existsSync, mkdirSync, realpathSync } from 'fs';
import { writeIntoPackageJson } from './json-manipulation/package-json';
import { DefaultTemplateName, Templates } from './templates';

export function createNodeTsApp(appName: string, template = DefaultTemplateName) {
    if (appName.trim() === '') {
        throw new Error('App name is empty');
    }

    const folderPaths = Templates[template].folders.map((folder) => {
        const folderPath = realpathSync(`${__dirname}/../../templates/${folder}`);
        if (!existsSync(folderPath)) {
            throw new Error(`Folder ${folder} does not exist`);
        }
        return folderPath;
    });

    // create the app folder
    mkdirSync(appName);
    process.chdir(appName);

    // copy the files from the template folders
    // if the same file is defined in multiple folders, the last one wins
    folderPaths.forEach((folderPath) => {
        cpSync(`${folderPath}`, `./`, { recursive: true });
    });

    // run the commands
    getCommands(template).forEach((command) => {
        execSync(command, { stdio: 'inherit' });
    });

    // change package.json
    const nameJson = { name: appName.toLowerCase() };
    writeIntoPackageJson(nameJson);

    // execute the functions if defined in the template
    getFunctions(template).forEach((func) => {
        func(appName);
    });
}

function getCommands(template: string) {
    const commands = Templates[template].commands || [];
    return commands;
}

function getFunctions(template: string) {
    const functions = Templates[template].customizeFunctions || [];
    return functions;
}
