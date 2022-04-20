"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const get_files_1 = require("./get-files");
const package_info_1 = require("./package-info");
const rename_1 = require("./rename");
describe(`newGitignoreNames`, () => {
    it(`should return the new names for the .gitignore files`, () => {
        const _packageDirPath = (0, package_info_1.packageDirPath)();
        const files = (0, get_files_1.getDotGitignoreFilesInTemplateFolders)(_packageDirPath);
        const newFileNames = (0, rename_1.newGitignoreNames)(files);
        (0, chai_1.expect)(newFileNames.length).equal(1);
        (0, chai_1.expect)(newFileNames[0].includes('.gitignore')).false;
        (0, chai_1.expect)(newFileNames[0].includes('gitignore')).true;
    });
});
//# sourceMappingURL=rename.spec.js.map