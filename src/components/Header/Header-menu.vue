<template lang="pug">
  .header-menu
    .header-menu__close(@click="$emit('closeMenu')")
    nav.header-menu__nav
      a.header-menu__nav-link(v-for="link in info" :href="link.url" v-html="link.text")
        //- Uncomment directive in main.js for scroll to blocks
           add v-scroll-to="link.url" to element
</template>

<script>
export default {
  name: 'Header-menu',
  props: {
    // info example in src/data/template/header.json
    info: {
      type: Array,
      required: true,
      default: null,
    },
  },
};
</script>

<style scoped lang="scss">
.header-menu {
  position: absolute;
  top: calc(100% + 10px);
  max-width: calc(100% - 40px);
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow: hidden;
  box-shadow: 0 10px 10px -5px rgba($black, 0.15);
  background-color: $white;
  @include flex(flex, false, center);

  @include breakpoint(sm) {
    max-width: rem(660);
  }

  &__close {
    position: absolute;
    top: rem(17);
    right: rem(8);
    height: rem(14);
    width: rem(14);
    cursor: pointer;
    z-index: 3;

    @include hover() {
      &::before,
      &::after {
        background-color: $lifehacker;
      }
    }

    @include breakpoint(sm) {
      right: rem(17);
    }

    @include breakpoint(lg) {
      right: rem(20);
    }

    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 6px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: $black;

      @include breakpoint(lg) {
        transition: background-color $ease;
      }
    }

    &::before {
      transform: rotate(-45deg);
    }

    &::after {
      transform: rotate(45deg);
    }
  }

  &__nav {
    @include flex(flex, flex-start, false, column);
    padding: rem(30) 3px rem(30) rem(12);
    position: relative;
    z-index: 2;

    @include breakpoint(sm) {
      padding: rem(50) 3px rem(50) rem(12);
    }
  }

  &__nav-link {
    @include fs(14, rem(26), 500);
    cursor: pointer;
    color: $black;

    @include hover() {
      color: $lifehacker;
    }

    @include breakpoint(lg) {
      transition: color $ease;
    }

    &:not(:last-of-type) {
      margin-bottom: rem(10);
    }
  }
}
</style>
