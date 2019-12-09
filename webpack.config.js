// Req global typescript module (npm install -g typescript; npm link typescript)
const path = require('path');
const DtsBundleWebpack = require('dts-bundle-webpack');

module.exports = {
    entry: './ts/shft.ts',
    module: {
        rules: [{ use: 'ts-loader', exclude: /node_modules/ }]
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname),
        library: 'shftjs',
        libraryTarget: 'umd'
    },
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new DtsBundleWebpack({
            name: 'shftjs',
            main: 'src/shft.d.ts',
            out: '../index.d.ts'
        })
    ]
};
