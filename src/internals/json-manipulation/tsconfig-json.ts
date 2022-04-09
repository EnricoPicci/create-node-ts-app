import { readJson } from './read-json';

const defaultTsconfigJsonPath = `tsconfig.json`;

// read the tsconfig.json file
export function readTsconfigJson() {
    return readJson(defaultTsconfigJsonPath);
}
