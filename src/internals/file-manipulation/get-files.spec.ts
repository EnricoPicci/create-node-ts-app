import { expect } from 'chai';
import { getDotGitignoreFilesInTemplateFolders } from './get-files';
import { packageDirPath } from './package-info';

describe(`getDotGitignoreFiles`, () => {
    it(`should return all .gitignore files`, () => {
        const _packageDirPath = packageDirPath();
        const files = getDotGitignoreFilesInTemplateFolders(_packageDirPath);
        expect(files.length).equal(1);
        expect(files[0].endsWith('.gitignore')).true;
    });
});
