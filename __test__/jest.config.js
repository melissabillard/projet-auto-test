const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    ...tsjPreset.transform,
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
