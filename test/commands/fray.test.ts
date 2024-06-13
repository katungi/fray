import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('fray', () => {
  it('runs fray cmd', async () => {
    const {stdout} = await runCommand('fray')
    expect(stdout).to.contain('hello world')
  })

  it('runs fray --name oclif', async () => {
    const {stdout} = await runCommand('fray --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
