module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '~': './',
            '@colors': './src/theme/colors',
            '@theme': './src/theme',
            '@hooks': './src/hooks',
            '@components': './src/components',
            '@providers': './src/providers',
            '@services': './src/services',
            '@utils': './src/utils',
            '@assets': './assets',
          },
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
        },
      ],
    ],
  };
};
