import { execSync } from 'child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from 'fs';

export const DefaultTemplate = 'default';
export const Templates: { [key: string]: { commands: string[] } } = {};
Templates[DefaultTemplate] = {
    commands: [
        'npm i typescript ts-node mocha chai --save-dev',
        'npm i @types/node @types/mocha @types/chai --save-dev',
        'git init',
    ],
};

export function createNodeTsApp(appName: string, template = DefaultTemplate) {
    const templatePath = realpathSync(__dirname + `/../../templates/${template}`);

    if (appName.trim() === '') {
        throw new Error('Folder name is empty');
    }
    if (!existsSync(templatePath)) {
        throw new Error(`Template ${template} does not exist`);
    }

    // create the app folder
    mkdirSync(appName);
    process.chdir(appName);

    // copy the files from the template folder
    cpSync(`${templatePath}`, `./`, { recursive: true });

    // create the src folder
    mkdirSync(`src`);

    // run the commands
    getCommands(template).forEach((command) => {
        execSync(command, { stdio: 'inherit' });
    });

    // change package.json
    const packageJsonPath = `package.json`;
    const packageJson = getPackageJson(packageJsonPath);
    packageJson.name = appName.toLowerCase();
    const newPackageJsonString = JSON.stringify(packageJson, null, 2);
    writeFileSync(packageJsonPath, newPackageJsonString);
}

function getCommands(template: string) {
    const commands = Templates[template].commands || [];
    return commands;
}

export function getPackageJson(pacakgeJson: string) {
    const packageJsonString = readFileSync(pacakgeJson).toString();
    return JSON.parse(packageJsonString);
}
