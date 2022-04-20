import { readdirSync, realpathSync, statSync } from 'fs';
import { sep } from 'path';

export function getFiles(dir: string, nameOnly = true): string[] {
    return readdirSync(realpathSync(dir)).flatMap((item) => {
        const path = `${dir}${sep}${item}`;
        if (statSync(path).isDirectory()) {
            return getFiles(path, nameOnly);
        }
        return nameOnly ? path.slice(dir.length + 1) : path;
    });
}

export function getDotGitignoreFilesInTemplateFolders(templateFoldersPath?: string) {
    const _templateFoldersPath = templateFoldersPath || process.cwd();
    console.log(`templateFoldersPath: ${_templateFoldersPath}`);
    const files = getFiles(`${_templateFoldersPath}/template-folders`, false);
    return files.filter((file) => file.endsWith('.gitignore'));
}
