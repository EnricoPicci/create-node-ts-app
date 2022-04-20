#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_node_ts_app_1 = require("../internals/create-node-ts-app");
const templates_1 = require("../internals/templates");
const program = new commander_1.Command();
program
    .description('A command to create e new Node app which uses TypeScript')
    .requiredOption('-a, --appName <string>', `Name of the app to be created (e.g. 'my-app')`)
    .option('-t, --template <string>', `the template to use, defualt is ${templates_1.DefaultTemplateName}`, templates_1.DefaultTemplateName);
program.parse(process.argv);
const _options = program.opts();
(0, create_node_ts_app_1.createNodeTsApp)(_options.appName, _options.template);
//# sourceMappingURL=create-node-ts-app.js.map