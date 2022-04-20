import { renameSync } from 'fs';
import { getDotGitignoreFilesInTemplateFolders } from './get-files';

export function renameDotGitignore() {
    const dotGitignoreFiles = getDotGitignoreFilesInTemplateFolders();
    console.log('dotGitignoreFiles: ', dotGitignoreFiles);
    const newFileNames = newGitignoreNames(dotGitignoreFiles);
    console.log('newFileNames: ', newFileNames);
    dotGitignoreFiles.forEach((gitignoreFilePath, index) => {
        renameSync(gitignoreFilePath, newFileNames[index]);
    });
}

export function newGitignoreNames(gitignoreFilePaths: string[]) {
    return gitignoreFilePaths.map((gitignoreFilePath) => newGitignoreName(gitignoreFilePath));
}

function newGitignoreName(gitignoreFilePath: string) {
    const gitignoreFileNameParts = gitignoreFilePath.split('.gitignore');
    gitignoreFileNameParts.pop();
    gitignoreFileNameParts.push('gitignore');
    return gitignoreFileNameParts.join('');
}
