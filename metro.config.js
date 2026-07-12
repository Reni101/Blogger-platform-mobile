const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      // react-native-svg points "react-native" field to src/index.ts, which Metro
      // can fail to resolve during release bundling. Use the prebuilt lib entry.
      if (moduleName === 'react-native-svg') {
        return {
          filePath: path.resolve(
            __dirname,
            'node_modules/react-native-svg/lib/commonjs/index.js',
          ),
          type: 'sourceFile',
        };
      }

      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
