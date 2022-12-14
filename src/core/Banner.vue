<template lang="pug">
  section.banner(qa_banner)
    .container.banner__container
      .banner__content
        h1.banner__title(v-html="info.title")
        h2.banner__caption(v-html="info.caption")
        Share.banner__share
        ScrollDownEl
</template>

<script>
import Share from '@/core/Share.vue';
import ScrollDownEl from '@/core/ScrollDownEl.vue';

export default {
  name: 'Banner',
  data: (context) => ({
    info: context.$utils.loadJSON('template/common.json'),
    vh: null,
  }),
  components: {
    Share,
    ScrollDownEl,
  },
  methods: {
    img(name) {
      return this.$utils.loadAsset(name);
    },
    setViewportHeight() {
      this.vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${this.vh}px`);
    },
  },
  mounted() {
    this.setViewportHeight();

    window.addEventListener('resize', () => {
      this.setViewportHeight();
    });
  },
};
</script>

<style scoped lang="scss">
  .banner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: $lifehacker;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    width: 100%;
    overflow: hidden;

    &__container {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 2;
      height: 100%;
    }

    &__content {
      width: 288px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-top: 10px;
      font-weight: bold;
      color: $white;
      text-align: center;
      position: relative;

      @include breakpoint(sm) {
        width: 624px;
        padding-top: 70px;
        justify-content: flex-start;
      }
      @include breakpoint(md) {
        width: 792px;
      }
      @include breakpoint(lg) {
        justify-content: center;
        padding-top: 0;
      }
    }

    &__title {
      margin-top: 0;
      margin-bottom: 16px;
      font-size: 40px;
      line-height: 40px;

      @include breakpoint(sm) {
        font-size: 80px;
        line-height: 80px;
      }
    }

    &__caption {
      font-size: 20px;
      line-height: 24px;
      margin-top: 0;
      margin-bottom: 16px;

      @include breakpoint(sm) {
        font-size: 38px;
        line-height: 45px;
        margin-bottom: 40px;
      }
    }

    &__share {
      margin-bottom: 16px;

      @include breakpoint(sm) {
        margin-bottom: 35px;
      }
    }
  }
</style>
