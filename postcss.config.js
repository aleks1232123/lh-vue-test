module.exports = {
  parser: 'postcss-scss',
  plugins: {
    'autoprefixer': {},
    'postcss-url': {},
    'css-mqpacker': {
      sort: true,
    },
  }
};
