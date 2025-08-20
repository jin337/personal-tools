import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import legacy from '@vitejs/plugin-legacy' // js浏览器兼容
import compression from 'vite-plugin-compression' // 代码压缩

import autoprefixer from 'autoprefixer' // css浏览器前缀
import postcssPresetEnv from 'postcss-preset-env' // css浏览器兼容性
import tailwindcss from 'tailwindcss'

export default defineConfig({
  server: {
    open: true,
    port: 8090,
    host: '0.0.0.0',
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer(), postcssPresetEnv()],
    },
  },
  resolve: {
    alias: {
      src: '/src',
    },
  },
  plugins: [
    react(),
    compression({ threshold: 10240 }),
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
  ],
  build: {
    chunkSizeWarningLimit: 10240,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/chunks/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks: {
          'chunk-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
