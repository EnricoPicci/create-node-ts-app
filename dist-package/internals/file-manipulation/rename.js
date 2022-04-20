"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newGitignoreNames = exports.renameDotGitignore = void 0;
const fs_1 = require("fs");
const get_files_1 = require("./get-files");
function renameDotGitignore() {
    const dotGitignoreFiles = (0, get_files_1.getDotGitignoreFilesInTemplateFolders)();
    console.log('dotGitignoreFiles: ', dotGitignoreFiles);
    const newFileNames = newGitignoreNames(dotGitignoreFiles);
    console.log('newFileNames: ', newFileNames);
    dotGitignoreFiles.forEach((gitignoreFilePath, index) => {
        (0, fs_1.renameSync)(gitignoreFilePath, newFileNames[index]);
    });
}
exports.renameDotGitignore = renameDotGitignore;
function newGitignoreNames(gitignoreFilePaths) {
    return gitignoreFilePaths.map((gitignoreFilePath) => newGitignoreName(gitignoreFilePath));
}
exports.newGitignoreNames = newGitignoreNames;
function newGitignoreName(gitignoreFilePath) {
    const gitignoreFileNameParts = gitignoreFilePath.split('.gitignore');
    gitignoreFileNameParts.pop();
    gitignoreFileNameParts.push('gitignore');
    return gitignoreFileNameParts.join('');
}
//# sourceMappingURL=rename.js.map