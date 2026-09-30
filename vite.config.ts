import { defineConfig } from 'vite-plus';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],

    // Vitest 测试配置
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
    },

    // pre-commit hook
    staged: {
        '*': 'vp check --fix',
    },

    // Oxfmt 配置（接管 Prettier）
    fmt: {
        singleQuote: true, // singleQuote: true
        trailingComma: 'es5', // trailingComma: 'es5'
        printWidth: 120, // printWidth: 120
        tabWidth: 4, // tabWidth: 4
        arrowParens: 'avoid', // arrowParens: 'avoid'
        // semi 默认 true（Prettier 默认值，原配置未指定）
        // tabs 默认 false（即用空格）
    },

    // Oxlint 配置
    lint: {
        ignorePatterns: ['node_modules', 'dist', 'public'],

        env: {
            browser: true,
            es2024: true,
            node: true,
        },

        globals: {
            wx: 'readonly',
        },

        settings: {
            react: { version: '19' },
        },

        plugins: ['react', 'import', 'typescript', 'unicorn'],

        categories: {
            correctness: 'error',
            suspicious: 'warn',
        },

        // vite-plus 自带规则
        jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],

        options: { typeAware: true, typeCheck: true },

        rules: {
            'vite-plus/prefer-vite-plus-imports': 'error',

            'no-console': 'error',

            // jsx-runtime 模式（无需手动 import React）
            'react/react-in-jsx-scope': 'off',

            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'off',

            'typescript/no-explicit-any': 'off',
            'typescript/no-unused-expressions': 'off',
            'typescript/no-unused-vars': 'warn',

            'import/no-duplicates': 'error',
            // ⚠️ import/order 当前 oxlint 尚未实现 pathGroups，
            //    退而求其次使用内置 sort-imports（不支持自定义分组）。
            //    如必须保留原分组顺序，建议保留 ESLint 仅跑 import/order。
            'sort-imports': [
                'warn',
                {
                    ignoreCase: true,
                    ignoreDeclarationSort: false,
                    ignoreMemberSort: false,
                    memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                },
            ],
        },

        overrides: [
            {
                files: ['**/*.{js,mjs,cjs,jsx}'],
                rules: {
                    'typescript/no-unused-vars': 'off',
                },
            },
        ],
    },
});
