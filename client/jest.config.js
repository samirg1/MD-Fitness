module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/src/tests/__mocks__/styleMock.ts",
    },
    testEnvironment: "jsdom",
    collectCoverage: true,
    coverageThreshold: {
        // global: {
        //     branches: 75,
        //     functions: 80,
        //     lines: 80,
        //     statements: -30,
        // },
    },
    verbose: true,
    notify: true,
    notifyMode: "always",
};
