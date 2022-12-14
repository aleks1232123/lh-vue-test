<template lang="pug">
  footer.footer(qa_footer)
    .container.footer__container
      Share.footer__share(:theme="'white'")
      .footer__copyright
        a(
          :href="info.main.url"
          target="_blank"
          rel="noopener"
          v-html="info.main.text"
          ga_logo_lh_footer)
        span |
        a(v-if="info.partner" :href="info.partner.url" target="_blank" rel="noopener"
          v-html="info.partner.text" qa_logo_partner_footer qa_link_external)
        span © {{ getCurrentYear() }}
</template>

<script>
import Share from '@/core/Share.vue';

export default {
  name: 'Footer',
  data: (context) => ({
    info: context.$utils.loadJSON('template/common.json'),
  }),
  components: {
    Share,
  },
  methods: {
    getCurrentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped lang="scss">
.footer {
  padding: rem(30) 0;

  @include breakpoint(sm) {
    padding: 0;
    height: rem(72);
  }

  &__container {
    text-align: center;

    @include breakpoint(sm) {
      @include flex(flex, center, space-between);
      height: 100%;
      text-align: left;
    }
  }

  &__share {
    margin-bottom: rem(32);
    @include flex(flex, center, center);

    @include breakpoint(sm) {
      justify-content: flex-start;
      order: 1;
      margin-bottom: 0;
    }
  }

  &__copyright {
    @include fs(20, rem(26));
    @include flex(inline-flex, center);

    a {
      color: $lightblue;
      margin: 5px;
      border-bottom: 2px solid $lightblue;
      font-size: 14px;

      &:not(:first-of-type) {
        @include breakpoint(sm) {
          margin-left: 5px;
        }
      }

      @include hover(true) {
        color: $white;
        border-bottom: 2px solid $white;
      }

      @include breakpoint(lg) {
        transition: color $ease;
      }
    }

    span {
      color: $white;
      line-height: rem(20);
      font-size: 14px;
    }

    @include breakpoint(sm) {
      order: 1;
    }
  }
}
</style>
