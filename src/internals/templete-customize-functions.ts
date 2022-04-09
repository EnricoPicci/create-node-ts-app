import { readTsconfigJson } from './json-manipulation/tsconfig-json';
import { writeIntoPackageJson } from './json-manipulation/package-json';

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
