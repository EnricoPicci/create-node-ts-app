import { realpathSync } from 'fs';

export function createNodeTsApp() {
    console.log('Current folder', __dirname);
    const executePath = realpathSync(process.argv[1]);
    console.log('executePath', executePath);
    console.log('cwd', process.cwd());
}
