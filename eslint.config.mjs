import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'
import antfu from '@antfu/eslint-config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const gitignorePath = path.resolve(dirname, '.gitignore')

const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8')

const compat = new FlatCompat()

export default antfu({
  formatters: true,
  react: true,
  rules: {
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        classes: true,
        functions: false,
        variables: true,
      },
    ],
    'arrow-body-style': 'off',
    'curly': ['error', 'all'],
    'func-names': 'error',
    'import/no-default-export': 'error',
    'no-console': 'warn',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'error',
    'no-unused-vars': 'error',
    'no-use-before-define': 'off',
    'node/prefer-global/process': 'off',
    'nonblock-statement-body-position': 'error',
    'perfectionist/sort-objects': 'error',
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'react-hooks/rules-of-hooks': 'error',
  },
  stylistic: true,
  typescript: {
    parserOptions: {
      project: './tsconfig.json',
    },
  },
}, ...compat.config({
  extends: [
    'plugin:@next/next/core-web-vitals',
    'plugin:@next/next/recommended',
    'plugin:tailwindcss/recommended',
  ],
  ignorePatterns: gitignoreContent.split('\n').filter(Boolean),
  overrides: [
    {
      files: ['*.config.*', '**/*.mjs'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    // Next.js needs default exports for pages and API points
    {
      files: ['app/**/*.{ts,tsx}'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
}))
