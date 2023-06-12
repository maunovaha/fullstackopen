const path = require('path');
const webpack = require('webpack');

const config = (env, argv) => {
  const backend_url = argv.mode === 'production'
    ? 'https://notes2023.fly.dev/api/notes'
    : 'http://localhost:3001/notes';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    // Configures webpack-dev-server to run on port 3000; In addition, there is a line:
    // "start": "webpack serve --mode=development" set in the package.json file.
    devServer: {
      static: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000
    },
    // Generates source map so that viewing js errors from developer console shows where 
    // the error occured in our own code (before transpiling) - makes debugging easier.
    devtool: 'source-map',
    module: {
      // Defining loaders, like babel-loader, is necessary so that we are able to tell webpack
      // how files should be processed before bundling. E.g. Webpack understands only js,
      // and our App.js contains JSX (react) code so we need to define a loader.
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        WB_BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  };
};

module.exports = config;