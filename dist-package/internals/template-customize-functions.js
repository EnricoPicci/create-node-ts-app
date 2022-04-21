"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAppNameInReadme = exports.setOutdirInScriptVersion = exports.setBin = void 0;
const tsconfig_json_1 = require("./json-manipulation/tsconfig-json");
const package_json_1 = require("./json-manipulation/package-json");
const fs_1 = require("fs");
// Sets the bin property in package.json so that the command can be executed using npx
function setBin(appName) {
    const tsconfigJson = (0, tsconfig_json_1.readTsconfigJson)();
    const outDir = tsconfigJson.compilerOptions.outDir;
    const binPath = `${outDir}/lib/command.js`;
    const binJson = {
        bin: {
            [appName]: binPath,
        },
    };
    (0, package_json_1.writeIntoPackageJson)(binJson);
}
exports.setBin = setBin;
// sets the outdir, as specified in tsconfig.json, in the "vesrion" script in package.json
// so that the compiled javascript code is added to git
function setOutdirInScriptVersion() {
    const tsconfigJson = (0, tsconfig_json_1.readTsconfigJson)();
    const outDir = tsconfigJson.compilerOptions.outDir;
    const packageJson = (0, package_json_1.readPackageJson)();
    const scripts = packageJson.scripts;
    scripts.version = `npm run tsc && git add -A ${outDir}`;
    (0, package_json_1.writeIntoPackageJson)(scripts);
}
exports.setOutdirInScriptVersion = setOutdirInScriptVersion;
// sets the appName in readme.md
// it is defined as a customize function since not all templates may need it - a template which doed not have a readme.md file does not need it
function setAppNameInReadme(appName) {
    const readmeMdPath = `${process.cwd()}/README.md`;
    const readmeMd = (0, fs_1.readFileSync)(readmeMdPath).toString();
    const newReadmeMd = readmeMd.replaceAll('<app-name>', appName);
    (0, fs_1.writeFileSync)(readmeMdPath, newReadmeMd);
}
exports.setAppNameInReadme = setAppNameInReadme;
//# sourceMappingURL=template-customize-functions.js.map