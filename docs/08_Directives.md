# Директивы
Все директивы уже добавлены в [`src/main.js`](/src/main.js).<br>
Нужно просто раскомментировать соответствующие строки.

## Анимации
Подробнее в отдельном разделе - [`тут`](/docs/12_Animations.md)

## windowResize && scrolls
Файл [`scroll`](/src/directives/scroll.js) содержит в себе две директивы:
- Для привязки скролла к `window` `Vue.directive('scroll', Scroll.window);`
- Для привязки скролла к текущему элементу `Vue.directive('scrollEl', Scroll.element);`

**Пример использования директив:**
```vue
<template>
  <div class="example"
    v-resize="resizeHandler"
    v-scroll="windowScrollHandler"
    v-scroll-el="elScrollHandler"
  ></div>
</template>

<script>
export default {
  name: 'example',
  methods: {
    resizeHandler() {
      // сделать что-то при ресайзе окна
    },
    windowScrollHandler() {
      // сделать что-то при скролле окна
    },
    elScrollHandler() {
      // сделать что-то при скролле элемента
    },
  }
}
</script>
```
