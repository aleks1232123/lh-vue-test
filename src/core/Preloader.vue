<template lang="pug">
  .preloader
    .preloader__wrap
      .preloader__dot(v-for="n in 5" :class="`preloader__dot--${n}`")
</template>

<script>
export default {
  name: 'Preloader',
};
</script>

<style scoped lang="scss">
  $parent: preloader;
  $d: rem(32);
  $t: 1.5s;

  @include block($parent) {
    position: fixed;
    z-index: 1000;
    background-color: $white;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include flex(flex, center, center);

    @include element($parent, 'dot') {
      background-color: $lifehacker;

      &, &:after {
        display: inline-block;
        width: $d;
        height: $d;
        border-radius: 50%;
      }

      &:after {
        background-color: $white;
        content: '';
      }

      @each $num in (1, 2, 3, 4, 5) {
        &--#{$num} {
          $calc: ($num/5 - 1) * $t;
          animation: a #{$t} #{$calc} infinite;

          &::after {
            animation: a #{$t} #{0.3 + $calc} infinite;
          }
        }
      }
    }
  }

  @keyframes a {
    0%, 50% {
      transform: scale(0)
    }
  }
</style>
