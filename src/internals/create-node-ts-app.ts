import { execSync } from 'child_process';
import { parse, format } from 'path';

export function createNodeTsApp(folder: string) {
    const folderPath = parse(folder);

    execSync(`bash create-project.sh ${format(folderPath)}`);
}
