import eslint from '@eslint/js';
import vue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
    {
        ignores: ['dist/', 'node_modules/'],
    },

    eslint.configs.recommended,

    ...tseslint.configs.recommended,

    ...vue.configs['flat/recommended'],

    {
        files: ['**/*.ts', '**/*.vue'],

        languageOptions: {
            globals: {
                ...globals.browser,
            },

            parserOptions: {
                parser: tseslint.parser,
            },
        },
    },

    prettier
);
