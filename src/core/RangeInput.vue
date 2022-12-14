<template lang="pug">
  .range-input
    .range-input__progress(:style="`width: ${progressWidth}%`")
    .range-input__min {{ min }}
    .range-input__max {{ max }}
    .range-input__inner
      input.range-input__value(
        type="range"
        :value="value"
        @input="changeValue($event)"
        :min="min"
        :max="max")
      output.range-input__progress-number
</template>

<script>
export default {
  data() {
    return {
      isFielded: false,
    };
  },
  props: {
    eventActionName: {
      type: String,
      default: '',
    },
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
    },
  },
  computed: {
    progressWidth() {
      return (this.value * 100) / this.max;
    },
  },
  methods: {
    changeValue(event) {
      this.$emit('input', parseInt(event.target.value, 10));
      this.rangedValueDataLayer();
    },
    setBubble(range, bubble) {
      const val = range.value;
      const min = range.min ? range.min : 0;
      const max = range.max ? range.max : 100;
      const newVal = Number(((val - min) * 100) / (max - min));
      bubble.innerHTML = val;

      // Sorta magic numbers based on size of the native UI thumb
      bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
    },
    // eslint-disable-next-line func-names
    rangedValueDataLayer() {
      this.$utils.debounce(() => {
        if (!this.isFielded) {
          window.dataLayer.push({
            event: 'passEventToGa',
            eventCategory: 'Спецпроект',
            eventAction: this.eventActionName,
            eventLabel: this.value,
            eventValue: 1,
          });
          this.isFielded = true;
        }
      }, 500);
    },
  },
  mounted() {
    const range = document.querySelector('.range-input__value');
    const bubble = document.querySelector('.range-input__progress-number');

    range.addEventListener('input', () => {
      this.setBubble(range, bubble);
    });

    this.setBubble(range, bubble);
  },
};
</script>

<style lang="scss">
  .range-input {
    width: 100%;
    position: relative;
    margin-bottom: 16px;
    margin-bottom: 40px;
    max-width: 300px;

    &::after {
      content: '';
      background: #DDDDDD;
      height: 1px;
      width: 100%;
      position: absolute;
      bottom: 4px;
      left: 0;
      user-select: none;
      pointer-events: none;
      z-index: 1;
    }

    &__inner {
      position: relative;
    }

    &__progress {
      background: #ED5E42;
      height: 1px;
      position: absolute;
      bottom: 4px;
      left: 0;
      user-select: none;
      pointer-events: none;
      z-index: 2;
    }

    &__progress-number {
      position: absolute;
      top: -115%;
      left: 50%;
      transform: translateX(-50%);
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
    }

    &__min,
    &__max {
      position: absolute;
      bottom: -150%;
      font-size: 16px;
      line-height: 19px;
      color: #9a9a9a;
    }

    &__min {
      left: 0;
    }

    &__max {
      right: 0;
    }

    input[type=range] {
      width: 100%;
      -webkit-appearance: none;
      height: 16px;
      background-color: transparent;
      position: relative;
      z-index: 3;
      outline: none;

      &:focus {
        outline: none;
      }

      &::-webkit-slider-thumb {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background-color: #ED5E42;
        cursor: pointer;
        -webkit-appearance: none;
        border: none;
        margin-top: 14px;

        &::before {
          content: var(--thumbNumber);
        }
      }

      &::-moz-range-thumb {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background-color: #ED5E42;
        cursor: pointer;
        -webkit-appearance: none;
        border: none;
        outline: none;
        margin-top: 0px;
        margin-bottom: -8px;
      }

      &::-ms-thumb {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background-color: #ED5E42;
        cursor: pointer;
        -webkit-appearance: none;
        border: none;
        margin-top: 0;
      }

      &::-moz-focus-outer {
        border: 0;
      }
    }
  }

  @supports (-ms-ime-align:auto) {
    input[type=range] {
      margin-bottom: -8px;
    }
  }

  @-moz-document url-prefix() {
    input[type=range] {
      margin-bottom: -8px;
    }
  }
</style>
