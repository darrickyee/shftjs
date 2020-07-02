import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';

export default [
    {
        input: './src/shft.js',
        output: {
            file: 'index.js',
            format: 'module',
        },
        plugins: [resolve()],
    },
    {
        input: './src/shft.js',
        output: {
            file: 'shft.js',
            format: 'iife',
            name: 'shftjs',
        },
        plugins: [resolve()],
    },
    {
        input: './src/shft.d.ts',
        output: {
            file: 'index.d.ts',
            format: 'module',
        },
        plugins: [dts()],
    },
];
