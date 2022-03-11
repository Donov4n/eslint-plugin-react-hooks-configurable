'use strict';

const coreRules = require('eslint-plugin-react-hooks').rules;

module.exports = {
    configs: {
        recommended: {
            plugins: ['react-hooks-configurable'],
            rules: {
                'react-hooks-configurable/rules-of-hooks': 'error',
                'react-hooks-configurable/exhaustive-deps': 'warn',
            },
        },
    },
    rules: {
        'exhaustive-deps': require('./rules/exhaustive-deps'),
        'rules-of-hooks': coreRules['rules-of-hooks'],
    },
};
