const { readFileSync } = require('fs');
const { resolve } = require('path');

const rxPaths = require('rxjs/_esm5/path-mapping');

const {
  BannerPlugin,
  EnvironmentPlugin,
  optimize: { UglifyJsPlugin, ModuleConcatenationPlugin },
} = require('webpack');

const merge = require('webpack-merge');
const { argv: { env } } = require('yargs');

const { name: filename, version } = require('./package.json');

const banner = readFileSync(resolve('./_includes/header.txt'), 'utf-8');

const flatten = [(a, x) => a.concat(x), []];

function envConfig() {
  switch (env) {
    case 'prod':
      return {
        plugins: [
          new BannerPlugin({ banner, raw: true }),
          new EnvironmentPlugin({ DEBUG: false }),
          new UglifyJsPlugin(),
        ],
      };

    default:
      return {
        devtool: 'source-map',
        plugins: [new EnvironmentPlugin({ DEBUG: true })],
      };
  }
}

module.exports = merge(
  {
    entry: resolve('./_js/src/index.js'),
    output: {
      path: resolve('./assets/js'),
      filename: `${filename}-${version}.js`,
    },
    module: {
      rules: [
        {
          test: /(\.jsx|\.js)$/,
          loader: 'babel-loader',
          options: {
            presets: [['env', { modules: false }]],
            babelrc: false,
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
      ],
    },
    resolve: {
      modules: [
        resolve('./_js'),
        resolve('./node_modules'),
        process.env.NODE_PATH ? resolve(process.env.NODE_PATH) : [],
      ].reduce(...flatten),
      extensions: ['.json', '.js'],
      symlinks: true,
      alias: rxPaths(),
    },
    plugins: [new ModuleConcatenationPlugin()],
  },
  envConfig(),
);
