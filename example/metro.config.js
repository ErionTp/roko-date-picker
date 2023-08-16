module.exports = {
  resolver: {
    extraNodeModules: {
      react: require.resolve('react'),
      'react-native': require.resolve('react-native'),
      // any other duplicated packages can be added here
    },
  },
};
