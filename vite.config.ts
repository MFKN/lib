import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'build',
    lib: {
      name: 'OL',
      fileName: 'index',
      entry: 'src/index.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: ['osra']
    }
  }
})
