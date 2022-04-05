"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = require("path");
const create_node_ts_app_1 = require("./create-node-ts-app");
describe(`createNodeTsApp`, () => {
    it(`should create the app folder and copy the files from the default template`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const appName = 'newApp';
        const appNameLowerCase = 'newapp';
        (0, create_node_ts_app_1.createNodeTsApp)(appName);
        // check that all files have been copied from the template folder
        const templateFiles = getFiles(`${__dirname}/../../templates/${create_node_ts_app_1.DefaultTemplate}`);
        const nodeTsAppFiles = getFiles(`${tempDir}/${appName}`);
        templateFiles.forEach((file) => {
            // some more files have been created by commands like "git init" and so we can not check a one-to-one match
            (0, chai_1.expect)(nodeTsAppFiles.includes(file)).to.be.true;
        });
        // check that the name in package.json has been set correctly
        (0, chai_1.expect)((0, create_node_ts_app_1.getPackageJson)('package.json').name).equal(appNameLowerCase);
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
function getFiles(dir, root) {
    const _root = root || dir;
    return (0, fs_1.readdirSync)(dir).flatMap((item) => {
        const path = `${dir}/${item}`;
        if ((0, fs_1.statSync)(path).isDirectory()) {
            return getFiles(path, _root);
        }
        const rootIndex = path.indexOf(_root);
        return path.slice(rootIndex + _root.length + 1);
    });
}
//# sourceMappingURL=create-node-ts-app.spec.js.map