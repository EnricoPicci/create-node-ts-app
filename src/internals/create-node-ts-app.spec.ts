import { expect } from 'chai';
import { mkdtempSync, readdirSync, rmSync, statSync } from 'fs';
import { tmpdir } from 'os';
import { sep } from 'path';

import { createNodeTsApp, getPackageJson } from './create-node-ts-app';
import { DefaultTemplateName } from './templates';

describe(`createNodeTsApp`, () => {
    it(`should create the app folder and copy the files from the default template`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const appName = 'newApp';
        const appNameLowerCase = 'newapp';
        createNodeTsApp(appName);

        // check that all files have been copied from the template folder
        const templateFiles = getFiles(`${__dirname}/../../templates/${DefaultTemplateName}`);
        const nodeTsAppFiles = getFiles(`${tempDir}/${appName}`);
        templateFiles.forEach((file) => {
            // some more files have been created by commands like "git init" and so we can not check a one-to-one match
            expect(nodeTsAppFiles.includes(file)).to.be.true;
        });

        // check that the name in package.json has been set correctly
        const packageJson = getPackageJson('package.json');
        expect(packageJson.name).equal(appNameLowerCase);
        expect(Object.keys(packageJson.devDependencies).length).greaterThan(0);

        deleteTempDir(tempDir);
    }).timeout(60000);

    it(`should throw since the app name is not valid`, () => {
        expect(() => {
            createNodeTsApp(' ');
        }).to.throw();
    });

    it(`should throw since the template does not exist`, () => {
        expect(() => {
            createNodeTsApp('anApp', 'unknownTemplate');
        }).to.throw();
    });
});

function makeTempDir() {
    const tmpDir = tmpdir();
    const ret = mkdtempSync(`${tmpDir}${sep}`);
    console.log('>>>>>>>> tempDir created', ret);
    return ret;
}

function deleteTempDir(tempDir: string) {
    rmSync(tempDir, { recursive: true, force: true });
    console.log('>>>>>>>> tempDir deleted', tempDir);
}

function getFiles(dir: string, root?: string): string[] {
    const _root = root || dir;
    return readdirSync(dir).flatMap((item) => {
        const path = `${dir}/${item}`;
        if (statSync(path).isDirectory()) {
            return getFiles(path, _root);
        }
        const rootIndex = path.indexOf(_root);
        return path.slice(rootIndex + _root.length + 1);
    });
}
