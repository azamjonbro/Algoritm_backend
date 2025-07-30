module.exports = {
 testEnvironment: 'node',
 testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
 collectCoverage: true,
 coverageDirectory: 'coverage',
 coverageReporters: ['json', 'lcov', 'text', 'clover'],
 verbose: true,
};