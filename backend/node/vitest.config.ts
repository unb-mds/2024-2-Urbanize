import { defineConfig } from 'vitest/config'

// configurando o vitest com os paths @/nome_arquivo do ts
export default defineConfig({
  test: {
    root: './',
    globals: true
  }
})