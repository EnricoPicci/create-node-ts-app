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

# npm init -y

# npm i typescript ts-node mocha chai --save-dev

# npm i @types/node @types/mocha @types/chai --save-dev

# npx tsc --init

# git init
