import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from "path"
import requireTransform from 'vite-plugin-require-transform';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), requireTransform({
    fileRegex: /.js$|.vue$/
  }),],
  resolve: {
    alias: {
      '@': join(__dirname, "src")
    }
  },
  base: './'
})
