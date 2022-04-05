"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageJson = exports.createNodeTsApp = exports.DefaultTemplate = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
exports.DefaultTemplate = 'default';
function createNodeTsApp(folder, template = exports.DefaultTemplate) {
    const templatePath = (0, fs_1.realpathSync)(__dirname + `/../../templates/${template}`);
    if (folder.trim() === '') {
        throw new Error('Folder name is empty');
    }
    if (!(0, fs_1.existsSync)(templatePath)) {
        throw new Error(`Template ${template} does not exist`);
    }
    // create the app folder
    (0, fs_1.mkdirSync)(folder);
    process.chdir(folder);
    // copy the files from the template folder
    (0, fs_1.cpSync)(`${templatePath}`, `./`, { recursive: true });
    // create the src folder
    (0, fs_1.mkdirSync)(`src`);
    // run the commands
    getCommands(template).forEach((command) => {
        (0, child_process_1.execSync)(command, { stdio: 'inherit' });
    });
    // change package.json
    const packageJsonPath = `package.json`;
    const packageJson = getPackageJson(packageJsonPath);
    packageJson.name = folder.toLowerCase();
    const newPackageJsonString = JSON.stringify(packageJson, null, 2);
    (0, fs_1.writeFileSync)(packageJsonPath, newPackageJsonString);
}
exports.createNodeTsApp = createNodeTsApp;
function getCommands(template) {
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
function getPackageJson(pacakgeJson) {
    const packageJsonString = (0, fs_1.readFileSync)(pacakgeJson).toString();
    return JSON.parse(packageJsonString);
}
exports.getPackageJson = getPackageJson;
//# sourceMappingURL=create-node-ts-app.js.map