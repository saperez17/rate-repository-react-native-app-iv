// const { getDefaultConfig } = require("metro-config");
// const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();
// exports.resolver = {
//   ...defaultResolver,
//   sourceExts: [
//     ...defaultResolver.sourceExts,
//     ["cjs", "jsx", "js"], //add here ,
    
//   ],
// };

module.exports = {
  transformer: {
      getTransformOptions: async () => ({
          transform: {
              experimentalImportSupport: false,
              inlineRequires: false,
          },
      }),
  },
  resolver: {
      sourceExts: ['cjs','jsx','js', 'json', 'ts', 'tsx']
  }
};