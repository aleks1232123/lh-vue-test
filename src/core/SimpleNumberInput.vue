<template lang="pug">
  input.simple-number-input(
    type="number"
    :value="value"
    :placeholder="placeholder"
    :id="id"
    @input="changeValue($event)"
    oncontextmenu="return false;"
    oninput="return false;"
    onchange="return false;"
    onpaste="return false;")
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    value: {
      type: Number,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  methods: {
    changeValue($event) {
      this.$emit('input', parseInt($event.target.value, 10));
    },
  },
};
</script>

<style lang="scss">
  .simple-number-input {
    width: 90px;
    height: 40px;
    padding: 8px 11px;
    background-color: #fff;
    border: 1px solid #DDD;
    border-radius: 3px;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: center;

    input {
      &::placeholder {
        color: #90989C;
      }
    }
  }
</style>
