import {transformSync} from '@babel/core';

export function transformFile(code: string): string | undefined {
    const result = transformSync(code, {
        presets: ['@babel/preset-env'],
    });

    return result?.code || null || undefined;
}