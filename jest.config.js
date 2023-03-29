export default {
  preset: "ts-jest/presets/js-with-babel-esm",
  transformIgnorePatterns: ["/node_modules/(?!lodash-es)"],
  transform: {
    "node_modules/three/examples/.+.(j|t)sx?$": "ts-jest",
  },
  testEnvironment: "jsdom", // or jest-environment-jsdom
};

