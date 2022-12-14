# Работа с ресурсами

## Изображения
> Изображения следует оптимизировать, например, используя [`tinypng.com`](https://tinypng.com/) или [`iloveimg.com`](https://www.iloveimg.com/compress-image) или любой другой.<br>
Главное не ужимать сильно, чтобы картинки не начинали пикселить.

Изображения следует хранить в папке `src/assets/images/`.<br>
Если блоков на странице много и в них много изображений, то для удобства лучше разделять их по папкам.<br>

Возможные форматы:
 - .png
 - .jpeg
 - .jpg
 - .gif
 - .webp
 - .svg

При сборке проекта файлы копируются в `dist/assets/img/`.

### Пример добавления изображения в компоненте
```vue
<template>
  <img :src="$utils.loadAsset('logo.png')" alt="">
</template>
```

Если изображение находится дальше второго экрана - рекомендуется использовать "ленивую" подгрузку картинок.<br>
Плагин уже добавлен в сборку. Нужно только использовать атрибут `v-lazy` вместо `:src`.
```vue
<template>
  <img v-lazy="$utils.loadAsset('logo.png')" alt="">
</template>
```

Или для `background-image`:
```vue
<template>
  <div v-lazy:background-image="$utils.loadAsset('logo.png')"></div>
</template>
```

Если в компоненте предполагается добавлять много изображений можно добавить метод для сокращения вызова:
```vue
<template>
  <img :src="img('logo.png')" alt="">
</template>

<script>
export default {
  methods: {
    img(image) {
      return this.$utils.loadAsset(image);
    },
  },
}
</script>
```

<br>
<br>

## SVG
##### Для использования svg из спрайтов нужно загрузить их в папку `src/assets/svg-sprites`.
Пример подключения в компонентах:
```vue
<template>
  <svg>
    <use :xlink:href="$utils.loadAssets('logo', true)"></use>
  </svg>
</template>
```
В функцию `loadAssets()` первым параметром передается имя вашей svg<br>
> обратите внимание, что указывается только имя файла без расширения *.svg

Второй параметр `true` - чтобы функция загрузила svg как спрайт.

### Компонент SvgEl
Для удобства добавления есть компонент `src/core/SvgEl.vue`.<br>

Добавьте его в свой Vue-компонент:
```js
import SvgEl from '@/core/SvgEl';

export default {
  components: {
    SvgEl,
  },
};

```

Пример подключения из спрайтов:
```vue
<template>
  <SvgEl :name="'logo'" />
</template>
```

### Добавляем svg в код инлайном.
Для этого поместите вашу `svg` в папку `src/assets/svg/`.<br>

> По-умолчанию в стилях для `svg` прописано свойство `pointer-events: none`.
Чтобы обрабатывать клики - нужно добавить к элементу `pointer-events: auto`.

**Используя компонент SvgEl**:<br>
Укажите атрибут `inline`
```vue
<template>
  <SvgEl :name="'logo'" inline />
</template>
```

ИЛИ

**Добавляем svg как компонент**:<br>
```vue
<template>
  <Logo />
</template>
<script>
import Logo from '@/assets/svg/logo.svg';

export default {
  components: {
    Logo,
  },
};
</script>
```

### Добавляем `svg` через тег `img`.
Для этого нужно загрузить `svg` в папку `src/assets/images/`, а дальше действия такие же как и с изображениями.

<br>
<br>

## Шрифты
Подключить шрифт можно двумя способами:

* CDN ([Google Fonts](https://fonts.google.com/))
* Конвертировать и подключить с помощью [`@font-face`](https://developer.mozilla.org/ru/docs/Web/CSS/@font-face).

> Предпочтительно использовать второй вариант подключения.<br>
    Так получится избежать лишних сетевых запросов и скорость загрузки шрифтов будет быстрее.<br>
    И это позволит предусмотреть, что CDN может отвалиться.

### Подключение шрифта с помощью Google Fonts

Порядок подключения шрифта на примере Roboto:

1. Находим шрифт — например [Roboto](https://fonts.google.com/specimen/Roboto)
2. Выбираем нужные начертание - Нажимаем `Select this style`.
3. Открывается окно справа.
4. Подключаем шрифт:<br>
    4.1 **1-й способ:**<br>
    &nbsp;&nbsp;&nbsp;4.1.1. Копируем код тега `<link>`.<br>
    &nbsp;&nbsp;&nbsp;4.1.2. В файл `public/index.html` в теге `head` вставляем скопированный `<link>`.<br>
    4.2 **2-й способ:**<br>
    &nbsp;&nbsp;&nbsp;4.2.1. Во вкладке `Embed` переключаемся в `@import` и копируем содержимое тега `<style>`.<br>
    &nbsp;&nbsp;&nbsp;4.2.2. В файл `src/scss/_fonts.scss` вставляем скопированный `@import`.<br>
5. В файл `src/scss/_variables.scss` добавляем переменную `$Roboto`(в файле есть пример).
6. Используем переменную в стилях.

### Конвертирование шрифта и подключение с помощью `@font-face`

Требуемые форматы — `.woff` (обязательно) и `.woff2` (опционально).

Файлы `.ttf`, `.otf` или `.eot` можно сконвертировать в `.woff` и `.woff2` с помощью онлайн-сервиса:

* [transfonter.org](http://transfonter.org/)
    * С помощью этого сервиса для оптимизации шрифта можно<br>
    выгрузить только нужные языковые пакеты выбрав их в селекте **subsets**.<br>
    Обычно достаточно:
        * Latin
        * Latin Extended
        * Cyrillic
        * Cyrillic Extended
    * Если вырезаете языковые пакеты - не забудьте добавить `unicode-range` для символов!

Полученные файлы следует хранить в папке `src/assets/fonts`.<br>
Подключение шрифтов происходит в файле `src/scss/_fonts.scss`.<br>
И так же в файл `src/scss/_variables.scss` добавляем переменную `$Roboto`(в файле есть пример).<br>
И используем переменную в стилях.
