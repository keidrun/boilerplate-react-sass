const BROWSERS = ['last 2 versions'];

module.exports = {
  plugins: {
    stylelint: true,
    autoprefixer: { browsers: BROWSERS },
    'postcss-sorting': true,
    'postcss-reporter': {
      clearMessages: true,
      throwError: true,
    },
  },
};
