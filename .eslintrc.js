module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    // TypeScript
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    // General
    'operator-linebreak': ['error', 'after'],
    'no-underscore-dangle': 'off',
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'arrow-body-style': 'warn',
    'class-methods-use-this': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-await-in-loop': 'off',
    'no-bitwise': 'warn',
    'consistent-return': 'off',
    'max-len': ['error', {
      code: 120,
      ignoreComments: true
    }],
    'no-console': ['error', {
      allow: ['info', 'warn', 'error', 'group', 'groupEnd']
    }],
    // React
    'react/jsx-fragments': 'off', // Prefer verbose syntax
    'react/jsx-props-no-spreading': 'off', // Spread appropriatly
    'react/prop-types': 'off', // TypeScript
    // Import
    'import/prefer-default-export': 'off',
    'import/order': ['error', {
      groups: [
        ['builtin', 'external', 'internal'],
        ['parent', 'sibling'],
        'index'
      ],
      'newlines-between': 'always-and-inside-groups'
    }]
  }
};