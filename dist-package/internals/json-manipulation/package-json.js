"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeIntoPackageJson = exports.mergeIntoPackageJson = exports.readPackageJson = void 0;
const fs_1 = require("fs");
const read_json_1 = require("./read-json");
const merge_1 = require("./merge");
const defaultPackageJsonPath = `package.json`;
function readPackageJson() {
    return (0, read_json_1.readJson)(defaultPackageJsonPath);
}
exports.readPackageJson = readPackageJson;
function mergeIntoPackageJson(json) {
    const packageJson = readPackageJson();
    return (0, merge_1.mergeJson)(packageJson, json);
}
exports.mergeIntoPackageJson = mergeIntoPackageJson;
function writeIntoPackageJson(json) {
    const newPackageJson = mergeIntoPackageJson(json);
    const newPackageJsonString = JSON.stringify(newPackageJson, null, 2);
    (0, fs_1.writeFileSync)(defaultPackageJsonPath, newPackageJsonString);
}
exports.writeIntoPackageJson = writeIntoPackageJson;
//# sourceMappingURL=package-json.js.map