import {transformSync} from "@babel/core";

export const transformFile = function(code: string) {
    return (transformSync(code, {
        plugins: ["@babel/plugin-transform-modules-commonjs"]
    }) as { code: string }).code;
}