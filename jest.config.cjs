module.exports = {
    // Your Jest configuration options go here
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom'
  };