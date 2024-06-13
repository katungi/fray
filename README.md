# Fray - A simple JavaScript Module Bundler

🚧 This package is in very early development and does not cater for most use cases. 🚧
## Overview

Fray is a JavaScript module bundler designed to streamline the process of managing and bundling JavaScript files and their dependencies. It leverages Jest Haste Map for efficient file management and dependency resolution, and uses Babel for code transformation. This document outlines the current features of Fray and provides a roadmap for future enhancements.

### Current Features

1. **Module Bundling**:
   - Fray collects and resolves JavaScript modules, transforming and bundling them into a single output file.
   - Uses Jest Haste Map to build a dependency graph and resolve modules.
2. **Code Transformation**:
   - Transforms JavaScript code using Babel, specifically with the `@babel/plugin-transform-modules-commonjs` plugin to convert ES6 modules to CommonJS.
3. **Custom Module Loader**:
   - Implements a custom `require` function to load and execute bundled modules.
   - Supports caching to avoid redundant module loading.
4. **Command-Line Interface**:
   - Supports specifying an entry point via command-line arguments.
   - Allows outputting the bundled code to a specified file.

### Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/fray.git
cd fray
npm install

```

### Usage

To bundle your project, run:

```bash
node index --entrypoint path/to/your/entry/file.js --output path/to/output/bundle.js

```

### Code Structure

- `index.ts`: Main script that handles module resolution, transformation, and bundling.
- `worker.ts`: Worker script that handles code transformation using Babel.
- `require.js`: Custom module loader template used in the output bundle.

### Example

Assuming your project structure is as follows:

```css
project/
├── src/
│   ├── index.js
│   ├── moduleA.js
│   └── moduleB.js
├── bundler.js
└── require.js
```

Run the bundler:

```bash
node bundler.js --entrypoint ./src/index.js --output ./dist/bundle.js
```

### Roadmap

1. **Add a `-minify` Flag**:
   - Integrate a minifier like `terser` to minify each individual file in the bundle.
2. **Add a Cache**:
   - Implement a caching mechanism to store transformed files and only re-compile files that have changed.
3. **Generate Source Maps** (_Medium_):
   - Learn about source maps and generate the corresponding `.map` file for the bundle to improve debugging.
4. **Add a `-dev` Option** (_Medium_):
   - Start an HTTP server that serves the bundled code through an HTTP endpoint for development purposes.
5. **Automatic Re-Bundling** (_Medium_):
   - Utilize Jest Haste Map’s `watch` function to listen for file changes and automatically re-bundle the project.
6. **Switch to ESM with Import Maps** (_Advanced_):
   - Learn about Import Maps and transition the bundler from CommonJS to native ESM.
7. **Hot Reloading** (_Advanced_):
   - Implement hot reloading by adjusting the runtime to update modules by de-registering and re-running the module and its dependencies.

### Contribution

We welcome contributions to Fray! Please follow the [contributing guidelines](https://www.notion.so/dankat/CONTRIBUTING.md) to get started.

### License

Fray is licensed under the MIT License.
