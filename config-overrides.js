const path = require('path');

module.exports = {
  webpack: function (config, env) {
    const forkTsCheckerWebpackPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name == 'ForkTsCheckerWebpackPlugin'
    );

    if (forkTsCheckerWebpackPlugin) {
      forkTsCheckerWebpackPlugin.tsconfig = path.resolve('./tsconfig.json');
    }

    // enable alias import
    config.resolve.alias['~'] = path.resolve('./src');

    return config;
  },
  jest: function (config) {
    config.moduleNameMapper['^~/(.*)$'] = '<rootDir>/src/$1';

    return config;
  },
  paths: (paths, env) => {
    const overridePaths = {
      ...paths,
      appTsConfig: path.resolve('./tsconfig-react-scripts.json'),
    };

    if (env === 'test') {
      const pathsConfigPath = path.resolve('node_modules/react-scripts/config/paths.js');
      // override paths in memory
      require.cache[require.resolve(pathsConfigPath)].exports = overridePaths;
    }

    return overridePaths;
  },
};