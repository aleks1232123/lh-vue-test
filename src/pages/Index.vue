<template lang="pug">
  Example(v-if="info.example" :info="info.example")
</template>

<script>
import Example from '@/components/Example.vue';
// import Test from '@/components/Test.vue';

export default {
  name: 'index',
  components: {
    Example,
  },
  data: (context) => ({
    info: context.$utils.loadJSON('indexPage.json'),
  }),
};
</script>
