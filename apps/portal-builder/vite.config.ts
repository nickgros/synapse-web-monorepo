import { ConfigBuilder } from 'vite-config'

const config = new ConfigBuilder()
  .setIncludeReactConfig(true)
  .setIncludeVitestConfig(true)
  .setConfigOverrides({
    test: {
      include: ['src/**/*.test.[jt]s?(x)'],
      environment: 'jsdom',
    },
  })
  .build()

export default config
