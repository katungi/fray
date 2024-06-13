import { runCommand } from '@oclif/test'
import { describe, it} from 'mocha'
import { expect } from 'chai'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('fray', () => {
    const entrypoint = path.join(__dirname, '../../product/entry-point.js')
    const outputDir = path.join(__dirname, '../../dir/output.js')

    it('bundles a file', async () => {
        const { stdout } = await runCommand(`bundle ${entrypoint} ${outputDir}`);
        expect(stdout).to.contain('Bundling complete!')

        const outputExists = fs.existsSync(outputDir)
        expect(outputExists).to.be.true
    });
})