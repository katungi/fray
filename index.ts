import JestHasteMap from 'jest-haste-map';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs'

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

const {hasteFS, moduleMap} = await hasteMap.build();

console.log(hasteFS);