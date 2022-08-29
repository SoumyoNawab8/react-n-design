/** @type {import('jest').Config} */
const config = {
    moduleNameMapper: {
        "^.+\\.(css|less|scss)$": "identity-obj-proxy"
      },
      setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"]
  };
  
  module.exports = config;