export default {
  '*.{js,jsx,ts,tsx,mjs}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'pnpm run check-types',
}
