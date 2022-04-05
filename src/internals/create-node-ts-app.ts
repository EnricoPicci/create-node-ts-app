import { execSync } from 'child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from 'fs';

export const DefaultTemplate = 'default';

export function createNodeTsApp(folder: string, template = DefaultTemplate) {
    const templatePath = realpathSync(__dirname + `/../../templates/${template}`);

    if (folder.trim() === '') {
        throw new Error('Folder name is empty');
    }
    if (!existsSync(templatePath)) {
        throw new Error(`Template ${template} does not exist`);
    }

    // create the app folder
    mkdirSync(folder);
    process.chdir(folder);

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
    packageJson.name = folder.toLowerCase();
    const newPackageJsonString = JSON.stringify(packageJson, null, 2);
    writeFileSync(packageJsonPath, newPackageJsonString);
}

function getCommands(template: string) {
    const commands = [];
    switch (template) {
        case 'default':
            commands.push('npm i typescript ts-node mocha chai --save-dev');
            commands.push('npm i @types/node @types/mocha @types/chai --save-dev');
            commands.push('git init');
            break;
        default:
            throw new Error(`Unknown template: ${template}`);
    }
    return commands;
}

export function getPackageJson(pacakgeJson: string) {
    const packageJsonString = readFileSync(pacakgeJson).toString();
    return JSON.parse(packageJsonString);
}
