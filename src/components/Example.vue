<template lang="pug">
  .example
    //- if you need animation or scroll or resize directive
      than go to /docs/08_Directives.md

    //- .example__images
    //-   h2 Images
    //-   img.example__img(:src="$utils.loadAsset('logo.png')" alt="")
    //-   //- Using lazy-load
    //-   img.example__img(v-lazy="$utils.loadAsset('logo.png')" alt="")

    //-   SvgEl.example__svg(:name="'logo'")
    //-   //- inline svg
    //-   SvgEl.example__svg(:name="'logo'" inline)
    //-   //- svg as img
    //-   img.example__svg(:src="$utils.loadAsset('partnerlogo.svg')" alt="")

    //- .container
    //-   .example__transitions
    //-     h1 Transition example
    //-     .example__transitions-item(
    //-       v-for="transition in transitions"
    //-       :key="transition.type")
    //-       TransitionLayout(:name="transition.type")
    //-         p(v-if="transition.isVisible" v-html="transition.title")
    //-       button.button.example__transitions-button(
    //-         @click="toggleFade(transition)"
    //-         v-html="transition.title")

    //- .container
    //-   .example__audioload
    //-     h1 Audio load mixin
    //-     button.button.example__audioload-button(
    //-       v-for="(sound, index) in Object.keys(audio)"
    //-       :key="index"
    //-       v-html="sound"
    //-       @click="playSound(audio[sound])")

    //- .example__text(v-html="info.title")

    //- .example__text.example__text--modified(v-if="info.part" v-html="info.part.title")

    //- Share

    //- .example__buttons
    //-   //- Button is a functional rendering component.
    //-       Prop ':info' must be an object or a boolean(true)

    //-   //- 1) By default it renders as <button>
    //-   Button(:info="info.button")

    //-   //- 2) If you want it to be a link
    //-         than simply pass 'url' in params and it will be rendered as element <a>.
    //-         Look in 'src/data/parts/indexPage/example.json' for reference.
    //-   Button(:info="info.link")

    //-   //- 3) Or it can be an empty <button> if you don't need text.
    //-         Just pass 'true' to prop :info
    //-   Button(:info="true")

    //-   // simple number input
    //-     props:
    //-     1) v-model
    //-     2) id
    //-     3) placeholder
    //-   SimpleNumberInput(v-model="someVariable" id="someId" placeholder="0")

    //-   // double input with text and number fields
    //-     Use only for array
    //-     props:
    //-     1) eventActionName = event name for analytics
    //-     2) type = variable name from data
    //-     3) index
    //-     4) v-model
    //-     5) deleteItem
    //-   DoubleTextNumberInput(
    //-     eventActionName="Калькулятор_доходы"
    //-     type="income"
    //-     v-for="(item, index) in income"
    //-     v-model="income[index]"
    //-     :key="index"
    //-     :index="index"
    //-     @deleteItem="deleteItem")

    //-   // Add new field for DoubleTextNumberInput
    //-     props:
    //-     1) type = variable name from data
    //-     2) eventActionName = event name for analytics
    //-     3) newObject = Object
    //-     4) addItem
    //-   AddField(
    //-     type="income"
    //-     eventActionName="Калькулятор_доходы_новая_строка"
    //-     :currentItemsCount="income.length"
    //-     :newObject={
    //-       textValue: '',
    //-       numberValue: null,
    //-       textPlaceholder: 'Доход',
    //-       numberPlaceholder: '0',
    //-       isFielded: false
    //-     }
    //-     @addItem="addItem")

    //-   // Select
    //-    props:
    //-     1) className: 'expand-up' (if necessary)
    //-     2) v-model
    //-     3) options for select
    //-   Select(
    //-     className="expand-up"
    //-     v-model="someSelectedVariable"
    //-     :options="selectOptions")

    //-   // RangeInput
    //-   RangeInput(
    //-     eventActionName="Калькулятор_сбережения"
    //-     v-model="someRangeVariable"
    //-     :min="parseInt(0)"
    //-     :max="parseInt(150)")

    //-   // Link with modal window
    //-   a.modal-link(
    //-     data-modal-id="modalId"
    //-     data-modal-text="modalText"
    //-     data-modal-link="modalLink") Link with modal window

    //-   // Banner
    //-   Banner

    //- // Modal
    //- Modal(v-if="isVisibleModal")

    // Test
    Test

    //- // Slider
    //- Slider
