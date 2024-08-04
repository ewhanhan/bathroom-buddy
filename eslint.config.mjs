import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu({
  formatters: true,
  react: true,
  typescript: true,
  stylistic: true,
  rules: {
    'node/prefer-global/process': 'off',
  },
}, ...compat.config({
  extends: [
    'plugin:@next/next/core-web-vitals',
    'plugin:@next/next/recommended',
    'plugin:tailwindcss/recommended',
  ],
}))
