class Animate {
  constructor(os) {
    require('./animate.scss');

    const defaultOptions = {
      activeClass: 'animate',
      threshold: 0.25,
      backwards: true,
      keepActive: false,
    };

    this.os = { ...defaultOptions, ...os };
    this.elements = [];

    window.addEventListener('scroll', this.scrollHandle.bind(this));
  }

  scrollHandle() {
    this.elements.forEach((el) => {
      if (el.anim && el.anim.state !== 'end') {
        this.animate(el);
      }
    });
  }

  init(el, binding) {
    const { value, modifiers } = binding;
    const { animateClass, activeClass } = this.os;
    const mods = this.constructor.isObjectNotEmpty(modifiers);
    el.anim = {
      name: value || Object.keys(mods)[0],
      classes: new Set([animateClass, activeClass]),
      state: 'init',
      mods,
    };

    if (typeof value === 'number') {
      const [firstMod, ...other] = Object.keys(el.anim.mods);
      el.anim.name = firstMod;
      delete el.anim.mods[firstMod];
      el.anim.mods[other[other.length - 1]] = value;
    }

    if (typeof value === 'object') {
      el.anim.name = value.name || Object.keys(el.anim.mods)[0];
      delete value.name;
      el.anim.mods = this.constructor.isObjectNotEmpty(value);
    }

    el.setAttribute('data-anim', el.anim.name);

    setTimeout(this.animate.bind(this, el), 0);
  }

  animate(el) {
    const self = this.constructor;
    const {
      activeClass,
      threshold,
      backwards,
      keepActive,
    } = this.os;

    const shouldRemoveActive = !el.anim.mods.keepActive && !keepActive;
    const elThreshold = el.anim.mods?.threshold || threshold;
    const isElementInViewport = self.isElementInViewport(el, +(elThreshold), backwards);

    if (isElementInViewport) {
      el.anim.state = !shouldRemoveActive ? 'endless' : 'end';
      let delay = el.anim.mods?.delay || false;

      if (delay) {
        delay = +(delay) * 1000;

        setTimeout(() => {
          el.classList.add(activeClass);
        }, delay);
      } else {
        el.classList.add(activeClass);
      }

      if (shouldRemoveActive) {
        const timeoutTime = self.getAnimDuration(el) + (delay || 0);

        // remove active class and animation attribute after animation end
        setTimeout(() => {
          el.classList.remove(this.os.activeClass);
          el.removeAttribute('data-anim');
        }, timeoutTime);
      }
    } else if (!isElementInViewport && shouldRemoveActive) {
      el.classList.remove(this.os.activeClass);
    }
  }

  static isElementInViewport(el, threshold, backwards) {
    const elRect = el.getBoundingClientRect();
    // calculate element transform offset
    const elTranslateY = this.getComputedTranslateY(el);
    let offsetY = 0;
    if (elTranslateY) {
      offsetY = elTranslateY < 0 ? Math.abs(elTranslateY) : -(elTranslateY);
    }
    // calculate position from element.top, offsetY, and height with threshold param
    const elPos = elRect.top + offsetY
      + (elRect.height * threshold);

    return (backwards ? elPos > 0 : true) && elPos < window.innerHeight;
  }

  static getAnimDuration(el) {
    const elStyles = window.getComputedStyle(el);
    const isAnimation = elStyles.getPropertyValue('animation-name') !== 'none';
    const duration = isAnimation ? elStyles.getPropertyValue('animation-duration')
      : elStyles.getPropertyValue('transition-duration');

    return (+(duration.slice(0, -1)) * 1000) + 50;
  }

  static isObjectNotEmpty(obj) {
    return Object.keys(obj).length === 0 ? false : obj;
  }

  static getComputedTranslateY(el) {
    if (!window.getComputedStyle) return false;
    const { transform } = getComputedStyle(el);
    if (transform === 'none') return false;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) {
      return parseFloat(mat[1].split(', ')[13]);
    }
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
  }
}

export default {
  install(Vue, os = null) {
    const anim = new Animate(os);

    Vue.directive('animate', {
      bind(el, binding) {
        anim.elements.push(el);

        anim.init(el, binding);
      },
      unbind(el) {
        anim.destroy(el);
      },
    });
  },
};
