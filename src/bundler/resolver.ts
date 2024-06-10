import fs from 'fs';

export function resolveModuleDependencies(module: string, resolver: any, hasteFS: any) {
    const dependencyMap = new Map(
        hasteFS.getDependencies(module)!.map((dep: string) => [
            dep,
            resolver.resolveModule(module, dep)
        ])
    );

    const code = fs.readFileSync(module, 'utf8');

    return { dependencyMap, code };
}
