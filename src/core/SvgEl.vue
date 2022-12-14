<script>
export default {
  name: 'SvgEl',
  props: {
    name: {
      type: String,
      default: '',
      required: true,
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
  render(h) {
    if (this.inline) {
      const path = require(`@/assets/svg/${this.name}.svg`);
      return h(path);
    }

    return h('svg', {
      domProps: {
        innerHTML: `<use xlink:href="${this.$utils.loadAsset(this.name, true)}">`,
      },
    });
  },
};
</script>
