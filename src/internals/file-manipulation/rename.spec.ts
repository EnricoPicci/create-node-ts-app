import { expect } from 'chai';
import { getDotGitignoreFilesInTemplateFolders } from './get-files';
import { packageDirPath } from './package-info';
import { newGitignoreNames } from './rename';

describe(`newGitignoreNames`, () => {
    it(`should return the new names for the .gitignore files`, () => {
        const _packageDirPath = packageDirPath();
        const files = getDotGitignoreFilesInTemplateFolders(_packageDirPath);
        const newFileNames = newGitignoreNames(files);
        expect(newFileNames.length).equal(1);
        expect(newFileNames[0].includes('.gitignore')).false;
        expect(newFileNames[0].includes('gitignore')).true;
    });
});
