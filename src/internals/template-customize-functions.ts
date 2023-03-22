import { readTsconfigJson } from './json-manipulation/tsconfig-json';
import { readPackageJson, writeIntoPackageJson } from './json-manipulation/package-json';
import { readFileSync, writeFileSync } from 'fs';

// Sets the bin property in package.json so that the command can be executed using npx
export function setBin(appName: string) {
    const tsconfigJson = readTsconfigJson();
    const outDir = tsconfigJson.compilerOptions.outDir;
    const binPath = `${outDir}/lib/command.js`;
    const binJson = {
        bin: {
            [appName]: binPath,
        },
    };
    writeIntoPackageJson(binJson);
}

// sets the outdir, as specified in tsconfig.json, in the scripts in package.json
// so that the compiled javascript code is added to git
export function setOutdirInScriptVersion() {
    const tsconfigJson = readTsconfigJson();
    const outDir = tsconfigJson.compilerOptions.outDir;
    const packageJson = readPackageJson();
    const scripts = packageJson.scripts;
    // set the tsc script
    scripts.tsc = `tsc --outDir ${outDir}`;
    // set the version script
    scripts.version = `npm run tsc && git add -A ${outDir}`;
    writeIntoPackageJson(packageJson);
}

// sets the appName in readme.md
// it is defined as a customize function since not all templates may need it - a template which doed not have a readme.md file does not need it
export function setAppNameInReadme(appName: string) {
    const readmeMdPath = `${process.cwd()}/README.md`;
    const readmeMd = readFileSync(readmeMdPath).toString();
    const newReadmeMd = readmeMd.replaceAll('<app-name>', appName);
    writeFileSync(readmeMdPath, newReadmeMd);
}
