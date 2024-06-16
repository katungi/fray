import { Command, Flags, Args } from "@oclif/core";
import chalk from "chalk";
import { bundle } from "../bundler/bundler.js";

export default class Fray extends Command {
  static description = "Fray - A Javascript module bundler";

  static flags = {
    help: Flags.help({ char: 'h' }),
    entry: Flags.string({char: 'e', description: 'Entry point file', required: true}),
    output: Flags.string({ char: 'o', description: 'Output file path', required: true }),
    minify: Flags.boolean({ char: 'm', description: 'Minify the output', default: false }),
  };

  static args = {
    entry: Args.string({ name: 'entry', description: 'Entry point file', required: true }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Fray);

    const entrypoint = args.entry;
    const output = flags.output;
    const shouldMinify = flags.minify;

    this.log(`Entrypoint: ${entrypoint}`);
    this.log(`Output: ${output}`);
    this.log(`Should Minify: ${shouldMinify}`);

    try {
      await bundle(entrypoint, output);
      this.log(chalk.bold('Bundling complete!'));
    } catch (err) {
      console.error(chalk.red('Error while bundling:'), err);
    }
  }
}
