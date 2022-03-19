"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNodeTsApp = void 0;
const child_process_1 = require("child_process");
const path_1 = require("path");
function createNodeTsApp(folder) {
    const folderPath = (0, path_1.parse)(folder);
    (0, child_process_1.execSync)(`bash create-project.sh ${(0, path_1.format)(folderPath)}`);
}
exports.createNodeTsApp = createNodeTsApp;
