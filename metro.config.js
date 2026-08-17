const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    '@': path.resolve(__dirname, '.'),
    '@/components': path.resolve(__dirname, 'components'),
    '@/constants': path.resolve(__dirname, 'constants'),
    '@/hooks': path.resolve(__dirname, 'hooks'),
    '@/types': path.resolve(__dirname, 'types'),
    '@/app': path.resolve(__dirname, 'app'),
  },
};

module.exports = config;
