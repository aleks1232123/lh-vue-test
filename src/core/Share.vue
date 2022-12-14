<template lang="pug">
  .share(:class="getTheme")
    social-sharing(
      :url="url"
      :title="title"
      :description="description"
      :image="image"
      :twitterUser="twitterUser"
      :networkTag="networkTag"
      :redirect="redirect"
      @open="shareDataLayer"
      inline-template)
      .share__icons
        network.share__social.share__social--tw(network="twitter")
          svg(qa_button_share_tw)
            use(:xlink:href="$utils.loadAsset('tw', true)")
        network.share__social.share__social--vk(network="vk")
          svg(qa_button_share_vk)
            use(:xlink:href="$utils.loadAsset('vk', true)")
        network.share__social.share__social--fb(network="facebook")
          svg(qa_button_share_fb)
            use(:xlink:href="$utils.loadAsset('fb', true)")
</template>

<script>
import Meta from '@/utils/meta';

export default {
  name: 'Share',
  data: (context) => ({
    info: context.$utils.loadJSON('template/common.json'),
    socials: [
      {
        name: 'twitter',
      },
      {
        name: 'vk',
      },
      {
        name: 'facebook',
      },
    ],
  }),
  props: {
    theme: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: `${window.location.origin}${window.location.pathname}`,
    },
    title: {
      type: String,
      default: Meta.getMeta('og:title'),
    },
    description: {
      type: String,
      default: Meta.getMeta('og:description'),
    },
    image: {
      type: String,
      default: Meta.getMeta('og:image'),
    },
    twitterUser: {
      type: String,
      default: 'ru_lh',
    },
    networkTag: {
      type: String,
      default: 'div',
    },
    eventAction: {
      type: String,
      default: '',
    },
  },
  computed: {
    getTheme() {
      return this.theme ? `share--${this.theme}` : '';
    },
    redirect() {
      return `${window.location.origin}/special/${this.info.settings.projectSlug}/`;
    },
  },
  methods: {
    shareDataLayer(eventLabel) {
      window.dataLayer.push({
        event: 'passEventToGa',
        eventCategory: 'Спецпроект',
        eventAction: `${this.info.settings.projectName}_социальная активность${this.eventAction}`,
        eventLabel,
        eventValue: 1,
      });
    },
  },
};
</script>

<style lang="scss">
.share {
  $root: &;

  &__icons {
    @include flex(flex, center);
  }

  &__social {
    width: rem(40);
    height: rem(40);
    border-radius: 100%;
    background-color: $lightblue;
    transition: background-color 0.5s;
    overflow: hidden;
    cursor: pointer;
    @include flex(flex, center, center);

    &:not(:last-of-type) {
      margin-right: rem(25);
    }

    svg {
      display: block;
      transition: fill $ease;
      height: 60%;
      width: 60%;
      fill: $darkblue;
    }

    @include hover() {
      background-color: $white;
    }
  }

  &--white {
    #{$root}__social {
      svg {
        fill: $darkblue;
      }

      @include hover() {
        svg {
          fill: $darkblue;
        }
      }
    }
  }
}
</style>
