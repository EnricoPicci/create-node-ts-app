import { writeFileSync } from 'fs';
import { readJson } from './read-json';
import { mergeJson } from './merge';

const defaultPackageJsonPath = `package.json`;

export function readPackageJson() {
    return readJson(defaultPackageJsonPath);
}
export function mergeIntoPackageJson(json: any) {
    const packageJson = readPackageJson();
    return mergeJson(packageJson, json);
}
export function writeIntoPackageJson(json: any) {
    const newPackageJson = mergeIntoPackageJson(json);
    const newPackageJsonString = JSON.stringify(newPackageJson, null, 2);
    writeFileSync(defaultPackageJsonPath, newPackageJsonString);
}
