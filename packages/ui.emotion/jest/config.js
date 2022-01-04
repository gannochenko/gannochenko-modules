module.exports = {
    verbose: true,
    rootDir: '../src',
    setupFiles: ['<rootDir>/../jest/setup.ts'],
    setupFilesAfterEnv: [

        '@testing-library/jest-dom/extend-expect',
        'jest-styled-components',

        '<rootDir>/../jest/extend.js',
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '\\.test\\.tsx?$',
};
