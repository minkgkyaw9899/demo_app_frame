import { defineConfig } from 'tsup'

export default defineConfig({
    clean: true,
    dts: true,
    entry: ['src/app.ts'],
    format: ['cjs', 'esm'],
    minify: true,
    sourcemap: true,
})
