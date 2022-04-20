export function packageDirPath() {
    if (!process.env.npm_package_name) {
        throw new Error('process.env.npm_package_name is not defined');
    }
    const packageNameParts = process.env.npm_package_name.split('/');
    const packageDirName = packageNameParts?.[packageNameParts.length - 1];
    const packageDirPathIndex = __dirname.indexOf(packageDirName);
    const packageDirPath = __dirname.substring(0, packageDirPathIndex + packageDirName.length);
    return packageDirPath;
}
