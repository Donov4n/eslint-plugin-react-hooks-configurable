'use strict';

const { name, version } = require('./package.json');
const coreRules = require('eslint-plugin-react-hooks').rules;

const plugin = {
  meta: { name, version, },
  rules: {
    'exhaustive-deps': require('./rules/exhaustive-deps'),
    'rules-of-hooks': coreRules['rules-of-hooks'],
  },
};

// - Recommended configs.
const recommendedRules = {
  'react-hooks-configurable/rules-of-hooks': 'error',
  'react-hooks-configurable/exhaustive-deps': 'warn',
};
const flatRecommendedConfig = {
  name: 'react-hooks-configurable/recommended',
  plugins: { 'react-hooks-configurable': plugin },
  rules: recommendedRules,
};
const legacyRecommendedConfig = {
  plugins: ['react-hooks-configurable'],
  rules: recommendedRules,
};

module.exports = {
  ...plugin,
  configs: {
    'recommended-legacy': legacyRecommendedConfig,
    'recommended-latest': flatRecommendedConfig,
    recommended: legacyRecommendedConfig,
  },
};
