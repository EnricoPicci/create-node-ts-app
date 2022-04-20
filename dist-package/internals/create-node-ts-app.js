"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNodeTsApp = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const package_json_1 = require("./json-manipulation/package-json");
const templates_1 = require("./templates");
function createNodeTsApp(appName, templateName = templates_1.DefaultTemplateName) {
    if (appName.trim() === '') {
        throw new Error('App name is empty');
    }
    const template = (0, templates_1.getTemplate)(templateName);
    // get the folder paths before changing the working directory
    const folderPaths = getFolderPaths(template);
    // create the app folder
    (0, fs_1.mkdirSync)(appName);
    process.chdir(appName);
    // copy the files from the template folders
    // if the same file is defined in multiple folders, the last one wins
    folderPaths.forEach((folderPath) => {
        const _normalizedFolderPath = (0, path_1.normalize)(folderPath);
        (0, fs_1.cpSync)(`${_normalizedFolderPath}`, `.${path_1.sep}`, { recursive: true });
    });
    // run the commands
    getCommands(template).forEach((command) => {
        (0, child_process_1.execSync)(command, { stdio: 'inherit' });
    });
    // change package.json
    const nameJson = { name: appName.toLowerCase() };
    (0, package_json_1.writeIntoPackageJson)(nameJson);
    // execute the functions if defined in the template
    getFunctions(template).forEach((func) => {
        func(appName);
    });
    getFunctionIds(template).forEach(({ module, functionName }) => {
        require(module)[functionName](appName);
    });
}
exports.createNodeTsApp = createNodeTsApp;
function getFolderPaths(template) {
    return (template.folders?.map((folder) => {
        const folderPath = (0, fs_1.realpathSync)(`${__dirname}/../../template-folders/${folder}`);
        if (!(0, fs_1.existsSync)(folderPath)) {
            throw new Error(`Folder ${folder} does not exist`);
        }
        return folderPath;
    }) || []);
}
function getCommands(template) {
    const commands = template.commands || [];
    return commands;
}
function getFunctions(template) {
    const functions = template.customizeFunctions || [];
    return functions;
}
function getFunctionIds(template) {
    const functionIds = template.customizeFunctionIds || [];
    return functionIds;
}
//# sourceMappingURL=create-node-ts-app.js.map