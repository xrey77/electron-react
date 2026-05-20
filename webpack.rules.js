// webpack.rules.js
module.exports = [
    {
      test: /\.node$/,
      use: 'node-loader',
    },
    {
      test: /\.(m?js|node)$/,
      parser: { amd: false },
      use: {
        loader: '@vercel/webpack-asset-relocator-loader',
        options: {
          outputAssetBase: 'native_modules',
        },
      },
    },
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|\.webpack)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
    },
    {
        test: /\.[jt]sx?$/, // Matches .js, .jsx, .ts, .tsx
        exclude: /(node_modules|\.webpack)/,
        use: {
          loader: 'babel-loader',
          options: {
            // Add @babel/preset-typescript here
            presets: [
              '@babel/preset-react',
              '@babel/preset-env',
              '@babel/preset-typescript'
            ],
          },
        },
      },    
  ];
  