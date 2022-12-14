<template lang="pug">
  section.test
    .test__container(
      v-if="!isTest && !isResult"
      v-lazy:background-image="$utils.loadAsset('main-background/main.png')")
      HalfLayout
        template(v-slot:left)
        template(v-slot:right)
          .test-preview__container
            .test-preview__title(v-html="test.title")
            .test-preview__description(v-html="test.description")
            .test-preview__button(@click="showTest" v-html="test.startButtonName")
        //-.test-footer
      Footer

    .test__container(
      v-if="isTest")
      HalfLayout
        template(v-slot:left)
          .half-screen__left(
            v-lazy:background-image="$utils.loadAsset(`questions/${currentQuestionIndex + 1}.jpg`)")
            .test-questions__mirror
              div(v-if="!isSelected")
                <img :src="$utils.loadAsset('mirror/mirror.png')" alt="">
              div(v-if="isSelected")
                img(
                  v-if="isRightAnswer"
                  :src="$utils.loadAsset('mirror/mirror_1.png')"
                  alt="")
                img(
                  v-if="!isRightAnswer"
                  :src="$utils.loadAsset('mirror/mirror_0.png')"
                  alt="")
              div
            .test-questions__car
              <img :src="$utils.loadAsset('car/car.png')" alt="">
        template(v-slot:right)
          .half-screen__right
            .test-questions__choice(v-if="!isSelected")
              .test-questions__number(
                v-html="`${currentQuestionIndex + 1}/${test.questions.length}`")
              .test-questions__question(
                v-html="test.questions[currentQuestionIndex].text")
              .test-questions__answer(
                v-for="(answer, index) in test.questions[currentQuestionIndex].answers"
                :key="index"
                @click="selectAnswer($event, index, answer.id)"
                v-html="answer.text")
            .test-questions__next(v-if="isSelected")
              .test-questions__feedback(
                v-html="test.questions[currentQuestionIndex].answers[currentAnswer].feedback")
              .test-questions__button(@click="moveToNextQuestion") Далее

    .test__container.test-result(
      v-if="isResult")
      HalfLayout
        template(v-slot:left)
          .half-screen__left(
            v-lazy:background-image="$utils.loadAsset(`results/${currentResultIndex + 1}.png`)")
        template(v-slot:right)
          .half-screen__right
            .test-result__container
              .test-result__title(v-html="test.results[currentResultIndex].title")
              .test-result__text(v-html="test.results[currentResultIndex].text")
              .test-result__toolbar
                .test__share
                  .share-label Поделиться
                  Share
                .test-result__button(@click="restartTest") Пройти еще раз
</template>

<script>
import Share from '@/core/Share.vue';
import Footer from '@/components/Footer.vue';
import HalfLayout from '@/layouts/HalfLayout.vue';
import HalfExample from '@/pages/HalfExample.vue';

export default {
  name: 'Test',
  components: {
    Share,
    Footer,
    HalfLayout,
    HalfExample,
  },
  data: (context) => ({
    test: context.$utils.loadJSON('template/test.json'),
    isTest: false,
    isResult: false,
    isSelected: false,
    isRightAnswer: false,
    currentQuestionIndex: 0,
    currentAnswer: null,
    currentResultIndex: null,
  }),
  methods: {
    showTest() {
      this.isTest = true;
      window.scrollTo(0, 0);
    },
    restartTest() {
      this.isResult = false;
      this.isTest = true;
      this.currentQuestionIndex = 0;
      this.currentResultIndex = null;
      if (this.test.withRightAnswer) {
        this.rightAnswersCounter = 0;
      } else {
        this.resultsCounter = new Array(this.answersAmount).fill(0);
      }
      window.scrollTo(0, 0);
    },
    selectAnswer(e, selectedAnswerIndex, selectedAnswerId) {
      if (this.currentQuestionIndex < this.test.questions.length) {
        if (this.test.withRightAnswer) {
          const { rightAnswerId } = this.test.questions[this.currentQuestionIndex];
          if (rightAnswerId === selectedAnswerId) {
            this.rightAnswersCounter += 1;
            this.isRightAnswer = true;
          } else {
            this.isRightAnswer = false;
          }
        } else {
          this.resultsCounter[selectedAnswerIndex] += 1;
        }
      }
      this.currentAnswer = selectedAnswerId - 1;
      this.isSelected = true;
    },
    moveToNextQuestion() {
      this.currentQuestionIndex += 1;
      this.isSelected = false;
      if (this.currentQuestionIndex === this.test.questions.length) {
        if (this.test.withRightAnswer) {
          // eslint-disable-next-line max-len
          this.currentResultIndex = this.rightAnswersCounter === 0 ? 0 : Math.ceil(this.rightAnswersCounter / 2) - 1;
        } else {
          const max = Math.max.apply(null, this.resultsCounter);
          this.currentResultIndex = this.resultsCounter.indexOf(max);
        }
        this.isTest = false;
        this.isResult = true;
      }
      window.scrollTo(0, 0);
    },
  },
  created() {
    if (this.test.withRightAnswer) {
      this.rightAnswersCounter = 0;
    } else {
      this.answersAmount = 5;
      this.resultsCounter = new Array(this.answersAmount).fill(0);
    }
  },
  updated() {
  },
};
</script>

