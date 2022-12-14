<template lang="pug">
  section.modal(v-click-outside="closeModal" ref="modal")
    .modal__close(@click="closeModal")
      SvgEl(name="cross")
    .modal__text(v-html="modalText")
    a.link(:href="modalLink" target="_blank") узнать
</template>

<script>
import SvgEl from '@/core/SvgEl.vue';
import ClickOutside from 'vue-click-outside';

/* Для работы необходимо разблокировать часть кода в main.js
(переменные в data и отслеживание события клика)
Для ссылки, на которую вешается модальное окно указывается класс modal-link
Также указываеются дата атрибуты:
  data-modal-id (уникальный id ссылки),
  data-modal-text (текст для мобального окна),
  data-modal-link (внешняя ссылка для мобального окна) */

export default {
  name: 'Modal',
  components: {
    SvgEl,
  },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      windowWidth: 0,
    };
  },
  computed: {
    modalText() {
      return this.$root.modalText;
    },
    modalLink() {
      return this.$root.modalLink;
    },
    modalTopPosition() {
      return this.$root.modalTopPosition;
    },
    modalLeftPosition() {
      return this.$root.modalLeftPosition;
    },
    currentTarget() {
      return this.$root.currentTarget;
    },
    isMobile() {
      return this.windowWidth < 768;
    },
  },
  methods: {
    setWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
    closeModal() {
      this.$root.isVisibleModal = false;
      document.querySelector(`[data-modal-id=${this.currentTarget}]`).classList.remove('modal-link--active');
    },
    setTopPosition() {
      this.$refs.modal.style.top = `${this.modalTopPosition - this.$refs.modal.offsetHeight * 2}px`;
    },
    setLeftPosition() {
      if (this.isMobile) {
        this.$refs.modal.style.left = '50%';
        this.$refs.modal.style.right = 'unset';
      } else if (this.modalLeftPosition <= 0) {
        this.$refs.modal.style.left = '0px';
        this.$refs.modal.style.right = 'unset';
      } else if (this.modalLeftPosition + this.$refs.modal.offsetWidth >= window.innerWidth) {
        this.$refs.modal.style.left = 'unset';
        this.$refs.modal.style.right = '0px';
      } else {
        this.$refs.modal.style.left = `${this.modalLeftPosition - (this.$refs.modal.clientWidth / 2)}px`;
        this.$refs.modal.style.right = 'unset';
      }
    },
  },
  mounted() {
    this.setWindowWidth();

    window.addEventListener('resize', () => {
      this.setWindowWidth();
    });

    setTimeout(() => {
      this.setTopPosition();
      this.setLeftPosition();
    }, 0);
  },
};
</script>

<style scoped lang="scss">
  .modal {
    width: 246px;
    background: $white;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.23);
    border-radius: 5px;
    padding: 19px 50px 19px 19px;
    position: absolute;
    transform: translateX(-50%);
    z-index: 100;

    @include breakpoint(sm) {
      transform: unset;
    }

    &__close {
      width: 8px;
      height: 8px;
      position: absolute;
      right: 24px;
      top: 19px;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    &__text {
      font-size: 12px;
      line-height: 15px;
      color: #979797;
      margin-bottom: 10px;
    }

    .link {
      font-weight: bold;
      font-size: 12px;
      line-height: 15px;
      border-bottom-width: 1px;
    }
  }
</style>
