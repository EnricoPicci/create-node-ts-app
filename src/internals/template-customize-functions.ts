import { readTsconfigJson } from './json-manipulation/tsconfig-json';
import { readPackageJson, writeIntoPackageJson } from './json-manipulation/package-json';

export function setBin(appName: string) {
    const tsconfigJson = readTsconfigJson();
    const outDir = tsconfigJson.compilerOptions.outDir;
    const binPath = `${outDir}/lib/exec.js`;
    const binJson = {
        bin: {
            [appName]: binPath,
        },
    };
    writeIntoPackageJson(binJson);
}

export function setOutdirInScriptVersion() {
    const tsconfigJson = readTsconfigJson();
    const outDir = tsconfigJson.compilerOptions.outDir;
    const packageJson = readPackageJson();
    const scripts = packageJson.scripts;
    scripts.version = `npm run tsc && git add -A ${outDir}`;
    writeIntoPackageJson(scripts);
}
