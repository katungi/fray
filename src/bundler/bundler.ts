import JestHasteMap from 'jest-haste-map';
import { join } from 'path';
import Resolver from 'jest-resolve';
import fs from 'fs';
import { Worker } from 'jest-worker';
import { transformFile } from './worker';
import { resolveModuleDependencies } from './resolver';

const rootMap = join(__dirname, '../product');

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

const wrapModule = (id: number, code: string) => `define(${id}, function(require, module, exports) {\n${code}});`;

export async function bundle(entrypoint: string, output: string | undefined) {
    const { hasteFS, moduleMap } = await hasteMap.build();

    const worker = new Worker(join(__dirname, '../worker.ts'), {
        enableWorkerThreads: true
    });

    //@ts-ignore
    const resolver = new Resolver.default(moduleMap, {
        extensions: ['.js'],
        hasCoreModules: false,
        rootDir: rootMap,
        moduleDirectory: ['node_modules']
    });

    let seenFiles = new Set<string>();
    let modules = new Map<string, { id: number; code: string; dependencyMap: Map<string, string> }>();
    let queue = [entrypoint];
    let id = 0;

    while (queue.length) {
        const module = queue.shift()!;

        if (seenFiles.has(module)) {
            continue;
        }

        const { dependencyMap, code } = resolveModuleDependencies(module, resolver, hasteFS);
        const metadata = { id: id++, code, dependencyMap };

        //@ts-ignore
        modules.set(module, metadata);
        //@ts-ignore
        queue.push(...Array.from(dependencyMap.values()));
    }

    const results = await Promise.all(
        Array.from(modules).reverse().map(async ([module, { id, code, dependencyMap }]) => {
            let newCode = await transformFile(code, worker);
            for (const [dependencyName, dependencyPath] of dependencyMap) {
                newCode = newCode?.replace(
                    new RegExp(`require\\(('|")${dependencyName.replace(/[\/.]/g, '\\$&')}\\1\\)`),
                    `require(${modules.get(dependencyPath)!.id})`,
                );
            }
            return wrapModule(id, newCode);
        })
    );

    const outputContent = [
        fs.readFileSync(join(__dirname, './require.js'), 'utf8'),
        ...results,
        `requireModule(0)`
    ].join('\n');

    if (output) {
        fs.writeFileSync(output, outputContent, 'utf-8');
    }

    worker.end();
}
