"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJson = void 0;
const fs_1 = require("fs");
const jsonminify = require("jsonminify");
// exported for testing purposes
function readJson(jsonPath) {
    const jsonString = (0, fs_1.readFileSync)(jsonPath).toString();
    const minifiedJson = jsonminify(jsonString);
    return JSON.parse(minifiedJson);
}
exports.readJson = readJson;
//# sourceMappingURL=read-json.js.map