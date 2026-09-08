import { defineConfig } from 'eslint/config'
import pluginCypress from 'eslint-plugin-cypress'

export default defineConfig([
  {
    files: ['cypress/**/*.js'],
    extends: [pluginCypress.configs.recommended],
  },
])
