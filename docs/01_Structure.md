# Структура папок и файлов

```text
cli-template
├── public
│   └── index.html
├── src
│   ├── assets
│   │   ├── fonts
│   │   │   └── .gitkeep
│   │   ├── images
│   │   │   └── .gitkeep
│   │   ├── svg
│   │   │   └── .gitkeep
│   │   └── svg-sprites
│   │       ├── cross.svg
│   │       ├── fb.svg
│   │       ├── logo.svg
│   │       ├── tw.svg
│   │       └── vk.svg
│   ├── components
│   │   └── Header
│   │   │   ├── Header.vue
│   │   │   └── Header-menu.vue
│   │   ├── Example.vue
│   │   └── Footer.vue
│   ├── core
│   │   ├── Button.vue
│   │   ├── Share.vue
│   │   └── SvgEl.vue
│   ├── data
│   │   ├── indexPage.json
│   │   ├── parts
│   │   │   └── indexPage
│   │   │       ├── blockName.json
│   │   │       └── example.json
│   │   └── template
│   │       ├── header.json
│   │       └── template.json
│   ├── directives
│   │   ├── animate
│   │   │   ├── animate.scss
│   │   │   └── index.js
│   │   ├── scroll.js
│   │   └── windowResize.js
│   ├── filters
│   │   └── plural.js
│   ├── layouts
│   │   ├── Default.vue
│   │   └── Half-layout.vue
│   ├── mixins
│   │   └── Generator
│   │       ├── Generator.js
│   │       └── Iterator.js
│   ├── pages
│   │   ├── HalfExample.vue
│   │   └── Index.vue
│   ├── pug
│   │   └── mixins
│   │   │   └── .gitkeep
│   │   └── mixins.pug
│   ├── router
│   │   └── index.js
│   ├── scss
│   │   ├── _base.scss
│   │   ├── _common.scss
│   │   ├── _fonts.scss
│   │   ├── _reset.scss
│   │   ├── _transitions.scss
│   │   ├── _variables.scss
│   │   └── mixins
│   │       ├── _bem.scss
│   │       ├── _breakpoint.scss
│   │       └── _misc.scss
│   ├── store
│   │   └── index.js
│   └── utils
│   │   ├── api.js
│   │   ├── debounce.js
│   │   ├── loadAsset.js
│   │   ├── meta.js
│   │   ├── share.js
│   │   └── throttle.js
│   ├── App.vue
│   ├── main.js
├── utils
│   ├── routes.js
│   └── split-json-loader.js
├── .editorconfig
├── .env.localBuild.local
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .gitlab-ci.yml
├── .pug-lintrc.json
├── babel.config.js
├── index.php
├── package.json
├── postcss.config.js
├── README.md
└── vue.config.js
```

## `src`

В папке `src` хранятся исходные файлы проекта.

### `src/assets/`

Предназначена для хранения ресурсов проекта.<br>
[**Работа с ресурсами**](/docs/02_Assets.md)

* #### `src/assets/fonts/`
Предназначена для хранения сторонних шрифтов.<br>
При сборке файлы из данной папки попадают в `dist/assets/fonts`.

* #### `src/assets/images/`
Предназначена для хранения изображений.<br>
При сборке файлы из данной папки попадают в `dist/assets/images`.

* #### `src/assets/svg/`
Предназначена для хранения векторных иконок.<br>
Svg из этой папки можно импортировать как компоненты в ваш `Vue`-компонент.<br>

* #### `src/assets/svg-sprites/`
Предназначена для хранения векторных иконок.<br>
При сборке файлы из данной папки объединяются в спрайты в файле: `dist/assets/img/sprites.svg`.

### `src/components/`
Предназначена для хранения компонентов проекта.<br>
[Подробнее о компонентах](/docs/03_Components.md)

### `src/core/`
Предназначена для хранения "корневых" компонентов проекта, которые не зависят от других блоков.<br>
Например: стилизованные кнопки(ссылки), компонент шаринга и так далее в зависимости от потребностей проекта.<br>
Здесь уже имеются базовые элементы, пример их использования в [`src/components/Example/Example.vue`](/src/components/Example.vue).

### `src/data/`
Предназначена для хранения данных страниц.<br>
[Подробнее о работе с данными](/docs/06_Data.md)

### `src/directives/`
Предназначена для хранения кастомных `Vue`-директив.<br>
[Подробнее о директивах](/docs/08_Directives.md)

### `src/filters/`
Предназначена для хранения функций-фильтров.<br>
[Подробнее о фильтрах](/docs/11_Filters.md)

