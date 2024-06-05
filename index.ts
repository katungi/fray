import JestHasteMap from 'jest-haste-map';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs'

const rootMap = join(dirname(fileURLToPath(import.meta.url)), 'product');

const hasteMap = new JestHasteMap.default({
    extensions: ['js', 'jsx', 'ts', 'tsx'],
    name: 'fray',
    rootDir: rootMap,
    roots: [rootMap],
})