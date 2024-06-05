import { dirname, join } from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import JestHasteMap from 'jest-haste-map'

const root = join(dirname(fileURLToPath(import.meta.url)), 'product');

const hasteMap = new JestHasteMap.default({
    extensions: ['js', 'jsx', 'ts', 'tsx'],
    name: 'fray',
    platforms: [],
    rootDir: root,
    roots: [root]
});

const { hasteFS, moduleMap } = await hasteMap.build();

console.log(hasteFS)