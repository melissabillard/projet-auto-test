const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    ...tsjPreset.transform,
    "^.+\\.jsx?$": "babel-jest"
  }
};
