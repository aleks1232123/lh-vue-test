<template lang="pug">
  header.header
    .container.header__container
      a.header__logo.header__logo--main(
        :href="info.logo.main.url"
        target="_blank"
        rel="noopener"
        qa_logo_lh_header)
        SvgEl(:name="info.logo.main.svg")
      //- Example menu button. Uncomment and style if necessary
        .header__btn(@click="toggleMenu", ref="button",
          v-if="info.menu", :class="{'header__btn--open' : isMenuOpened}")
          .header__btn-ico
            span
          .header__btn-text(v-html="isMenuOpened ? 'Закрыть' : 'Открыть'")
      a.header__logo.header__logo--partner(
        v-if="info.logo.partner"
        :href="info.logo.partner.url"
        target="_blank"
        rel="noopener"
        qa_logo_partner_header qa_link_external)
        SvgEl(:name="info.logo.partner.svg")
    //- Example menu component. Uncomment and style if necessary
      template(v-if="info.menu")
        transition(name="fade", mode="in-out")
          HeaderMenu(:info="info.menu", v-if="isMenuOpened", @closeMenu="toggleMenu", ref="menu")
</template>

<script>
import SvgEl from '@/core/SvgEl.vue';

// import HeaderMenu from './menu/Header-menu.vue';

export default {
  name: 'Header',
  data: (context) => ({
    info: context.$utils.loadJSON('template/header.json'),
    isMenuOpened: false,
  }),
  components: {
    // HeaderMenu,
    SvgEl,
  },
  methods: {
    /*
    toggleMenu() {
      this.isMenuOpened = !this.isMenuOpened;
    },
    */
  },
  mounted() {
    /*
    // Click outside menu to close it
    // Uncomment if necessary
    const menuButton = this.$refs.button;
    document.addEventListener('click', (e) => {
      const { target } = e;
      if (target !== menuButton && !menuButton.contains(target)) {
        const menu = this.$refs.menu?.$el || null;
        if (menu && (target !== menu || !menu.contains(target))) {
          this.isMenuOpened = false;
        }
      }
    });
    */
  },
};
</script>
<style scoped lang="scss">
.header {
  background: linear-gradient(180deg,#000,rgba(0,80,150,0));
  height: rem(70);
  position: fixed;

  &__container {
    @include flex(flex, center, space-between);
    height: 100%;
  }

  &__logo {
    svg {
      fill: $white;
      transition: fill $ease;
    }

    @include hover(true) {
      svg {
        fill: $white;
      }
    }

    &--main {
      height: rem(35);
      width: rem(106);
    }

    &--partner {
      height: rem(21);
      width: rem(106);
    }
  }

  // Menu button styles example
  /*
  &__btn {
    @include flex(inline-flex, center);
    cursor: pointer;

    &--open {
      &__btn-ico {
        span {
          transform: rotate(-45deg) translate(0, -1px);
        }

        &::before {
          transform: rotate(45deg) translate(3px, 3px);
        }

        &::after {
          transform: translateY(3px);
          background-color: transparent;
        }
      }
    }
  }

  &__btn-ico {
    height: rem(12);
    width: rem(14);
    position: relative;
    overflow: hidden;

    &::before,
    &::after {
      content: '';
      display: block;
    }

    &::before,
    &::after,
    span {
      height: 2px;
      border-radius: 1px;
      background-color: $black;
      position: absolute;
      left: 0;
      width: 100%;
      transition: background-color $ease, transform $ease;
    }

    &::before {
      top: 0;
    }

    &::after {
      bottom: 0;
    }

    span {
      top: 5px;
    }
  }

  &__btn-text {
    @include fs(12, rem(15));
    text-transform: uppercase;
    color: $black;
    margin-left: rem(8);
  }
  */
}
</style>
