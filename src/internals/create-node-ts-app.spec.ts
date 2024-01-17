import { expect } from 'chai';
import { mkdtempSync, readFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { sep } from 'path';

import { createNodeTsApp } from './create-node-ts-app';
import { getFiles } from './file-manipulation/get-files';
import { readJson } from './json-manipulation/read-json';
import { readTsconfigJson } from './json-manipulation/tsconfig-json';

describe(`createNodeTsApp`, () => {
    it(`should create the app folder and copy the files from the default template`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const appName = 'newApp';
        const appNameLowerCase = 'newapp';
        createNodeTsApp(appName);

        // check that all files have been copied from the template folders
        // gitignore is excluded because it is copied to .gitignore during the copy process
        const templateFiles = [
            ...getFiles(`${__dirname}/../../template-folders/base`).filter((file) => file !== 'gitignore'),
            ...getFiles(`${__dirname}/../../template-folders/sample-code`),
        ];
        const nodeTsAppFiles = getFiles(`${tempDir}/${appName}`);
        templateFiles.forEach((file) => {
            // some more files have been created by commands like "git init" and so we can not check a one-to-one match
            const fileIncluded = nodeTsAppFiles.includes(file);
            if (!fileIncluded) {
                console.error(`File ${file} not found in the app folder`);
            }
            expect(nodeTsAppFiles.includes(file)).to.be.true;
        });

        // check that .gitignore is present
        expect(nodeTsAppFiles.includes('.gitignore')).to.be.true;

        // check that the name in package.json has been set correctly
        const packageJson = readJson('package.json');
        expect(packageJson.name).equal(appNameLowerCase);

        // check that the commands have been executed by checking  that the devDepencies have been added
        // since some of the commands are "npm i ..." and should install some devDepencies
        expect(Object.keys(packageJson.devDependencies).length).greaterThan(0);

        // check that the name of the app has been set in the README.md
        const readme = readFileSync('README.md').toString();
        expect(readme.includes(appName)).to.be.true;
        expect(readme.includes('<app-name>')).to.be.false;

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

    it(`should create an app using a non default template`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const template = 'exec-cmd';
        const appName = 'newAppWithTemplateExtendingAnotherTemplate';
        const appNameLowerCase = appName.toLowerCase();
        createNodeTsApp(appName, template);

        // check that all files have been copied from the template folder
        const templateFiles = getFiles(`${__dirname}/../../template-folders/${template}`);
        const nodeTsAppFiles = getFiles(`${tempDir}/${appName}`);
        templateFiles.forEach((file) => {
            // some more files have been created by commands like "git init" and so we can not check a one-to-one match
            if (file === 'gitignore') {
                file = '.gitignore';
            }
            const fileFound = nodeTsAppFiles.includes(file);
            if (!fileFound) {
                console.error('File not found', file);
            }
            expect(nodeTsAppFiles.includes(file)).to.be.true;
        });

        // check that the name in package.json has been set correctly
        const packageJson = readJson('package.json');
        expect(packageJson.name).equal(appNameLowerCase);

        deleteTempDir(tempDir);
    }).timeout(60000);

    it(`should create the an app using a template which specifies more than one folder in the "folders" property. 
    The files defined last folder (the last folder in the array passed to the "folders" property) wins on the files
    with the same name defined in previoius folders`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const template = 'exec-cmd';
        const appName = 'newAppWithTemplateExtendingAnotherTemplate';
        createNodeTsApp(appName, template);

        // check that the package.json file is the one defined in the last folder and not the one defined in the previous folders
        // the bin property is defined only in  the last folder and therefore we check that it is an object
        const packageJson = readJson('package.json');
        expect(packageJson.bin).is.an('object');

        deleteTempDir(tempDir);
    }).timeout(60000);

    it(`should create the an app using the package template`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const template = 'package';
        const appName = 'newPackageApp';
        createNodeTsApp(appName, template);

        // check that the package.json contains the expected "main" and "types" properties
        const packageJson = readJson('package.json');
        expect(packageJson.main).equals('dist/index.js');
        expect(packageJson.types).equals('dist/index.d.ts');

        // check that the tsconfig.json contains the expected "declaration" property
        const tsconfigJson = readTsconfigJson();
        expect(tsconfigJson.compilerOptions.declaration).equals(true);

        deleteTempDir(tempDir);
    }).timeout(60000);

    it(`should create the an app using the default template`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const template = undefined;
        const appName = 'newDefaultApp';
        createNodeTsApp(appName, template);

        // check that the package.json contains the chai dependency at the expected version
        // https://github.com/mochajs/mocha/issues/5073
        const packageJson = readJson('package.json');
        'ddd'.startsWith;
        expect(packageJson.devDependencies['chai'].startsWith('^4.')).to.be.true;

        deleteTempDir(tempDir);
    }).timeout(60000);

    it(`should create the an app using a template that defines one customizeFunction that sets the bin property in package.json`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const appName = 'newAppWithTemplateWithCustomizeFunction';
        createNodeTsApp(appName, 'exec-cmd');

        // the customizeFunction defined in the exec-cmd template sets the bin property in package.json using the outDir defined in tsconfig.json
        // check that the bin property in package.json has been set correctly by the customizeFunction
        const packageJson = readJson('package.json');
        const expectedBinPath = `${readTsconfigJson().compilerOptions.outDir}/lib/command.js`;
        expect(packageJson.bin[appName]).equal(expectedBinPath);

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
