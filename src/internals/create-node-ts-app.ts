import { execSync } from 'child_process';
import { cpSync, existsSync, mkdirSync, realpathSync } from 'fs';
import { writeIntoPackageJson } from './json-manipulation/merge';
import { DefaultTemplateName, Templates } from './templates';

export function createNodeTsApp(appName: string, template = DefaultTemplateName) {
    const templatePath = realpathSync(__dirname + `/../../templates/${template}`);

    if (appName.trim() === '') {
        throw new Error('App name is empty');
    }
    if (!existsSync(templatePath)) {
        throw new Error(`Template ${template} does not exist`);
    }

    // create the app folder
    mkdirSync(appName);
    process.chdir(appName);

    // copy the files from the template folder
    cpSync(`${templatePath}`, `./`, { recursive: true });

    // run the commands
    getCommands(template).forEach((command) => {
        execSync(command, { stdio: 'inherit' });
    });

    // change package.json
    const nameJson = { name: appName.toLowerCase() };
    writeIntoPackageJson(nameJson);
}

function getCommands(template: string) {
    const commands = Templates[template].commands || [];
    return commands;
}
