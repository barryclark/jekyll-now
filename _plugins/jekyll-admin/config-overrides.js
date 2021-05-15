const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer');

module.exports = function override(config, env) {
  if (env === 'production') {
    config = rewireWebpackBundleAnalyzer(config, env, {
      analyzerMode: 'disabled',
      reportFilename: 'report.html',
    });
  }

  return config;
};
