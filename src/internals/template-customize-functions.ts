import { readTsconfigJson } from './json-manipulation/tsconfig-json';
import { readPackageJson, writeIntoPackageJson } from './json-manipulation/package-json';

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

// sets the outdir, as specified in tsconfig.json, in the "vesrion" script in package.json
// so that the compiled javascript code is added to git
export function setOutdirInScriptVersion() {
    const tsconfigJson = readTsconfigJson();
    const outDir = tsconfigJson.compilerOptions.outDir;
    const packageJson = readPackageJson();
    const scripts = packageJson.scripts;
    scripts.version = `npm run tsc && git add -A ${outDir}`;
    writeIntoPackageJson(scripts);
}
