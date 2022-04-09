import { expect } from 'chai';
import { mkdtempSync, readdirSync, rmSync, statSync } from 'fs';
import { tmpdir } from 'os';
import { sep } from 'path';

import { createNodeTsApp } from './create-node-ts-app';
import { readJson } from './json-manipulation/read-json';
import { readTsconfigJson } from './json-manipulation/tsconfig-json';
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
        const packageJson = readJson('package.json');
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

    it(`should create the an app using a template that defines more than one folder and the file defined in the last folder wins on the files
    with the same name defined in previous folders`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const appName = 'newAppWithNonDefaultTemplate';
        const appNameLowerCase = appName.toLowerCase();
        createNodeTsApp(appName, 'package-exec');

        // check that all files have been copied from the template folder
        const templateFiles = getFiles(`${__dirname}/../../templates/${DefaultTemplateName}`);
        const nodeTsAppFiles = getFiles(`${tempDir}/${appName}`);
        templateFiles.forEach((file) => {
            // some more files have been created by commands like "git init" and so we can not check a one-to-one match
            expect(nodeTsAppFiles.includes(file)).to.be.true;
        });

        // check that the name in package.json has been set correctly
        const packageJson = readJson('package.json');
        expect(packageJson.name).equal(appNameLowerCase);

        // check that the package.json file copied is the one from the last folder
        expect(packageJson.bin).is.an('object');

        deleteTempDir(tempDir);
    }).timeout(60000);

    it(`should create the an app using a template that defines one customizeFunction that sets the bin property in package.json`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const appName = 'newAppWithTemplateWithCustomizeFunction';
        createNodeTsApp(appName, 'package-exec');

        const expectedBinPath = `${readTsconfigJson().compilerOptions.outDir}/lib/exec.js`;

        // check that the outDir in package.json has been set correctly
        const packageJson = readJson('package.json');
        expect(packageJson.bin).is.an('object');
        expect(packageJson.bin.newAppWithTemplateWithCustomizeFunction).is.a('string');
        expect(packageJson.bin.newAppWithTemplateWithCustomizeFunction).equal(expectedBinPath);

        deleteTempDir(tempDir);
    }).timeout(60000);
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
