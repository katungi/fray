# Fray - Simple Config-Free Bundler

Fray is a lightweight and easy-to-use bundler for JavaScript projects. It is designed to simplify the process of bundling JavaScript code without the need for complex configuration files.

## Features

- **Config-Free**: Fray does not require any configuration files. It automatically detects and bundles all JavaScript files in your project.
- **Supports All JS Formats**: Fray supports all JavaScript formats, including ES6 modules, CommonJS modules, and AMD modules.
- **Zero Configuration**: Fray requires no additional setup or configuration. Simply install it and start bundling your JavaScript code.
- **Optimized Bundles**: Fray optimizes your bundles by removing dead code, minifying the output, and applying other performance optimizations.
- **Easy to Use**: Fray provides a simple command-line interface for bundling your JavaScript code. Just run a single command and your code will be bundled.

## Installation

To install Fray, use the following command:

```bash
npm install -g fray
```

## Usage

To bundle your JavaScript code using Fray, run the following command in your project directory:

```bash
fray
```

This will bundle all JavaScript files in your project and create a `bundle.js` file in the root directory.

Fray can take additional options to customize the bundling process. For example, you can specify an output file name using the `-o` flag:

```bash
fray -o dist/bundle.js
```

You can also specify the input directory containing your JavaScript files using the `-e` or `entrypoint` flag:

```bash
fray -e src
```

For more information on Fray and its options, run `fray --help`.

## License

Fray is released under the [MIT License](LICENSE).