### `src/layouts/`
Предназначена для хранения шаблонов отображения страниц.<br>
[Подробнее о шаблонах](/docs/05_Layouts.md)

### `src/mixins/`
Предназначена для хранения `Vue`-миксин.<br>
[Подробнее о миксинах](/docs/10_VueMixins.md)

### `src/pages/`
Предназначена для хранения страниц проекта.<br>
Главная страница всегда должна называться `Index.vue` для обеспечения правильной работы `pre-render` и `vue-router`!

### `src/pug/`
Папка предназначена для хранения дополнительных `Pug`-файлов.<br>
Файл `mixins.pug` служит едиными файлом для удобства подключения миксин.<br>
Добавьте сюда все миксины из папки `src/pug/mixins/`, а уже сам файл подключайте в нужный компонент.<br>

* #### `src/pug/mixins/`
    Предназначена для хранения `Pug`-миксин.

### `src/router/`
Содержит файл `index.js` служащий для добавления в проект `vue-router`.
[Подробнее о роутере](/docs/07_VueRouter.md)

### `src/scss/`
Предназначена для хранения корневых стилей проекта.
[Подробнее об SCSS](/docs/04_SCSS.md)

* #### `src/scss/mixins/`
    Папка предназначена для хранения `SCSS`-миксин.

* #### [`src/scss/mixins/_bem.scss`](/src/scss/mixins/_bem.scss)
    Файл содержит `SCSS`-функции для написания стилей по методологии `БЭМ`.
    [Подробнее](/docs/04_SCSS.md#бэм-миксины.md)

* #### [`src/scss/mixins/_breakpoint.scss`](/src/scss/mixins/_breakpoint.scss)
    Файл содержит переменные с брейкпоинтами и `SCSS`-функции для медиа-стилей.
    [Подробнее](/docs/04_SCSS.md#медиа-стили.md)

* #### [`src/scss/mixins/_misc.scss`](/src/scss/mixins/_misc.scss)
    Файл предназначен для хранения `SCSS`-миксин.
    [Подробнее](/docs/04_SCSS.md#вспомогательные-миксины.md)

* #### `src/scss/_base.scss`
    Файл предназначен для хранения базовых стилей.

* #### `src/scss/_common.scss`
    Файл служит прослойкой для автоматического импортирования миксин и переменных во все компоненты.

* #### `src/scss/_fonts.scss`
    Файл предназначен для подключения шрифтов.

* #### `src/scss/_reset.scss`
    Файл предназначен для сброса стандартных стилей браузера.

* #### `src/scss/_transitions.scss`
    Файл предназначен для описания `Vue` и `CSS` анимаций. В том числе и `@keyframes`.

* #### `src/scss/_variables.scss`
    Файл предназначен для хранения `SCSS`-переменных.

### `src/store/`
Содержит файл `index.js` служащий для настройки добавления в проект хранилища `vuex`.

### `src/utils/`
Предназначена для вспомогательных функций.
[Подробнее об утилитах](/docs/09_Utils.md)

### `src/App.vue`
Корневой компонент проекта.

### `src/main.js`
Файл для монтирования основного компонента проекта и добавления утилит/директив/плагинов.<br>
Шаблон уже содержит некоторое количество частоиспользуемых утилит/директив. Большинство из них закомментированы.<br>
Если нужно что-то добавить - просто раскомментируйте соответствующие строки.
 
### `src/utils`
Вспомогательные функции для сборщика.<br>
`routes.js` - генератор страниц для плагина пре-рендера. Парсит файлы из папки `src/pages/`.<br>
`split-json-loader.js` - загрузчик для разделения JSON-файлов. [Подробнее о работе с данными](/docs/06_Data.md)

### `.editorconfig`
Файл настроек редактора.

### `.env.localBuild.local`
Файл настроек для локальной сборки с правильными путями до вложений.<br>

### `.eslintignore`
Файл настроек `ESLint` для игнорирования файлов.

### `.eslintrc.js`
Файл настроек `ESLint`.

### `.gitignore`
Файл настроек `Git` для игнорирования файлов.

### `.gitlab-ci.yml`
Файл для автодеплоя проекта на серверы.

### `.pug-lintrc.js`
Файл настроек `pug-lint`.

### `.babel.config.js`
Файл настроек `babel`.

### `index.php`
Файл для добавления SEO-атрибутов.

### `package.json`
Файл, содержащий базовую информацию о проекте и список требуемых библиотек.

### `postcss.config.js`
Файл настроек `postcss`.

### `README.md`
Описание проекта.

### `vue.config.js`
Файл настроек `webpack` и `vue-cli`.
