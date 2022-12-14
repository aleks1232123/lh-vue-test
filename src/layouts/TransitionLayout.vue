<template>
  <transition :name="name" :mode="mode">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'TransitionLayout',
  props: {
    name: {
      type: String,
      default: 'fade',
    },
    mode: {
      type: String,
      default: 'out-in',
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-duration ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-top-enter-active,
.fade-top-leave-active {
  transition: opacity $transition-duration ease-in-out, transform $transition-duration ease-in-out;
  transform: translateY(0);
  will-change: transform, opacity;
}
.fade-top-enter,
.fade-top-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.fade-bottom-enter-active,
.fade-bottom-leave-active {
  transition: opacity $transition-duration ease-in-out, transform $transition-duration ease-in-out;
  transform: translateY(0);
  will-change: transform, opacity;
}
.fade-bottom-enter,
.fade-bottom-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.fade-left-enter-active,
.fade-left-leave-active {
  transition: opacity $transition-duration ease-in-out, transform $transition-duration ease-in-out;
  transform: translateX(0);
  will-change: transform, opacity;
}
.fade-left-enter,
.fade-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.fade-right-enter-active,
.fade-right-leave-active {
  transition: opacity $transition-duration ease-in-out, transform $transition-duration ease-in-out;
  transform: translateX(0);
  will-change: transform, opacity;
}
.fade-right-enter,
.fade-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
