import { resolve } from 'path'
import { ConfigBuilder } from 'vite-config'

const config = new ConfigBuilder()
  .setIncludeReactConfig(true)
  .setIncludeVitestConfig(true)
  .setConfigOverrides({
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          preview: resolve(__dirname, 'preview.html'),
        },
      },
    },
    test: {
      include: ['src/**/*.test.[jt]s?(x)'],
      environment: 'jsdom',
    },
  })
  .build()

export default config
