"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeJson = void 0;
function mergeJson(json1, json2) {
    const mergedJson = { ...json1, ...json2 };
    return mergedJson;
}
exports.mergeJson = mergeJson;
//# sourceMappingURL=merge.js.map