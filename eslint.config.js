const reactPlugin = require('eslint-plugin-react');
const reactNativePlugin = require('eslint-plugin-react-native');
const babelParser = require('@babel/eslint-parser');
const jestPlugin = require('eslint-plugin-jest');

module.exports = [
  {
    files: ['**/*.js', '**/*.jsx'], // Apply to JavaScript and JSX files
    languageOptions: {
      parser: babelParser, // Use the babel parser directly
      parserOptions: {
        ecmaVersion: 2021, // ECMAScript 2021
        sourceType: 'module', // Use ES Modules
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
      globals: {
        __DEV__: true, // React Native specific global
        fetch: true, // Global fetch for React Native
        navigator: true, // Global navigator for React Native
        requestAnimationFrame: true, // For animations
        cancelAnimationFrame: true, // For animations
        XMLHttpRequest: true, // For network requests
      },
    },
    plugins: {
      react: reactPlugin, // React plugin
      'react-native': reactNativePlugin, // React Native plugin
      jest: jestPlugin,
    },
    rules: {
      // React plugin recommended rules
      ...reactPlugin.configs.recommended.rules,
      // Custom rules
      'react/prop-types': 'off', // Disable prop-types rule
      'react/react-in-jsx-scope': 'off', // Disable React in JSX scope rule (for React 17+)
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
  },
];
