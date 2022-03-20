"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function createNodeTsApp() {
    console.log('Current folder', __dirname);
    const executePath = (0, fs_1.realpathSync)(process.argv[1]);
    console.log('executePath', executePath);
}
createNodeTsApp();
