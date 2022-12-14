const path = require('path');
const SvgStorePlugin = require('external-svg-sprite-loader');
const routes = require('./utils/routes.js');
const productionMode = process.env.NODE_ENV === 'production';
const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin');

const resolve = (dir) => (
  path.resolve(__dirname, dir)
);

module.exports = {
  publicPath: !process.env.localBuild && productionMode
    ? `/special/${process.env.CI_PROJECT_NAME}/dist/`
    : '/',
  assetsDir: 'assets',
  lintOnSave: !productionMode,
  productionSourceMap: false,
  css: {
    extract:
      productionMode
      ? {
        hmr: process.env.NODE_ENV === 'development',
        filename: 'assets/css/[name]-[contenthash].css',
        chunkFilename: 'assets/css/[id].css',
        }
      : false,
  },
  chainWebpack: config => {
    function addLoader(params) {
      params.types.forEach(type => {
        config.module.rule(params.rule).oneOf(type)
          .use(params.loader)
            .loader(params.loader)
              .options(params.options)
          .end();
      });
    }

    config.plugins.delete('prefetch');
    config.module.rules.delete('svg');
    config.module.rule('svg')
      .test(/\.svg$/)
      .include
        .add(resolve('src/assets/svg/'))
      .end()
      .exclude
        .add(resolve('src/assets/svg-sprites/'))
      .end()
      .use('babel-loader')
        .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
        .loader('vue-svg-loader')
          .options({
            svgo: {
              plugins: [
                {removeDoctype: true},
                {removeComments: true},
                {removeViewBox: false},
                {cleanupIDs: false},
                {collapseGroups: false},
                {removeEmptyContainers: false},
                {convertShapeToPath: false}
              ]
            }
          })
      .end();
    config.module.rule('svg-sprites')
      .test(/\.svg$/)
      .include
        .add(resolve('src/assets/svg-sprites/'))
      .end()
      .use('SvgStorePlugin')
        .loader(SvgStorePlugin.loader)
          .options({
            iconName: '[name]-usage',
            name: 'assets/img/sprite.svg',
          })
      .end();
    config.module.rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .include
        .add(resolve('src/assets/images/'))
      .end();
    config.module.rule('fonts')
      .test(/\.(woff(2)?|svg)(\?.*)?$/i)
      .include
        .add(resolve('src/assets/fonts/'))
      .end();
    config.module.rule('json')
      .test(/\.json$/)
      .use(resolve('utils/split-json-loader.js'))
        .loader(resolve('utils/split-json-loader.js'))
        .options({
          dir: resolve('src/data')
        })
      .end();
    addLoader({
      types: ['pug-vue', 'pug-template'],
      rule: 'pug',
      loader: 'pug-lint-loader',
      options: require('./.pug-lintrc.js')
    });
    addLoader({
      types: ['vue-modules', 'vue', 'normal-modules', 'normal'],
      rule: 'scss',
      loader: 'sass-resources-loader',
      options: {
        includePath: resolve('src'),
        resources: './src/scss/_common.scss',
      }
    });

    config.optimization.splitChunks({
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    });
  },
  configureWebpack: config => {
    config.plugins.push(
      new SvgStorePlugin({
        sprite: {
          startX: 10,
          startY: 10,
          deltaX: 20,
          deltaY: 20,
          iconHeight: 20,
        },
        prefix: '',
        suffix: ''
      }),
      new VueAutoRoutingPlugin({
        pages: 'src/pages',
        importPrefix: '@/pages/'
      }),
    );
  },
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: routes,
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      postProcess: route => {
        route.html = route.html
          .replace(/<script (.*?)>/g, '<script $1 defer>')
          .replace('id="app"', 'id="app" data-server-rendered="true"');
        return route;
      },
    },
  },
  devServer: {
    before(app) {
      app.post('*', (req, res) => {
        res.send(req.originalUrl);
      });
    },
  }
};
