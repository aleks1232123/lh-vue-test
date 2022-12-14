<template lang="pug">
  .HalfExample
    HalfLayout
      template(v-slot:left)
        .HalfExample__left LEFT TEXT
      template(v-slot:right)
        Header
        .HalfExample__right RIGHT TEXT
          .HalfExample__left-text
        //- You can place elements as you need
            For example placed footer here
        Footer
      //- And footer at bottom slot
      template(v-slot:bottom)
        Footer
</template>

<script>
import HalfLayout from '@/layouts/HalfLayout.vue';

export default {
  name: 'HalfExample',
  components: {
    HalfLayout,
  },
};
</script>

<style scoped lang="scss">
  .HalfExample {
    @include flex(flex, $dir: column);
    flex: 1 0 auto;

    &__right {
      flex: 1 0 auto;
    }
  }
</style>
