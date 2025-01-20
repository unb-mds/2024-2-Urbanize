import { defineConfig } from 'vitest/config'
import path from 'path'

// configurando o vitest com os paths @/nome_arquivo do ts
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'node',
    globals: true,
  }
})