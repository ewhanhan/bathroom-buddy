import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu({
  formatters: true,
  react: true,
  stylistic: true,
  rules: {
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
      },
    ],

    'arrow-body-style': 'off',
    'curly': ['error', 'all'],
    'func-names': 'error',
    'no-console': 'warn',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'error',
    'no-unused-vars': 'error',
    'no-use-before-define': 'off',
    'node/prefer-global/process': 'off',
    'nonblock-statement-body-position': 'error',
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'react-hooks/rules-of-hooks': 'error',
    'import/no-default-export': 'error',
  },

  typescript: {
    parserOptions: {
      project: './tsconfig.json',
    },
  },
}, ...compat.config({
  overrides: [
    // Next.js needs default exports for pages and API points
    {
      files: ['src/app/**/*.{ts,tsx}', '**/*.mjs'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  extends: [
    'plugin:@next/next/core-web-vitals',
    'plugin:@next/next/recommended',
    'plugin:tailwindcss/recommended',
  ],
}))
