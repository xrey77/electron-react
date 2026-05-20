import swcPlugin from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'electron-vite'

export default defineConfig({
  main: {
    plugins: [
    ],
    esbuild: {
      keepNames: true
    },      
    build: {
      minify: 'esbuild',
      target: 'node22',
      rollupOptions: {
        external: ['@scure/base']
      },
      commonjsOptions: {
        include: [/node_modules\/@scure\/base/, /node_modules\/@otplib/]
      }      
    },    
  },
  preload: {
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [swcPlugin()]
  }
})
