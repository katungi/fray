import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { bundle } from './bundler';
import chalk from 'chalk';

const options = yargs(hideBin(process.argv)).argv as any;

const entrypoint = options?.entrypoint;

if (!entrypoint) {
    throw new Error('--entry-point does not exist. Please provide a valid file');
}

bundle(entrypoint, options.output)
    .then(() => {
        console.log(chalk.bold('Bundling complete!'));
    })
    .catch(err => {
        console.error(chalk.red.bold('Error during bundling:'), err);
    });
