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
