"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const get_files_1 = require("./get-files");
const package_info_1 = require("./package-info");
describe(`getDotGitignoreFiles`, () => {
    it(`should return all .gitignore files`, () => {
        const _packageDirPath = (0, package_info_1.packageDirPath)();
        const files = (0, get_files_1.getDotGitignoreFilesInTemplateFolders)(_packageDirPath);
        (0, chai_1.expect)(files.length).equal(1);
        (0, chai_1.expect)(files[0].endsWith('.gitignore')).true;
    });
});
//# sourceMappingURL=get-files.spec.js.map