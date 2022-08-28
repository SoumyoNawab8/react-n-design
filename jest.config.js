/** @type {import('jest').Config} */
const config = {
    verbose: true,
    moduleNameMapper: {
        "^.+\\.(css|less|scss)$": "identity-obj-proxy"
      }
    
  };
  
  module.exports = config;