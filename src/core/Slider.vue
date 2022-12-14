<template lang="pug">
  section.slider.swiper-container(id="slider")
    .swiper-wrapper
      .swiper-slide.slide(v-for="(slide, index) in slides" :key="index")
        .container.slide__inner
          img.slide__image(:src="img(slide.image)" alt="Project name")
          .slide__content
            .slide__label {{ index + 1 }}
            .slide__title(v-html="slide.title")
            .slide__text(v-html="slide.text")
    .container.slider__toolbar
      .slider__navigation
        .swiper-button-prev
          SvgEl(name="btnArrow")
        .swiper-button-next
          SvgEl(name="btnArrow")
      .swiper-pagination
</template>

<script>
import Swiper from 'swiper';
import SvgEl from '@/core/SvgEl.vue';

export default {
  name: 'Slider',
  components: {
    SvgEl,
  },
  data() {
    return {
      slides: [
        {
          title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
          image: 'logo.png',
        },
        {
          title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
          image: 'logo.png',
        },
        {
          title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
          image: 'logo.png',
        },
      ],
    };
  },
  methods: {
    img(name) {
      return this.$utils.loadAsset(name);
    },
    scrollToTop() {
      const slider = document.querySelector('#slider');

      window.scrollTo({
        top: slider.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth',
      });
    },
  },
  mounted() {
    window.isShowedSlides = new Array(this.slides.length).fill(false);
    // eslint-disable-next-line no-new
    const slider = new Swiper('.swiper-container', {
      autoHeight: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        slideChange() {
          if (!window.isShowedSlides[slider.activeIndex]) {
            window.dataLayer.push({
              event: 'passEventToGa',
              eventCategory: 'Спецпроект',
              eventAction: 'Project name',
              eventLabel: slider.activeIndex + 1,
              eventValue: 1,
            });
            window.isShowedSlides[slider.activeIndex] = true;
          }
        },
      },
    });
  },
};
</script>

<style lang="scss">
  @import '../../node_modules/swiper/swiper.scss';
  .slider {
    position: relative;
    margin-bottom: 50px;

    &__toolbar {
      position: relative;
      display: flex;
      align-items: center;
    }

    &__navigation {
      display: flex;
    }
  }

  .swiper-container {

    .swiper-pagination-bullets {
      display: flex;
      margin: auto;
    }

    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      background-color: $lifehacker;
      border-radius: 50%;
      opacity: 0.4;
      cursor: pointer;
      transition: $base-transition;

      &:not(:last-child) {
        margin-right: 22px;

        @include breakpoint(sm) {
          margin-right: 10px;
        }
      }

      @include hover() {
        opacity: 1;
      }
    }

    .swiper-pagination-bullet-active {
      opacity: 1;
    }

    .swiper-button-disabled {
      opacity: .5;
    }

    .swiper-button-prev,
    .swiper-button-next {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: $lifehacker;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: $base-transition;

      svg {
        width: 8px;
        height: 13px;
        pointer-events: none;
      }

      @include hover() {
        &:not(.swiper-button-disabled) {
          opacity: .7;
        }
      }
    }

    .swiper-button-prev {
      margin-right: 15px;

      svg {
        transform: scaleX(-1);
      }
    }
  }

  .slide {

    &__inner {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    &__content {
      width: 100%;
      flex-shrink: 0;

      @include breakpoint(md) {
        width: 384px;
      }
      @include breakpoint(lg) {
        width: 512px;
      }
    }

    &__image {
      width: 288px;
      flex-shrink: 0;
      position: relative;

      @include breakpoint(sm) {
        width: 435px;
      }
      @include breakpoint(md) {
        width: 391px;
      }
      @include breakpoint(lg) {
        width: 435px;
      }
    }
  }
</style>
