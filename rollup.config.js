import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: './src/shft.js',
        output: {
            file: 'index.js',
            format: 'module'
        },
        plugins: [resolve()]
    },
    {
        input: './src/shft.js',
        output: {
            file: 'index.min.js',
            format: 'module'
        },
        plugins: [resolve(), terser()]
    },
    {
        input: './src/shft.d.ts',
        output: {
            file: 'index.d.ts',
            format: 'module'
        },
        plugins: [dts()]
    }
];
