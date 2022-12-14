export default {
  /* eslint-disable */
  bind(el, binding) {
    if (typeof binding.value === 'function') {
      let width = 0;
      let height = 0;

      el.__ResizeWindow__ = {
        callback(event) {
          const { arg } = binding;

          switch (arg) {
            case 'width':
              if (width !== window.innerWidth) {
                binding.value(event, el);
                width = window.innerWidth;
              }
              break;
            case 'height':
              if (height !== window.innerHeight) {
                binding.value(event, el);
                height = window.innerHeight;
              }
              break;
            default:
              binding.value(event, el);
              break;
          }
        },
        width,
        height,
      };
      window.addEventListener('resize', el.__ResizeWindow__.callback);
    }
  },
  unbind(el) {
    if (el.__ResizeWindow__ && el.__ResizeWindow__.callback) {
      window.removeEventListener('resize', el.__ResizeWindow__.callback);
      delete el.__ResizeWindow__;
    }
  },
};
/* eslint-enable */
