// webpack.renderer.config.js
const rules = require('./webpack.rules');
module.exports = {
  module: {
    rules: rules,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
};
