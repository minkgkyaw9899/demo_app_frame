module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          src: './src',
          '@types': './src/@types',
          assets: './src/assets',
          components: './src/components',
          config: './src/config',
          constants: './src/constants',
          features: './src/features',
          hooks: './src/hooks',
          libs: './src/libs',
          navigations: './src/navigations',
          screens: './src/screens',
          services: './src/services',
          utils: './src/utils',
        },
      },
    ],
  ],
}
