import JestHasteMap from 'jest-haste-map';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yargs from 'yargs'
import chalk from 'chalk';
import Resolver from 'jest-resolve';
import fs from 'node:fs';
import { Worker } from "jest-worker";

const rootMap = join(dirname(fileURLToPath(import.meta.url)), 'product');

//@ts-ignore
const hasteMap = new JestHasteMap.default({
    extensions: ['js', 'jsx', 'ts', 'tsx'],
    maxWorkers: 1,
    rootDir: rootMap,
    roots: [rootMap],
    name: 'fray',
    platforms: [],
    retainAllFiles: true,
});

const { hasteFS, moduleMap } = await hasteMap.build();

const worker = new Worker(join(dirname(fileURLToPath(import.meta.url)), './worker.ts'), {
    //@ts-ignore
    enableWorkerThreads: true
});

console.log(hasteFS);

const options = yargs(process.argv).argv;

//@ts-ignore
const entrypoint = options?.entrypoint;

// console.log(chalk.bold('Resolving Entry Point for:: ') + chalk.green(entrypoint));

if (!entrypoint) {
    throw new Error('-- entry-point does not exist. Please provide a valid file');
}

//@ts-ignore
const resolver = new Resolver.default(moduleMap, {
    extensions: ['.js'],
    hasCoreModules: false,
    rootDir: rootMap,
    moduleDirectory: ['node_modules']
})

let seenFiles = new Set();
let modules = new Map();
let queue = [entrypoint];
let id = 0;

while (queue.length) {
    const module = queue.shift();

    if (seenFiles.has(module)) {
        continue;
    }

    const dependencyMap = new Map(
        hasteFS.getDependencies(module).map((dep: string) => [
            dep,
            resolver.resolveModule(module, dep)
        ])
    )

    const code = fs.readFileSync(module, 'utf8');

    const metadata = {
        id: id++,
        code,
        dependencyMap
    }

    modules.set(module, metadata);
    queue.push(...dependencyMap.values());
}

console.log("Modules::", modules);
console.log("Queue::", queue);

console.log(chalk.bold('Resolved Entry Point for:: ') + chalk.green(entrypoint));
console.log(chalk.bold(`> Found ${seenFiles.size} files`));
console.log(chalk.bold(`> Serializing Bundle`));

const wrapModule = (id: any, code: any) => `define(${id}, function(require, module, exports) {\n${code}});`;

const results = await Promise.all(Array.from(modules).reverse().map(async ([module, { id, code, dependencyMap }]) => {
    console.log(chalk.bold(`> Transforming ${chalk.blue(id, code, dependencyMap)}`));
    //@ts-ignore
    let newCode = await worker.transformFile(code);
    console.log(chalk.bold(`> Checking... ${chalk.redBright(code)}`));
    for (const [dependencyName, dependencyPath] of dependencyMap) {
        newCode = newCode?.replace(
            new RegExp(
                `require\\(('|")${dependencyName.replace(/[\/.]/g, '\\$&')}\\1\\)`,
            ),
            `require(${modules.get(dependencyPath).id})`,
        )
    }
    console.log(chalk.bold(`> Wrapping ${chalk.blue(newCode)}`))
    return wrapModule(id, newCode);
}),);

const output = [
    fs.readFileSync('./require.js', 'utf8'),
    ...results,
    `requireModule(0)`
].join('\n');

//@ts-ignore
if (options?.output) {
    //@ts-ignore
    fs.writeFileSync(options.output, output, 'utf-8');
}

worker.end();