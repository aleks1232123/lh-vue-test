/* eslint-disable */
export default {
  window: {
    bind(el, binding) {
      if (typeof binding.value === 'function') {
        el.__callbackScrollWindow__ = (event) => {
          binding.value(event, el);
        };
        window.addEventListener('scroll', el.__callbackScrollWindow__);
      }
    },
    unbind(el) {
      if (el.__callbackScrollWindow__) {
        window.removeEventListener('scroll', el.__callbackScrollWindow__);
      }
    },
  },
  element: {
    bind(el, binding) {
      if (typeof binding.value === 'function') {
        el.__callbackScrollWindow__ = (event) => {
          binding.value(event, el);
        };
        el.addEventListener('scroll', el.__callbackScrollWindow__);
      }
    },
    unbind(el) {
      if (el.__callbackScrollWindow__) {
        el.removeEventListener('scroll', el.__callbackScrollWindow__);
      }
    },
  },
};
/* eslint-enable */
