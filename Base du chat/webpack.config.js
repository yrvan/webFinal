const path = require('path');

module.exports = {
  entry: {
		index : './client/src/page-index.js',
		chat : './client/src/page-chat.js',
		register : './client/src/page-register.js'
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'client/dist'),
  },
};
