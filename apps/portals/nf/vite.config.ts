import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import { reactRouter } from '@react-router/dev/vite'
import { mergeConfig } from 'vite'
import { resolve } from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { defineConfig } from 'vitest/config'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'

const projectRootDir = resolve(__dirname)

// Unless absolutely necessary, all changes should go into the shared vite configuration, not the individual portal configuration
export default mergeConfig(
  defineConfig({
    server: { port: 3000 },
    build: {
      outDir: './build',
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    define: {
      __TEST__: JSON.stringify(false),
      __DEV__: JSON.stringify(false),
    },
    optimizeDeps: {
      // In the dev server, Vite doesn't automatically optimize plotly.js-basic-dist when it should. This causes a broken import
      // This is probably because plotly.js-basic-dist is a UMD module, and we load the entire object returned by the UMD module into react-plotly.js.
      include: ['plotly.js-basic-dist'],
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
      },
    },
    resolve: {
      // alias: {
      //   src: resolve(__dirname, '/src'),
      //   process: 'process/browser',
      //   path: 'path-browserify',
      //   timers: 'timers-browserify',
      //   fs: 'memfs',
      //   https: 'https-browserify',
      //   stream: 'stream-browserify',
      //   http: 'stream-http',
      //   buffer: 'buffer/',
      //   util: 'util',
      // },
    },
    ssr: {
      noExternal: [
        'react-spinners',
        'mui-one-time-password-input',
        '@rjsf/core',
        '@rjsf/mui',
        '@rjsf/utils',
      ],
    },
    plugins: [
      // react(),
      reactRouter({
        appDirectory: 'src',
        ssr: true,
      }),
      svgr({
        svgrOptions: {
          plugins: ['@svgr/plugin-jsx'],
          ref: true,
          exportType: 'named',
        },
        // Explicitly exclude SVG imports that end in a query (such as ?url) - Vite can already handle these
        include: /^.*\.svg$/,
      }),
      // nodePolyfills({ include: ['stream'], globals: { process: true } }),
      createHtmlPlugin({
        inject: {
          data: {
            headContent: `<meta charset="utf-8" />
    <link rel="shortcut icon" href="/favicon.svg" />


    <!-- Facebook Meta Tags -->
    <meta property="og:url" content="https://%VITE_PORTAL_KEY%.synapse.org/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="%VITE_PORTAL_NAME%" />
    <meta property="og:description" content="%VITE_PORTAL_DESCRIPTION%" />
    <meta
      name="image"
      property="og:image"
      content="https://%VITE_PORTAL_KEY%.synapse.org/socialmedia.png"
    />

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content="synapse.org" />
    <meta
      property="twitter:url"
      content="https://%VITE_PORTAL_KEY%.synapse.org/"
    />
    <meta name="twitter:title" content="%VITE_PORTAL_NAME%" />
    <meta name="twitter:description" content="%VITE_PORTAL_DESCRIPTION%" />
    <meta
      name="twitter:image"
      content="https://%VITE_PORTAL_KEY%.synapse.org/socialmedia.png"
    />

    <meta name="description" content="%VITE_PORTAL_DESCRIPTION%" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="./manifest.json" />
    <title>%VITE_PORTAL_NAME%</title>
    <!-- This gets populated on app load -->
    <!-- links below are SRC dependencies -->
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
      crossorigin="anonymous"
    />

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-KPW4KS62');
    </script>
    <!-- End Google Tag Manager -->
    <script type="module">
        /* Fix polyfill issues with vite and @apidevtools/json-schema-ref-parser */
        import { Buffer } from 'buffer'
        import process from 'process'
        window.Buffer = Buffer
        window.process = process

        globalThis.global = globalThis
    </script>`,
            gtmNoscript: `    <!-- Google Tag Manager (noscript) -->
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KPW4KS62"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
`,
          },
        },
      }),
    ],
  }),
  {
    // TODO: PORTALS-3159
    // Until we create a build/exports strategy for synapse-portal-framework, we have to create an alias so Vite can resolve the module
    // This must be configured for each file because it depends on the projectRootDir
    resolve: {
      alias: [
        // {
        //   find: /^@sage-bionetworks\/synapse-portal-framework$/,
        //   replacement: resolve(
        //     projectRootDir,
        //     '../../synapse-portal-framework/src/index.ts',
        //   ),
        // },
        // {
        //   find: /@sage-bionetworks\/synapse-portal-framework/,
        //   replacement: resolve(
        //     projectRootDir,
        //     '../../synapse-portal-framework/src',
        //   ),
        // },
      ],
    },
  },
)
