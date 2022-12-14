import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';

import loadAsset from '@/utils/loadAsset';
import debounce from '@/utils/debounce';

/*
-- Uncomment if necessary ---

import api from '@/utils/api';
import throttle from '@/utils/throttle';
import random from '@/utils/random';
import shuffle from '@/utils/shuffle';

import Scroll from '@/directives/scrolls';
import WindowResize from '@/directives/windowResize';
*/
import Animate from '@/directives/animate';

/*
import router from './router';
import store from './store';

import plural from '@/filters/plural.js';
*/

import './scss/_base.scss';
import App from './App.vue';

const SocialSharing = require('@/utils/share');

/*
-- Uncomment if necessary ---

const VueScrollTo = require('vue-scrollto');
Vue.directive('window-scroll', Scroll.window);
Vue.directive('element-scroll', Scroll.element);
Vue.directive('window-resize', WindowResize);

Vue.filter('plural', plural);
*/

Vue.use(Animate);

/*
Vue.use(VueScrollTo, {
  container: 'body',
  duration: 1000,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
  x: false,
  y: true,
});
*/

Vue.use(VueLazyLoad, {
  preLoad: 1.7,
});
Vue.use(SocialSharing);

Vue.config.productionTip = false;
Vue.prototype.$utils = {
  // api,
  // throttle,
  debounce,
  loadAsset,
  loadJSON(filename) {
    return Object.freeze(require(`@/data/${filename}`));
  },
};

// eslint-disable-next-line no-unused-vars
const vm = new Vue({
  // router,
  // store,
  render: (h) => h(App),
  // Для функционала модального окна у ссылок
  // data: {
  //   isVisibleModal: null,
  //   modalText: null,
  //   modalLink: null,
  //   modalLeftPosition: 0,
  //   modalTopPosition: 0,
  //   currentTarget: null,
  // },
  mounted: () => document.dispatchEvent(new Event('x-app-rendered')),
}).$mount('#app');

// Отслеживание клика по ссылкам с модальным окном.
// Для всех ссылок с модальным окном добавлять класс modal-link.
// const modalLinks = document.querySelectorAll('.modal-link');
// document.addEventListener('click', (event) => {
//   if (event.target.className === 'modal-link') {
//     modalLinks.forEach((modalLink) => {
//       modalLink.classList.remove('modal-link--active');
//     });
//
//     setTimeout(() => {
//       event.target.classList.add('modal-link--active');
//       vm.$root.currentTarget = event.target.dataset.modalId;
//       vm.$root.isVisibleModal = true;
//       vm.$root.modalText = event.target.dataset.modalText;
//       vm.$root.modalLink = event.target.dataset.modalLink;
//       eslint-disable-next-line max-len
//       vm.$root.modalLeftPosition = window.pageXOffset + event.target.getBoundingClientRect().left;
//       vm.$root.modalTopPosition = window.pageYOffset + event.target.getBoundingClientRect().top;
//     }, 0);
//   }
// });