</template>

<script>
import SvgEl from '@/core/SvgEl.vue';
import Share from '@/core/Share.vue';
import Button from '@/core/Button.vue';
import SimpleNumberInput from '@/core/SimpleNumberInput.vue';
import DoubleTextNumberInput from '@/core/DoubleTextNumberInput.vue';
import AddField from '@/core/AddField.vue';
import Select from '@/core/Select.vue';
import RangeInput from '@/core/RangeInput.vue';
import Modal from '@/core/Modal.vue';
import Banner from '@/core/Banner.vue';
import Test from '@/components/Test.vue';
import Slider from '@/core/Slider.vue';
import TransitionLayout from '@/layouts/TransitionLayout.vue';
import audioLoadMixin from '@/mixins/AudioLoad/AudioLoad';

export default {
  name: 'example',
  mixins: [audioLoadMixin],
  components: {
    SvgEl,
    Share,
    Button,
    SimpleNumberInput,
    DoubleTextNumberInput,
    AddField,
    Select,
    RangeInput,
    Banner,
    Test,
    Modal,
    Slider,
    TransitionLayout,
  },
  data() {
    return {
      someVariable: null,
      someRangeVariable: 0,
      someSelectedVariable: 'test1',
      selectOptions: ['test1', 'test2', 'test3'],
      income: [
        {
          textValue: 'Зарплата',
          numberValue: 30000,
          textPlaceholder: 'Доход',
          numberPlaceholder: '0',
          isFielded: false,
        },
        {
          textValue: '',
          numberValue: null,
          textPlaceholder: 'Доход',
          numberPlaceholder: '0',
          isFielded: false,
        },
      ],

      // transition example
      transitions: [
        {
          type: 'fade',
          title: 'Fade',
          isVisible: false,
        },
        {
          type: 'fade-bottom',
          title: 'Fade Bottom',
          isVisible: false,
        },
        {
          type: 'fade-top',
          title: 'Fade Top',
          isVisible: false,
        },
        {
          type: 'fade-left',
          title: 'Fade Left',
          isVisible: false,
        },
        {
          type: 'fade-right',
          title: 'Fade Right',
          isVisible: false,
        },
      ],

      // audio load
      audio: {
        explosion: new Audio(require('@/assets/audio/explosion.mp3')),
        hit: new Audio(require('@/assets/audio/hit.mp3')),
      },
    };
  },
  props: {
    info: {
      type: Object,
      required: true,
      default: null,
    },
  },
  methods: {
    toggleFade(transition) {
      transition.isVisible = !transition.isVisible;
    },
    deleteItem(params) {
      this[params.type].splice(params.index, 1);
    },
    addItem(params) {
      this[params.type].push(params.newObject);
    },
    playSound(sound) {
      sound.currentTime = 0;
      sound.pause();
      sound.play();
    },
  },
  computed: {
    isVisibleModal() {
      return this.$root.isVisibleModal;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.example {
  position: relative;

  &__img {
    height: rem(70);
    width: rem(100);
    display: inline-block;
    margin: 5px;
  }

  &__svg {
    height: rem(100);
    width: rem(100);
    display: inline-block;
    margin: 5px;
  }

  &__text {
    @include fs(16, 24);
    color: $black;

    &--modified {
      @include fs(18, 1.5);
      color: $lifehacker;
    }
  }

  &__buttons {
    @include flex($align:flex-start, $dir: column);
    @include mediaProp(
      margin-top,
      $def: rem(15),
      $md: rem(20),
      $lg: rem(25)
    );
  }

  &__transitions {
    &-item {
      display: flex;
      margin-bottom: 10px;
    }

    &-button {
      position: relative;
      color: $white;
      min-width: rem(20);
      background-color: $lifehacker;
      padding: 5px;
    }
  }

  &__audioload {
    &-button {
      position: relative;
      color: $white;
      min-width: rem(20);
      background-color: $lifehacker;
      padding: 5px;
      margin-right: 10px;
    }
  }
}
</style>
