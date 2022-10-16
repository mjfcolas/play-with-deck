const {build} = require('esbuild')
const {dependencies, peerDependencies} = require('./package.json')

build({
    entryPoints: ['src/index.ts'],
    outdir: 'dist',
    bundle: true,
    format: "esm",
    external: Object.keys(dependencies | {}).concat(Object.keys(peerDependencies | {}))
}).then()
