const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  /*publicPath: process.env.NODE_ENV === 'production'
    ? '/vueply/'
    : '/',*/
  configureWebpack: {
    plugins: process.env.NODE_ENV === 'production'
      && process.env.BUNDLE_ANALYZE
      ? [new BundleAnalyzerPlugin()]
      : [],
  },
};
