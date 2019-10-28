/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    babelTransformerPath: require.resolve(
      'react-native-typescript-transformer',
    ),
  },
  resolver: {
    extraNodeModules: {
      '@/common': path.resolve(__dirname, './src/common'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/page': path.resolve(__dirname, './src/page'),
      '@/static': path.resolve(__dirname, './src/static'),
    },
  },
};
