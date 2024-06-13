import { Command, Flags, Args } from "@oclif/core";
// import chalk from "chalk";
// import { bundle } from "../bundler/bundler";

// export default class Fray extends Command {
//   static description = "Fray - A Javascript module bundler";

//   static flags = {
//     help: Flags.help({ char: 'h' }),
//     output: Flags.string({ char: 'o', description: 'Output file path', required: true }),
//     entry: Flags.string({ char: 'e', description: 'Entry point file', required: true }),
//   };

//   static args = {
//     entry: Args.string({ name: 'entry', description: 'Entry point file', required: true }),
//     output: Args.string({ name: 'output', description: 'Output file path', required: true }),
//   };

//   public async run(): Promise<void> {
//     const { args, flags } = await this.parse(Fray);

//     const entrypoint = args.entry;
//     const output = flags.output;

//     try {
//       await bundle(entrypoint, output);
//       this.log(chalk.bold('Bundling complete!'));
//     } catch (err) {
//       this.error(chalk.red.bold('Error during bundling:'));
//     }
//   }
// }


export default class Fray extends Command {
  public async run(): Promise<void> {
    this.log("FRAY FRAYYYY 🎉!");
  }
}