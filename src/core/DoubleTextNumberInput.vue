<template lang="pug">
  .double-text-number-input(
    :class="{'double-text-number-input--not-completed' : value.numberValue === 0}")

    input.double-text-number-input__label(
      type="text"
      :value="value.textValue"
      :placeholder="`${value.textPlaceholder} ${index + 1}`"
      @input="changeValue($event, 'text')")

    input.double-text-number-input__value(
      type="number"
      :value="value.numberValue"
      :placeholder="value.numberPlaceholder"
      @input="changeValue($event, 'number', index)"
      oncontextmenu="return false;"
      oninput="return false;"
      onchange="return false;"
      onpaste="return false;")

    .double-text-number-input__remove(v-if="index !== 0" @click="removeIncome(index, type)")
      SvgEl(:name="'cross'")
</template>

<script>
import SvgEl from '@/core/SvgEl.vue';

// Example array for store
//   income: [
//     {
//       textValue: 'Зарплата',
//       numberValue: 30000,
//       textPlaceholder: 'Доход',
//       numberPlaceholder: '0',
//       isFielded: false,
//     },
//     {
//       textValue: '',
//       numberValue: null,
//       textPlaceholder: 'Доход',
//       numberPlaceholder: '0',
//       isFielded: false,
//     },
//   ],

export default {
  components: {
    SvgEl,
  },
  props: {
    eventActionName: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: null,
    },
    value: {
      type: Object,
    },
  },
  methods: {
    changeValue(event, valueType, index) {
      if (valueType === 'text') {
        this.value.textValue = event.target.value;
      } else if (valueType === 'number') {
        this.value.numberValue = event.target.value === '' ? null : parseFloat(event.target.value);
        this.fieldedValueDataLayer(index + 1);
        this.value.isFielded = true;
      }
      this.$emit('input', this.value);
    },

    removeIncome(index, type) {
      this.$emit('deleteItem', { index, type });
      this.removeFieldDataLayer(index + 1);
    },

    // eslint-disable-next-line func-names
    fieldedValueDataLayer() {
      this.$utils.debounce((eventLabel) => {
        if (!this.value.isFielded) {
          window.dataLayer.push({
            event: 'passEventToGa',
            eventCategory: 'Спецпроект',
            eventAction: `${this.eventActionName} добавлен`,
            eventLabel,
            eventValue: 1,
          });
        }
      }, 500);
    },

    removeFieldDataLayer(eventLabel) {
      window.dataLayer.push({
        event: 'passEventToGa',
        eventCategory: 'Спецпроект',
        eventAction: `${this.eventActionName} удален`,
        eventLabel,
        eventValue: 1,
      });
    },
  },
};
</script>

<style lang="scss">
  .double-text-number-input {
    display: flex;
    width: 100%;
    padding: 14px 30px 14px 18px;
    background-color: #fff;
    position: relative;

    &:not(:last-child) {
      &::after {
        content: '';
        width: 100%;
        height: 1px;
        background-color: #ddd;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }

    &--not-completed {
      input {
        color: #90989C;
      }
    }

    &__label {
      text-align: left;
    }

    &__value {
      text-align: right;
    }

    input {
      width: 50%;
      font-size: 16px;
      line-height: 22px;
      border: none;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      &::placeholder {
        color: #90989C;
      }

      &[type='number'] {
        -moz-appearance: textfield;
      }
    }

    &__remove {
      width: 10px;
      height: 10px;
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;

      svg {
        width: 100%;
        height: 100%;
        fill: #9a9a9a;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
</style>
