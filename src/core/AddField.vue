<template lang="pug">
  .add-field(@click="addItem(type, newObject)")
    span Добавить строку
</template>

<script>

export default {
  props: {
    eventActionName: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    currentItemsCount: {
      type: Number,
    },
    newObject: {
      type: Object,
    },
  },
  methods: {
    addItem(type, newObject) {
      this.$emit('addItem', { type, newObject });
      this.addFieldDataLayer(this.currentItemsCount + 1);
    },
    addFieldDataLayer(eventLabel) {
      window.dataLayer.push({
        event: 'passEventToGa',
        eventCategory: 'Спецпроект',
        eventAction: this.eventActionName,
        eventLabel,
        eventValue: 1,
      });
    },

  },
};
</script>

<style lang="scss">
  .add-field {
    color: #3670F9;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    position: relative;
    padding-left: 20px;
    cursor: pointer;
    transition: .3s;
    margin-bottom: 12px;

    &:hover {
      @include breakpoint(lg) {
        span {
          border-bottom-color: #3670F9;
        }
      }
    }

    &::before,
    &::after {
      content: '';
      width: 2px;
      height: 12px;
      background-color: #3670F9;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &::before {
      left: 5px;
    }

    &::after {
      left: 5px;
      transform: translateY(-50%) rotate(90deg);
    }

    span {
      transition: .3s;
      border-bottom: 1px solid transparent;
    }
  }
</style>
