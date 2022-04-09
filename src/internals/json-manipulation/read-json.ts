import { readFileSync } from 'fs';
import jsonminify = require('jsonminify');

// exported for testing purposes

export function readJson(jsonPath: string) {
    const jsonString = readFileSync(jsonPath).toString();
    const minifiedJson = jsonminify(jsonString);
    return JSON.parse(minifiedJson);
}
