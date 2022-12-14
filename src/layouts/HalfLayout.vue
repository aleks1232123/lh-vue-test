<template lang="pug">
  .half-layout
    //- Uncomment if need this section
      .half-layout__top
        slot(name="top")
    .half-layout__content
      .half-layout__content-side.half-layout__content-side--left
        slot(name="left")
      .half-layout__content-side.half-layout__content-side--right
        slot(name="right")
      .half-layout__bottom
        slot(name="bottom")
</template>

<script>
export default {
  name: 'HalfLayout',
};
</script>

<style lang="scss" scoped>
  .half-layout {
    @include flex(flex, $dir: column);
    flex: 1 0 auto;
    position: relative;

    &__top {
      flex-shrink: 0;
    }

    &__content {
      @include flex(flex, $dir: column);
      flex: 1 0 auto;
      position: relative;

      @include breakpoint(md) {
        flex-direction: row;
      }
    }

    &__content-side {
      display: flex;
      flex-direction: column;
      flex: 1 0 auto;

      @include breakpoint(md) {
        width: 50%;
        flex: 1 0;
      }

      &--left {
        min-height: rem(296);
        position: relative;
        overflow: hidden;

        @include breakpoint(md) {
          min-height: auto;
        }
      }

      &--right {
        @include breakpoint(xl) {
          position: relative;
          z-index: 100;
        }
      }
    }

    &__bottom {
      flex-shrink: 0;
    }
  }
</style>
