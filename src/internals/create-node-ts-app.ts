import { execSync } from 'child_process';
import { appendFileSync, cpSync, existsSync, mkdirSync, readFileSync, realpathSync, renameSync, unlinkSync } from 'fs';
import { normalize, sep } from 'path';
import { getFiles } from './file-manipulation/get-files';
import { writeIntoPackageJson } from './json-manipulation/package-json';
import { DefaultTemplateName, getTemplate, Template } from './templates';

export function createNodeTsApp(appName: string, templateName = DefaultTemplateName, verbose?: string) {
    const _verbose = verbose?.toUpperCase() === 'Y';
    if (appName.trim() === '') {
        throw new Error('App name is empty');
    }

    const template = getTemplate(templateName);

    // get the folder paths before changing the working directory
    const folderPaths = getFolderPaths(template);

    // create the app folder
    mkdirSync(appName);
    log(`Created folder ${appName}`, _verbose);
    process.chdir(appName);

    // copy the files from the template folders
    // if the same file is defined in multiple folders, the last one wins
    folderPaths.forEach((folderPath) => {
        const _normalizedFolderPath = normalize(folderPath);
        cpSync(`${_normalizedFolderPath}`, `.${sep}`, { recursive: true });
        log(`Copied files from ${_normalizedFolderPath}`, _verbose);
        log(`files copied: ${getFiles(folderPath).join(', ')}`, _verbose);
    });

    const gitignoreExists = existsSync('.gitignore');
    if (gitignoreExists) {
        // Append if there's already a `.gitignore` file there
        const data = readFileSync('gitignore');
        appendFileSync('.gitignore', data);
        unlinkSync('gitignore');
    } else {
        // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
        // See: https://github.com/npm/npm/issues/1862
        renameSync('gitignore', '.gitignore');
    }

    // run the commands
    getCommands(template).forEach((command) => {
        execSync(command, { stdio: 'inherit' });
        log(`Cammand "${command}" executed`, _verbose);
    });

    // change package.json
    const nameJson = { name: appName.toLowerCase() };
    writeIntoPackageJson(nameJson);

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

function getFolderPaths(template: Template) {
    return (
        template.folders?.map((folder) => {
            const folderPath = realpathSync(`${__dirname}/../../template-folders/${folder}`);
            if (!existsSync(folderPath)) {
                throw new Error(`Folder ${folder} does not exist`);
            }
            return folderPath;
        }) || []
    );
}

function getCommands(template: Template) {
    const commands = template.commands || [];
    return commands;
}

function getFunctions(template: Template) {
    const functions = template.customizeFunctions || [];
    return functions;
}

function getFunctionIds(template: Template) {
    const functionIds = template.customizeFunctionIds || [];
    return functionIds;
}

function log(message: string, verbose: boolean) {
    if (verbose) {
        console.log(message);
    }
}
