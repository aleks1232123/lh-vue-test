# Утилиты
Хранятся в папке [`utils`](/src/utils).

## [`api.js`](/src/utils/api.js)
Служит простой прослойкой для работы с `axios` и интерфейсом для единого формата запросов.<br>
**Пример**
```vue
<script>
  export default {
    data: () => ({
      requestURL: './',
      someData: {
        name: 'name',
        email: 'email'
      },
    }),
    methods: {
      postRequest() {
        this.$utils.api.post(this.requestURL, this.someData).then((response) => {
          // do something
        });
      },
      getRequest() {
        this.$utils.api.get(this.requestURL, this.someData).then((response) => {
          // do something
        });
      }
    }
  }
</script>
```

## [`debounce`](/src/utils/debounce.js) && [`throttle`](/src/utils/throttle.js)
* `debounce` - предотвращает многократное выполение действия и выполняется только последнее.
    * Например: кликаем 10 раз на кнопку - сработает только последний клик.
* `throttle` - выполняет функцию сразу и повторяет только 1 раз через указанный промежуток времени, если действие не прекращается.

Для использования раскомментируйте в [`main.js`](/src/main.js) соответствующие строки.
```vue
<script>
export default {
  created() {
    // debounce usage example
    this.debouncedClick = this.$utils.debounce(this.exampleMethod, 200);
    // throttle usage example
    this.throttledClick = this.$utils.throttle(this.exampleMethod, 1000);
  },
  methods: {
    exampleMethod() {
      // do something,
    },
  },
}
</script>
```

## [`loadAsset.js`](/src/utils/loadAsset.js)
Как использовать описано в разделе  - [Работа с ресурсами](/docs/02_Assets.md)

## [`meta.js`](/src/utils/meta.js) && [`share.js`](/src/utils/share.js)
`meta.js` - утилита для получения `мета-тегов` из документа.<br>
`share.js` - библиотека [`vue-social-sharing`](https://github.com/nicolasbeauvais/vue-social-sharing) для шаринга в соц.сети.<br>
Содержит кастомные исправления, поэтому намеренно сохранена файлом, вместо добавления через `package.json`.<br>

Используется в компоненте [`Share`](/src/core/Share.vue)

## [`random.js`](/src/utils/random.js)
Функия принимает в качестве аргументов 2 числа: min и max
и возвращает целое рандомное число в интервале [min, max]

## [`shuffle.js`](/src/utils/shuffle.js)
Фуекция принимает в качестве аргумента массив и возвращает
его же, перемешанный случайным образом
