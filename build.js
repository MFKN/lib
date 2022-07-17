import esbuild from 'esbuild'
import alias from 'esbuild-plugin-alias'
import path from 'path'

esbuild.build({
  watch: process.argv.includes('-w') || process.argv.includes('--watch'),
  entryPoints: ['./src/index.ts'],
  bundle: true,
  outfile: './build/index.js',
  publicPath: '/',
  minify: process.argv.includes('-m') || process.argv.includes('--minify'),
  define: {
    // 'global': 'globalThis',
    // 'process.platform': '"web"',
    'process.env.WEB_ORIGIN': '"http://localhost:1234"',
    'process.env.WEB_SANDBOX_ORIGIN': '"http://localhost:2345"'
  },
  plugins: [
    alias({
      'zlib': path.resolve('./node_modules/browserify-zlib/lib/index.js'),
      'stream': path.resolve('./node_modules/stream-browserify/index.js'),
      'crypto': path.resolve('./node_modules/crypto-browserify/index.js'),
      'http': path.resolve('./node_modules/stream-http/index.js'),
      'https': path.resolve('./node_modules/stream-http/index.js'),
      'fs': path.resolve('./node_modules/browserify-fs/index.js'),
      'buffer': path.resolve('./node_modules/buffer/index.js'),
      'events': path.resolve('./node_modules/events/events.js'),
      'util': path.resolve('./node_modules/util/util.js'),
      'url': path.resolve('./node_modules/url/url.js'),
      'assert': path.resolve('./node_modules/assert/build/assert.js'),
      'path': path.resolve('./node_modules/path/path.js'),
    }),
  ]
})
