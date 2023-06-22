/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/valid-template-root': 'off',
    'prettier/prettier': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'prefer-const': 'off',
    'vue/no-unused-vars': 'off'
  }
}
