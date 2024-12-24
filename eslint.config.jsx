// eslint.config.js
export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      react: require('eslint-plugin-react'),
      reactRefresh: require('eslint-plugin-react-refresh'),
    },
    rules: {
      // Add or modify ESLint rules here
    },
  },
];
