import { readFileSync, writeFileSync } from 'fs';

const defaultPackageJsonPath = `package.json`;

export function mergeJson(json1: any, json2: any) {
    const mergedJson = { ...json1, ...json2 };
    return mergedJson;
}

export function mergeIntoPackageJson(json: any) {
    const packageJson = getPackageJson(defaultPackageJsonPath);
    return mergeJson(packageJson, json);
}
export function writeIntoPackageJson(json: any) {
    const newPackageJson = mergeIntoPackageJson(json);
    const newPackageJsonString = JSON.stringify(newPackageJson, null, 2);
    writeFileSync(defaultPackageJsonPath, newPackageJsonString);
}

// export function mergeJsonFiles(...files: string[]) {
//     const mergedJson = files.reduce((acc, file) => {
//         const json = require(file);
//         return Object.assign(acc, json);
//     }, {});
//     return mergedJson;
// }

export function getPackageJson(packageJson: string) {
    const packageJsonString = readFileSync(packageJson).toString();
    return JSON.parse(packageJsonString);
}

// set name to the name of the app => requires to use the name of the app as variable
//
// for pacakge set scripts with parameter (the dist folder coming from either the template or the name of the app as parameter)
//
// for package-exec set the bin with the dist folder coming from either the template or the name of the app as parameter
