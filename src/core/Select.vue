<template lang="pug">
  v-select(
    :class="className"
    :value="value"
    @input="changeValue($event)"
    :options="options"
    :searchable="false"
    :filterable="false"
    :clearable="false")
    template(slot="open-indicator" lang="pug")
      span.vs-open-indicator
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  components: {
    vSelect,
  },
  props: {
    className: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
    },
  },
  methods: {
    changeValue(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss">
  .vs__search {

    .vs--unsearchable & {
      position: absolute;
      opacity: 0;
      z-index: -1;
    }
  }

  .vs__selected-options {
    padding: 0;
  }

  .vs--single.vs--open .vs__selected {
    position: relative !important;
  }

  .vs__dropdown-toggle {
    border-color: #E2E2E2 !important;
    min-height: 40px !important;
    transition: border-color .3s !important;
    padding-bottom: 0;
    padding-left: 15px;

    .vs--open & {
      border-left: 1px solid #ED5E42 !important;
      border-right: 1px solid #ED5E42 !important;
      border-top: 1px solid #ED5E42 !important;
    }
  }
  .vs__dropdown-option {
    border-top: 1px solid #dcdce1 !important;
    white-space: normal !important;

    &--highlight {
      color: #ffffff !important;
      background: #ED5E42 !important;
    }
  }
  .vs__selected {
    padding: 0;
    margin: 0;
  }

  .v-select {
    font-size: 16px !important;
    background: #fff !important;
    width: 197px !important;
    margin-bottom: 20px;
  }

  .vs__dropdown-menu {
    max-height: unset !important;
    min-width: unset !important;
    padding: 0 !important;
    border-left: 1px solid #ED5E42 !important;
    border-right: 1px solid #ED5E42 !important;
    border-bottom: 1px solid #ED5E42 !important;

    > li {
      min-height: 40px !important;
      display: flex !important;
      align-items: center !important;
    }

    .v-select--rounded & {
      min-width: inherit !important;
      > li {
        padding: 0 12px !important;
      }
    }
  }

  .vs-option-desc {
    display: inline-block !important;
    margin-left: 5px !important;

    @include breakpoint(sm) {
      display: none;
    }
  }

  .vs-open-indicator {
    display: block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 7px solid #ED5E42;
    position: relative;
    transition: transform 0.3s;

    .vs--open & {
      transform: rotate(180deg);
      z-index: 9999;
    }
  }

  .vs__actions {
    padding-right: 10px;
  }

  .expand-up {
    .vs__dropdown-menu {
      top: -118px;
      border-bottom: none !important;
      border-top: 1px solid #ED5E42 !important;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      box-shadow: none !important;

      li {
        &:first-child {
          border-top: none !important;
        }
      }
    }

  }
  .vs__dropdown-toggle {

    .vs--open.expand-up & {
      border-top: 1px solid #dcdce1 !important;
      border-bottom: 1px solid #ED5E42 !important;
      border-bottom-left-radius: 4px !important;
      border-bottom-right-radius: 4px !important;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
    }
  }
</style>
