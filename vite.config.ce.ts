import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue({
      // Enable custom element mode for .ce.vue files
      customElement: /\.ce\.vue$/
    }),
    tailwindcss(),
    svgLoader()  // Required: VueFinder uses SVG icons as Vue components
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  build: {
    outDir: 'dist-ce',
    lib: {
      entry: resolve(__dirname, 'src/vuefinder.ce.ts'),
      formats: ['iife'],
      name: 'VueFinderCE',
      fileName: () => 'vuefinder-ce.js'
    },
    cssCodeSplit: false,
    rollupOptions: {
      // Bundle ALL dependencies (Vue 3, Uppy, nanostores, etc.)
      external: [],
      output: {
        inlineDynamicImports: true,
        assetFileNames: 'vuefinder-ce.[ext]'
      }
    }
  }
})
