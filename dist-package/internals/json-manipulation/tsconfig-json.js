"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTsconfigJson = void 0;
const read_json_1 = require("./read-json");
const defaultTsconfigJsonPath = `tsconfig.json`;
// read the tsconfig.json file
function readTsconfigJson() {
    return (0, read_json_1.readJson)(defaultTsconfigJsonPath);
}
exports.readTsconfigJson = readTsconfigJson;
//# sourceMappingURL=tsconfig-json.js.map