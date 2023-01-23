const { readFileSync } = require("fs");
const { resolve } = require("path");

const { BannerPlugin, EnvironmentPlugin } = require("webpack");
const WorkerPlugin = require('worker-plugin');

const { merge } = require("webpack-merge");
const { argv: { mode } } = require("yargs");

const { name: filename, version } = require("./package.json");

const banner = readFileSync(resolve("./_includes/header.txt"), "utf-8");

const ASSET_PATH = '/assets/js/'

const envConfig = (() => {
  switch (mode) {
    case "production":
      return {
        devtool: false,
        plugins: [
          new WorkerPlugin({ globalObject: 'self' }),
          new BannerPlugin({ banner, raw: true }),
          new EnvironmentPlugin({
            DEBUG: false,
            ASSET_PATH,
            GET_CLAPS_API: 'https://worker.getclaps.app',
          }),
        ],
      };

    default:
      return {
        devtool: "source-map",
        plugins: [
          new WorkerPlugin({ globalObject: 'self' }),
          new EnvironmentPlugin({
            DEBUG: true,
            ASSET_PATH,
            GET_CLAPS_API: 'https://worker.getclaps.dev',
          }),
        ],
      };
  }
})()

const sharedPreset = {
  modules: false,
  useBuiltIns: "entry",
  corejs: 2,
}

const babelPresetLegacy = {
  babelrc: false,
  presets: [
    [
      "@babel/preset-env",
      {
        ...sharedPreset,
        targets: {
          ie: "11",
        },
      },
    ],
  ],
}

const babelPresetModern = {
  babelrc: false,
  presets: [
    [
      "@babel/preset-env",
      {
        ...sharedPreset,
        targets: {
          esmodules: true,
        },
      },
    ],
  ],
}

const sharedConfig = {
  entry: resolve("./_js/src/entry.js"),
  output: {
    path: resolve("./assets/js"),
    publicPath: ASSET_PATH,
  },
  resolve: {
    modules: [
      resolve("./_js"),
      resolve("./node_modules"),
      ...process.env.NODE_PATH ? [resolve(process.env.NODE_PATH)] : [],
    ],
    extensions: [".json", ".js"],
    symlinks: true,
  },
  optimization: {
    splitChunks: {
      // chunks: 'all',
      // minSize: 30000,
      // maxSize: 0,
      // minChunks: 1,
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      // automaticNameDelimiter: '~',
      // automaticNameMaxLength: 30,
      // name: true,
      // cacheGroups: {
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10
      //   },
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true
      //   }
      // }
    }
  }
}

module.exports = [
  merge(
    envConfig,
    sharedConfig,
    {
      output: {
        filename: `${filename}-${version}.js`,
        chunkFilename: `[name]-${filename}-${version}.js`,
      },
      module: {
        rules: [{
          test: /(\.jsx|\.js)$/,
          loader: "babel-loader",
          options: babelPresetModern,
        }, {
          test: /modernizr-custom/,
          use: 'null-loader'
        }, {
          test: /@webcomponents\/(template|url|webcomponents-platform)/,
          use: 'null-loader'
        }],
      },
    },
  ),
  merge(
    envConfig,
    sharedConfig,
    {
      output: {
        filename: `LEGACY-${filename}-${version}.js`,
        chunkFilename: `LEGACY-[name]-${filename}-${version}.js`
      },
      module: {
        rules: [{
          test: /(\.jsx|\.js)$/,
          loader: "babel-loader",
          options: babelPresetLegacy,
        }],
      },
    },
  ),
];
