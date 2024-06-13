import { Args, Command } from "@oclif/core";

export default class Hello extends Command {
	static override args = {
		arg1: Args.string(),
	};

	public async run(): Promise<void> {
		const { args } = await this.parse(Hello);
		this.log("Hello from oclif!");
		this.log("arg1: %s", args.arg1);
	}
}
