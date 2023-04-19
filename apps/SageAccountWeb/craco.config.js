const { ProvidePlugin } = require('webpack')

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          path: require.resolve('path-browserify'),
          timers: require.resolve('timers-browserify'),
          fs: require.resolve('memfs'),
          https: require.resolve('https-browserify'),
          stream: require.resolve('stream-browserify'),
          http: require.resolve('stream-http'),
          events: require.resolve('events'),
        },
      },
      ignoreWarnings: [/Failed to parse source map/],
    },
    plugins: {
      add: [
        new ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
    },
  },
  eslint: {
    enable: false,
  },
  jest: {
    configure: {
      silent: true,
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: './src/tests/setupTests.ts',
      moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
      },
      reporters: [
        'default',
        'github-actions',
        [
          './node_modules/jest-html-reporter',
          {
            pageTitle: 'SageAccountWeb Test Report',
            outputPath: './coverage/test-report.html',
            includeFailureMsg: true,
            includeSuiteFailure: true,
          },
        ],
      ],
    },
  },
}
