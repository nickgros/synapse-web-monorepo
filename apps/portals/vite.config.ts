import { vitestConfig } from 'vite-config'
import { mergeConfig } from 'vitest/config'
import path from 'path'

export default mergeConfig(vitestConfig, {
  envDir: './src/config',
  test: {
    include: ['src/tests/**/*.test.[jt]s?(x)'],
    setupFiles: ['src/tests/setupTests.ts'],
  },
  resolve: {
    alias: {
      'synapse-react-client': path.resolve(
        __dirname,
        '../../packages/synapse-react-client',
      ),
    },
  },
})
