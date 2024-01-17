"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNodeTsApp = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const get_files_1 = require("./file-manipulation/get-files");
const package_json_1 = require("./json-manipulation/package-json");
const templates_1 = require("./templates");
function createNodeTsApp(appName, templateName = templates_1.DefaultTemplateName, verbose) {
    const _verbose = verbose?.toUpperCase() === 'Y';
    if (appName.trim() === '') {
        throw new Error('App name is empty');
    }
    const template = (0, templates_1.getTemplate)(templateName);
    // get the folder paths before changing the working directory
    const folderPaths = getFolderPaths(template);
    // create the app folder
    (0, fs_1.mkdirSync)(appName);
    log(`Created folder ${appName}`, _verbose);
    process.chdir(appName);
    // copy the files from the template folders
    // if the same file is defined in multiple folders, the last one wins
    folderPaths.forEach((folderPath) => {
        const _normalizedFolderPath = (0, path_1.normalize)(folderPath);
        (0, fs_1.cpSync)(`${_normalizedFolderPath}`, `.${path_1.sep}`, { recursive: true });
        log(`Copied files from ${_normalizedFolderPath}`, _verbose);
        log(`files copied: ${(0, get_files_1.getFiles)(folderPath).join(', ')}`, _verbose);
    });
    const gitignoreExists = (0, fs_1.existsSync)('.gitignore');
    if (gitignoreExists) {
        // Append if there's already a `.gitignore` file there
        const data = (0, fs_1.readFileSync)('gitignore');
        (0, fs_1.appendFileSync)('.gitignore', data);
        (0, fs_1.unlinkSync)('gitignore');
    }
    else {
        // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
        // See: https://github.com/npm/npm/issues/1862
        (0, fs_1.renameSync)('gitignore', '.gitignore');
    }
    // run the commands
    const commands = getCommands(template);
    commands.forEach((command) => {
        (0, child_process_1.execSync)(command, { stdio: 'inherit' });
        log(`Cammand "${command}" executed`, _verbose);
    });
    // change package.json
    const nameJson = { name: appName.toLowerCase() };
    (0, package_json_1.writeIntoPackageJson)(nameJson);
    // execute the functions if defined in the template
    getFunctions(template).forEach((func) => {
        func(appName);
        log(`Function "${func.name}" executed`, _verbose);
    });
    getFunctionIds(template).forEach(({ module, functionName }) => {
        require(module)[functionName](appName);
        log(`Function "${functionName}" in module "${module}" executed`, _verbose);
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
function log(message, verbose) {
    if (verbose) {
        console.log(message);
    }
}
//# sourceMappingURL=create-node-ts-app.js.map