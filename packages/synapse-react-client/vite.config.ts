import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import * as path from 'path'

export default defineConfig({
  root: './src',
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        plugins: ['@svgr/plugin-jsx'],
        ref: true,
      },
    }),
  ],
  define: {
    __TEST__: JSON.stringify(false),
    __DEV__: JSON.stringify(false),
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [NodeModulesPolyfillPlugin()],
    },
  },
  resolve: {
    alias: {
      src: resolve(__dirname, '/src'),
      process: 'process/browser',
      path: 'path-browserify',
      timers: 'timers-browserify',
      fs: 'memfs',
      https: 'https-browserify',
      stream: 'stream-browserify',
      http: 'stream-http',
      buffer: 'buffer/',
      util: 'util',
    },
  },
})
