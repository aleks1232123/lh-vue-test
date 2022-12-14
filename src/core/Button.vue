<script>
export default {
  name: 'Button',
  props: {
    info: {
      required: true,
      default: false,
      validator(value) {
        return typeof value === 'object' || typeof value === 'boolean';
      },
    },
  },
  render(createElement) {
    let elProps = {
      class: 'button',
      domProps: {
        innerHTML: this.info?.text,
      },
      on: this.$listeners,
    };
    if (this.info.url) {
      elProps = {
        ...elProps,
        attrs: {
          href: this.info.url,
          target: this.info.external ? '_blank' : 'self',
          rel: 'noopener',
        },
      };
    }
    return createElement(this.info.url ? 'a' : 'button', elProps);
  },
};
</script>

<style scoped lang="scss">
.button {
  position: relative;
  //- Just example styles to set all buttons visible
  color: $white;
  // height: rem(20);
  min-width: rem(20);
  background-color: $lifehacker;
  padding: 5px;
}
</style>
