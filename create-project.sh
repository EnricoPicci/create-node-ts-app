# bash create-project.sh

startDir=$(pwd)
mkdir $1
cd $1
mkdir src

cp -r $startDir/.vscode .vscode
cp $startDir/.eslintrc.js .eslintrc.js
cp $startDir/.gitignore .gitignore
cp $startDir/.prettierrc.js .prettierrc.js
cp $startDir/tsconfig_common_config.json tsconfig_common_config.json
cp $startDir/tsconfig.eslint.json tsconfig.eslint.json

