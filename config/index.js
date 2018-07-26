const devConfig = require('./config.dev');
const prodConfig = require('./config.prod');

const type = process.env.NODE_ENV;
const configs = {
  development: devConfig,
  production: prodConfig
};

module.exports = {
  config: configs[type] || configs.development,
};