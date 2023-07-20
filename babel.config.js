module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'nativewind/babel',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@config': './src/config',
          '@services': './src/services',
          '@storage': './src/storage',
          '@hooks': './src/hooks',
        },
      },
    ],
  ],
}
