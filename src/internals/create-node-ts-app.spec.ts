import { expect } from 'chai';
import { mkdtempSync, readdirSync, realpathSync, rmSync, statSync } from 'fs';
import { tmpdir } from 'os';
import { sep } from 'path';

import { createNodeTsApp } from './create-node-ts-app';
import { readJson } from './json-manipulation/read-json';
import { readTsconfigJson } from './json-manipulation/tsconfig-json';
import { DefaultTemplateName } from './templates';

describe(`createNodeTsApp`, () => {
    it(`should create the app folder and copy the files from the default template`, () => {
        console.log(realpathSync(`${__dirname}/../../templates/${DefaultTemplateName}`));
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

    it(`should create an app using a template that extend another template`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const template = 'package-exec';
        const appName = 'newAppWithTemplateExtendingAnotherTemplate';
        const appNameLowerCase = appName.toLowerCase();
        createNodeTsApp(appName, template);

        // check that all files have been copied from the template folder
        const templateFiles = getFiles(`${__dirname}/../../templates/${template}`);
        const nodeTsAppFiles = getFiles(`${tempDir}/${appName}`);
        templateFiles.forEach((file) => {
            // some more files have been created by commands like "git init" and so we can not check a one-to-one match
            expect(nodeTsAppFiles.includes(file)).to.be.true;
        });

        // check that the name in package.json has been set correctly
        const packageJson = readJson('package.json');
        expect(packageJson.name).equal(appNameLowerCase);

        deleteTempDir(tempDir);
    }).timeout(60000);

    it(`should create the an app using a template that extend another template. The files defined in the folder of the child template wins on the files
    with the same name defined in the folders of the extended template`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const template = 'package-exec';
        const appName = 'newAppWithTemplateExtendingAnotherTemplate';
        createNodeTsApp(appName, template);

        // check that the package.json file is the one from the template extending the other template and not from the extended template
        // the bin property is not defined in the extended template but in the child template
        const packageJson = readJson('package.json');
        expect(packageJson.bin).is.an('object');

        deleteTempDir(tempDir);
    }).timeout(60000);

    it(`should create the an app using a template that defines one customizeFunction that sets the bin property in package.json`, () => {
        const tempDir = makeTempDir();
        process.chdir(tempDir);
        const appName = 'newAppWithTemplateWithCustomizeFunction';
        createNodeTsApp(appName, 'package-exec');

        // the customizeFunction defined in the package-exec template sets the bin property in package.json using the outDir defined in tsconfig.json
        // check that the bin property in package.json has been set correctly by the customizeFunction
        const packageJson = readJson('package.json');
        const expectedBinPath = `${readTsconfigJson().compilerOptions.outDir}/lib/exec.js`;
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

function getFiles(dir: string): string[] {
    const _root = dir;
    return readdirSync(realpathSync(dir)).flatMap((item) => {
        const path = `${dir}${sep}${item}`;
        if (statSync(path).isDirectory()) {
            return getFiles(path);
        }
        return path.slice(_root.length + 1);
    });
}
