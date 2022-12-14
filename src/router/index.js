import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import generatedRoutes from 'vue-auto-routing';

Vue.use(VueRouter);

const routes = generatedRoutes.map((route) => {
  route.path = route.path.replace(/Index/, '');
  return route;
});

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL.replace('/dist', ''),
  routes,
});
