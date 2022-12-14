<template lang="pug">
  .scroll-down-el
    SvgEl.scroll-down-el__text(name="scrollDownElText")
    SvgEl.scroll-down-el__arrow(name="scrollDownElArrow")
</template>

<script>
import SvgEl from '@/core/SvgEl.vue';

export default {
  name: 'ScrollDownEl',
  components: {
    SvgEl,
  },
};
</script>

<style scoped lang="scss">
  .scroll-down-el {
    width: 119.16px;
    height: 113.2px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;

    &__text {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      animation: rotation 15s infinite linear;
    }

    &__arrow {
      width: 12px;
      height: 26px;
      animation: jumping 3s infinite linear;
    }
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes jumping {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0px);
    }
  }
</style>
