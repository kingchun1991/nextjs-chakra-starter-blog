/** @type {import('@commitlint/types').UserConfig} */
const CommitLintConfiguration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // add your own scope here if needed
    'scope-enum': [
      2,
      'always',
      [
        'components',
        'layout',
        'pages',
        'styles',
        'utils',
        'types',
        'security',
        'deps',
      ],
    ],
    'scope-case': [2, 'always', 'kebab-case'],
  },
};

module.exports = CommitLintConfiguration;
