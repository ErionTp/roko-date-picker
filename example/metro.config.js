const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          return path.join(process.cwd(), `node_modules/${name}`);
        },
      }
    ),
  },
  watchFolders: [path.resolve(__dirname, '..', 'src')],
};
