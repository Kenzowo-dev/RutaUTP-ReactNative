const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    '@': path.resolve(__dirname, '.'),
    '@/components': path.resolve(__dirname, 'src/shared/components'),
    '@/constants': path.resolve(__dirname, 'src/shared/constants'),
    '@/hooks': path.resolve(__dirname, 'src/shared/hooks'),
    '@/types': path.resolve(__dirname, 'src/shared/types'),
    '@/app': path.resolve(__dirname, 'app'),
    '@/features': path.resolve(__dirname, 'src/features'),
    '@/core': path.resolve(__dirname, 'src/core'),
    '@/data': path.resolve(__dirname, 'src/data'),
    '@/shared': path.resolve(__dirname, 'src/shared'),
  },
};

module.exports = config;
