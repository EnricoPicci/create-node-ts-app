# create-node-ts-app

Creates a node app configured to use Typescript.

## Node version

Requires Node version > v16.7.0

## command to create an app

npx --yes @enrico.piccinin/create-node-ts-app <options>

### Options

-   -a --appName (required): name of the app
-   -t --template (optional): template to be used (default: default template)

## templates

It is possible to specify a template to be used to create the app.

### **default** template

npx --yes @enrico.piccinin/create-node-ts-app -a <app-name>

Scaffolds a simple Node app configured to use Typescript.

Provides a configuration for `eslint` and `prettier`.

Testing is based on the `mocha` and `chai` libraries.

Creates an `src` folder with an `hallo.ts` and its test `hallo.spec.ts`.

## The **package** template

npx --yes @enrico.piccinin/create-node-ts-app -a <app-name> -t package

Scaffolds a Node app that can be published as a package on the public NPM registry.

Provides a configuration for `eslint` and `prettier`.

Testing is based on the `mocha` and `chai` libraries.

Creates an `src` folder with a `package-core.ts` file containing a sample of a function which is exported by the package via the `index.ts` file.

### The **package-exec** template

npx --yes @enrico.piccinin/create-node-ts-app -a <app-name> -t package-exec

Scafolds a Node app that can be deployed on the public NPM registry and used as a command via `npx`.

Provides a configuration for `eslint` and `prettier`.

Testing is based on the `mocha` and `chai` libraries.

Creates an `src` folder with the following structure:

-   `lib` folder containing the command
-   `core` folder containing `exec-command.ts` which implements the logic to execute the command
-   `core/internals` folder containing the internals of the logic of the command

## The template mechanism

A Template is an Object that defines how to scaffold a project.

A Template has the following properties:

-   **folders**. This is an array of names of folders which have to be copied to the target project folder. The "to be copied" folder names must be names of folders contained in the "template-folders" folder of this project.
-   **commands**. An array of strings representing the commands that have to be created after the project folder has been created. The commands are exectued from within the project folder. Examples of such commands and "npm i ..." to load dependencies or "git init" to initialize a git repo.
-   **customizeFunctions**. An array of functions which are executed from within the project folder. Such functions receive the app name as parameter.
-   **customizeFunctionIds**. An array of Objects of type FunctionId (i.e. of type {module: string; functionName: string}). Each FunctionId identifies a function which is loaded and executed from within the project folder. Such functions receive the app name as parameter.
