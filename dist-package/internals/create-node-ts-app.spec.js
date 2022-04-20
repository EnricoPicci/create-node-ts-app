"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = require("path");
const create_node_ts_app_1 = require("./create-node-ts-app");
const get_files_1 = require("./file-manipulation/get-files");
const read_json_1 = require("./json-manipulation/read-json");
const tsconfig_json_1 = require("./json-manipulation/tsconfig-json");
const templates_1 = require("./templates");
describe(`createNodeTsApp`, () => {
    it(`should create the app folder and copy the files from the default template`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const appName = 'newApp';
        const appNameLowerCase = 'newapp';
        (0, create_node_ts_app_1.createNodeTsApp)(appName);
        // check that all files have been copied from the template folder
        // gitignore is excluded because it is copied to .gitignore during the copy process
        const templateFiles = (0, get_files_1.getFiles)(`${__dirname}/../../template-folders/${templates_1.DefaultTemplateName}`).filter((file) => file !== 'gitignore');
        const nodeTsAppFiles = (0, get_files_1.getFiles)(`${tempDir}/${appName}`);
        templateFiles.forEach((file) => {
            // some more files have been created by commands like "git init" and so we can not check a one-to-one match
            const fileIncluded = nodeTsAppFiles.includes(file);
            if (!fileIncluded) {
                console.error(`File ${file} not found in the app folder`);
            }
            (0, chai_1.expect)(nodeTsAppFiles.includes(file)).to.be.true;
        });
        // check that .gitignore is present
        (0, chai_1.expect)(nodeTsAppFiles.includes('.gitignore')).to.be.true;
        // check that the name in package.json has been set correctly
        const packageJson = (0, read_json_1.readJson)('package.json');
        (0, chai_1.expect)(packageJson.name).equal(appNameLowerCase);
        // check that the commands have been executed by checking  that the devDepencies have been added
        // since some of the commands are "npm i ..." and should install some devDepencies
        (0, chai_1.expect)(Object.keys(packageJson.devDependencies).length).greaterThan(0);
        // check that the name of the app has been set in the README.md
        const readme = (0, fs_1.readFileSync)('README.md').toString();
        (0, chai_1.expect)(readme.includes(appName)).to.be.true;
        (0, chai_1.expect)(readme.includes('<app-name>')).to.be.false;
        deleteTempDir(tempDir);
    }).timeout(60000);
    it(`should throw since the app name is not valid`, () => {
        (0, chai_1.expect)(() => {
            (0, create_node_ts_app_1.createNodeTsApp)(' ');
        }).to.throw();
    });
    it(`should throw since the template does not exist`, () => {
        (0, chai_1.expect)(() => {
            (0, create_node_ts_app_1.createNodeTsApp)('anApp', 'unknownTemplate');
        }).to.throw();
    });
    it(`should create an app using a non default template`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const template = 'package-exec';
        const appName = 'newAppWithTemplateExtendingAnotherTemplate';
        const appNameLowerCase = appName.toLowerCase();
        (0, create_node_ts_app_1.createNodeTsApp)(appName, template);
        // check that all files have been copied from the template folder
        const templateFiles = (0, get_files_1.getFiles)(`${__dirname}/../../template-folders/${template}`);
        const nodeTsAppFiles = (0, get_files_1.getFiles)(`${tempDir}/${appName}`);
        templateFiles.forEach((file) => {
            // some more files have been created by commands like "git init" and so we can not check a one-to-one match
            (0, chai_1.expect)(nodeTsAppFiles.includes(file)).to.be.true;
        });
        // check that the name in package.json has been set correctly
        const packageJson = (0, read_json_1.readJson)('package.json');
        (0, chai_1.expect)(packageJson.name).equal(appNameLowerCase);
        deleteTempDir(tempDir);
    }).timeout(60000);
    it(`should create the an app using a template which specifies more than one folder in the "foders" property. 
    The files defined last folder (the last folder in the array passed to the "folders" property) wins on the files
    with the same name defined in previoius folders`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const template = 'package-exec';
        const appName = 'newAppWithTemplateExtendingAnotherTemplate';
        (0, create_node_ts_app_1.createNodeTsApp)(appName, template);
        // check that the package.json file is the one defined in the last folder and not the one defined in the previous folders
        // the bin property is defined only in  the last folder and therefore we check that it is an object
        const packageJson = (0, read_json_1.readJson)('package.json');
        (0, chai_1.expect)(packageJson.bin).is.an('object');
        deleteTempDir(tempDir);
    }).timeout(60000);
    it(`should create the an app using a template that defines one customizeFunction that sets the bin property in package.json`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const appName = 'newAppWithTemplateWithCustomizeFunction';
        (0, create_node_ts_app_1.createNodeTsApp)(appName, 'package-exec');
        // the customizeFunction defined in the package-exec template sets the bin property in package.json using the outDir defined in tsconfig.json
        // check that the bin property in package.json has been set correctly by the customizeFunction
        const packageJson = (0, read_json_1.readJson)('package.json');
        const expectedBinPath = `${(0, tsconfig_json_1.readTsconfigJson)().compilerOptions.outDir}/lib/command.js`;
        (0, chai_1.expect)(packageJson.bin[appName]).equal(expectedBinPath);
        deleteTempDir(tempDir);
    }).timeout(60000);
});
function makeTempDir() {
    const tmpDir = (0, os_1.tmpdir)();
    const ret = (0, fs_1.mkdtempSync)(`${tmpDir}${path_1.sep}`);
    console.log('>>>>>>>> tempDir created', ret);
    return ret;
}
function deleteTempDir(tempDir) {
    (0, fs_1.rmSync)(tempDir, { recursive: true, force: true });
    console.log('>>>>>>>> tempDir deleted', tempDir);
}
//# sourceMappingURL=create-node-ts-app.spec.js.map