<style lang="scss">
  .test {
    display: flex;
    flex-direction: column;
    scroll-behavior: smooth;

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      transition-delay: 1s;
    }

    .test-preview {

      &__container {
        margin-top: 100px;
        margin-left: 50px;
        display: flex;
        flex-direction: column;
        border: 3px solid $white;
        border-right: none;
        background-color: $darkbluemain;
      }
      &__title {
        color: $white;
        font-size: 50px;
        font-weight: bold;
        border-bottom: 3px solid $white;
        padding: 20px 70px 20px;
      }

      &__description {
        font-size: 16px;
        color: $white;
        display: flex;
        flex-direction: column;
        padding: 20px 70px;
      }
      &__button {
        border-radius: 3px;
        font-size: 16px;
        font-weight: bold;
        box-shadow: 0 4px 25px $black;
        max-width: 250px;
        cursor: pointer;
        text-align: center;
        padding: 16px 20px;
        margin-left: 70px;
        margin-bottom: 100px;
        color: $darkbluemain;
        transition: background-color 0.5s;
        background-color: $lightblue;
        cursor: pointer;

        &:not(:last-child) {
          margin-bottom: 20px;
        }

        @include hover() {
          background-color: $white;
        }
      }
    }

    .test-questions {

      &__button{
        border-radius: 3px;
        font-size: 16px;
        font-weight: bold;
        box-shadow: 0 4px 25px $black;
        width: 250px;
        cursor: pointer;
        text-align: center;
        padding: 16px 20px;
        margin-left: 150px;
        margin-top: 50px;
        color: $darkbluemain;
        transition: background-color 0.5s;
        background-color: $lightblue;
        cursor: pointer;

        &:not(:last-child) {
          margin-bottom: 20px;
        }

        @include hover() {
          background-color: $white;
        }
      }

      &__feedback{
        text-align: left;
        font-size: 30px;
        color: $white;
        margin: 0 150px;
      }

      &__next {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 100px;
        margin-bottom: 300px;
      }

      &__choice {
        margin: 0 3%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-wrap: wrap;
      }

      &__number{
        color: $white;
        font-size: 20px;
      }

      &__mirror {
        display: flex;
        justify-content: flex-end;
        margin-right: 50px;
      }

      &__question {
        color: $white;
        font-size: 50px;
        font-weight: bold;
        margin-bottom: 30px;
        text-align: center;
      }

      &__answers {
        display: flex;
        flex-direction: column;
      }
      &__answer {
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        padding: 50px;
        border-radius: 3px;
        cursor: pointer;
        background-color: $answercolor;
        font-size: 20px;
        color: $white;
        // max-width: 700px;
        max-height: 80px;
        transition: background-color 0.5s;

        @include hover() {
          background-color: $lightblue;
          color: $darkblue;
        }

        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }

    .test-result {
      background-repeat: no-repeat;
      background-size: cover;

      &__title {
        color: $white;
        font-size: 50px;
        font-weight: bold;
        border-bottom: 3px solid $white;
        padding: 20px 70px 20px;
      }
      &__text {
        font-size: 16px;
        margin-top: 20px;
        color: $white;
        padding: 20px 70px;
        font-weight: bold;
      }
      &__container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100vw;
      }
      &__button {
        border-radius: 3px;
        font-size: 16px;
        font-weight: bold;
        box-shadow: 0 4px 25px $black;
        max-width: 250px;
        cursor: pointer;
        text-align: center;
        padding: 16px 20px;
        margin-bottom: 100px;
        margin-top: 50px;
        color: $darkbluemain;
        transition: background-color 0.5s;
        background-color: $lightblue;
        cursor: pointer;

        &:not(:last-child) {
          margin-bottom: 20px;
        }

        @include hover() {
          background-color: $white;
        }
      }
      &__toolbar {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: center;
        @include breakpoint(sm) {
          //flex-direction: row;
          align-self: unset;
        }
      }
    }
    &__share {
      display: flex;
      flex-direction: column;
      align-items: center;
      @include breakpoint(sm) {
        align-items: unset;
      }
    }

    .test-footer {
      position: fixed;
      display: flex;
      justify-content: space-between;
      right: 0;
      bottom: 0;
    }

    .button {
      color: $white;
      min-width: rem(20);
      background-color: $lightblue;
      cursor: pointer;
      padding: 5px;
    }

    .share-label {
      color: $white;
      text-align: center;
      margin-bottom: 10px;
    }

    .half-screen {
      @include flex(flex, $dir: column);
      flex: 1 0 auto;

      &__right {
        background-color: $darkblue;
        border-left: 3px solid $white;
        flex: 1 0 auto;
        display: flex;
        justify-content: center;
        @include breakpoint(sm) {
          border-top: 3px solid $white;
        }
      }

      &__left {
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
  }
</style>
