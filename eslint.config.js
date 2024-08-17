import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default {
  ignores: [
    '**/build/**',
    '**/dist/**',
    '**/public/**',
    '**/node_modules/**',
    'vite-env.d.ts',
    'eslint.config.js',
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
  ],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
