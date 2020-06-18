const Dotenv = require('dotenv-webpack');

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new Dotenv({
        path: './.env',
        systemvars: true,
        silent: true,
      }),
    ],
  },
  devServer: {
    clientLogLevel: 'info',
    watchOptions: {
        poll: true
    }
}
};
