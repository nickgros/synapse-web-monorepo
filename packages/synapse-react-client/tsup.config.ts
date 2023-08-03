import { defineConfig } from 'tsup'
import { sassPlugin } from 'esbuild-sass-plugin'
import svgrPlugin from 'esbuild-plugin-svgr'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

export default defineConfig({
  entry: { index: './src/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  // MUI doesn't support directory import in ESM, but we can get around that by just bundling it
  // https://github.com/mui/material-ui/issues/35233
  noExternal: ['@mui/material', '@sage-bionetworks/synapse-types'],
  external: ['react-plotly.js'],
  esbuildPlugins: [
    sassPlugin({
      loadPaths: ['../../node_modules', 'node_modules'],
    }),
    svgrPlugin({
      plugins: ['@svgr/plugin-jsx'],
      ref: true,
      namedExport: 'ReactComponent',
      exportType: 'named',
    }),
    NodeModulesPolyfillPlugin(),
  ],
})
