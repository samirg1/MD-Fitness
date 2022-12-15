module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/src/tests/__mocks__/styleMock.ts",
    },
    testEnvironment: "jsdom",
};
