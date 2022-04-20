"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDotGitignoreFilesInTemplateFolders = exports.getFiles = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function getFiles(dir, nameOnly = true) {
    return (0, fs_1.readdirSync)((0, fs_1.realpathSync)(dir)).flatMap((item) => {
        const path = `${dir}${path_1.sep}${item}`;
        if ((0, fs_1.statSync)(path).isDirectory()) {
            return getFiles(path, nameOnly);
        }
        return nameOnly ? path.slice(dir.length + 1) : path;
    });
}
exports.getFiles = getFiles;
function getDotGitignoreFilesInTemplateFolders(templateFoldersPath) {
    const _templateFoldersPath = templateFoldersPath || process.cwd();
    console.log(`templateFoldersPath: ${_templateFoldersPath}`);
    const files = getFiles(`${_templateFoldersPath}/template-folders`, false);
    return files.filter((file) => file.endsWith('.gitignore'));
}
exports.getDotGitignoreFilesInTemplateFolders = getDotGitignoreFilesInTemplateFolders;
//# sourceMappingURL=get-files.js.map