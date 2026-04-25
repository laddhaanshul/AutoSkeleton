const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const dts = require('rollup-plugin-dts');

const resolvePlugin = resolve.default || resolve;
const commonjsPlugin = commonjs.default || commonjs;
const typescriptPlugin = typescript.default || typescript;
const peerDepsPlugin = peerDepsExternal.default || peerDepsExternal;
const dtsPlugin = dts.default || dts;

module.exports = [
    // ── Web (React DOM) CJS + ESM ────────────────────────────────────────
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
                sourcemap: true,
                exports: 'named',
            },
            {
                file: 'dist/index.esm.js',
                format: 'esm',
                sourcemap: true,
                exports: 'named',
            },
        ],
        plugins: [
            peerDepsPlugin(),
            resolvePlugin({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
            commonjsPlugin(),
            typescriptPlugin({
                tsconfig: './tsconfig.json',
                declaration: false,
                declarationDir: undefined,
                outputToFilesystem: true,
            }),
        ],
        external: ['react', 'react-dom', 'react-native'],
    },

    // ── React Native CJS + ESM ────────────────────────────────────────────
    {
        input: 'src/native/index.ts',
        output: [
            {
                file: 'dist/native/index.js',
                format: 'cjs',
                sourcemap: true,
                exports: 'named',
            },
            {
                file: 'dist/native/index.esm.js',
                format: 'esm',
                sourcemap: true,
                exports: 'named',
            },
        ],
        plugins: [
            peerDepsPlugin(),
            resolvePlugin({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
            commonjsPlugin(),
            typescriptPlugin({
                tsconfig: './tsconfig.json',
                declaration: false,
                declarationDir: undefined,
                outputToFilesystem: true,
            }),
        ],
        external: ['react', 'react-native'],
    },

    // ── Web type declarations ──────────────────────────────────────────────
    {
        input: 'src/index.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dtsPlugin()],
        external: ['react', 'react-dom', 'react-native'],
    },

    // ── Native type declarations ───────────────────────────────────────────
    {
        input: 'src/native/index.ts',
        output: [{ file: 'dist/native/index.d.ts', format: 'esm' }],
        plugins: [dtsPlugin()],
        external: ['react', 'react-native'],
    },
];
