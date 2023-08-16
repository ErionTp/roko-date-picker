const path = require('path');
const { getDefaultConfig } = require('metro-config');

const defaultConfig = getDefaultConfig.getDefaultValues(__dirname);

module.exports = {
  resolver: {
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => (name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`)),
      }
    ),
  },
  watchFolders: [...defaultConfig.watchFolders, path.resolve(__dirname, '../lib')],
};
