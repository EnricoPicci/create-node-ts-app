#!/usr/bin/env node

import { Command } from 'commander';
import { createNodeTsApp } from '../internals/create-node-ts-app';
import { DefaultTemplateName } from '../internals/templates';

const program = new Command();

program
    .description('A command to create e new Node app which uses TypeScript')
    .requiredOption('-a, --appName <string>', `Name of the app to be created (e.g. 'my-app')`)
    .option('-t, --template <string>', `the template to use, defualt is ${DefaultTemplateName}`, DefaultTemplateName)
    .option('-v, --verbose <string>', `verbose, defualt is N`, 'N');

program.parse(process.argv);
const _options = program.opts();

createNodeTsApp(_options.appName, _options.template, _options.verbose);
