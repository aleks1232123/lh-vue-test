# Анимации
### Не анимируйте сложные свойства
Для оптимизации и плавности лучше анимировать только с помощью свойств `opacity` и `transform`.<br>

Если используете анимацию без `@keyframes`, то в `transition` для элемента лучше явно указывать анимируемые свойства.<br>
Это поможет браузеру понять какие конкретно свойства нужно анимировать и повысит производительность анимаций.


## Директива для анимаций
Для простого и удобного добавления простых анимаций в шаблоне есть [`директива`](/src/directives/animate)<br>

Файл [`animate.scss`](/src/directives/animate/animate.scss) служит для описания `css-анимаций`.


## Подключение директивы
Директива уже добавлена в [`main.js`](/src/main.js).<br>
Для работы просто раскомментируйте соответствующие строки.

```js
import Animate from '@/directives/animate/animate';

Vue.use(Animate);
```

### Параметры директивы
<table>
    <thead>
        <tr>
            <th><b>Параметр</b></th>
            <th><b>Тип</b></th>
            <th><b>Default</b></th>
            <th><b>Описание</b></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>activeClass</td>
            <td><b>string</b></td>
            <td>'animate'</td>
            <td>Класс активности для запуска анимации</td>
        </tr>
        <tr>
            <td>threshold</td>
            <td><b>number</b></td>
            <td>0.25</td>
            <td>Порог запуска анимации. 0.25 = 25% элемента во viewPort. высчитывается из высоты элемента</td>
        </tr>
        <tr>
            <td>backwards</td>
            <td><b>boolean</b></td>
            <td>true</td>
            <td>Параметр для запуска анимации при скролле вверх, если страница была открыта не с первого экрана</td>
        </tr>
        <tr>
            <td>keepActive</td>
            <td><b>boolean</b></td>
            <td>false</td>
            <td>Сохранять класс активности у элементов после завершения анимации. Может пригодиться для элементов с бесконечной анимацией</td>
        </tr>
    </tbody>
</table>

> Если меняете класс активности - не забудьте так же поменять его в [`animate.scss`](/src/directives/animate/animate.scss)

### Их можно переопределить передав в аргументы при подключении:
```js
Vue.use(Animate, {
  activeClass: 'animate',
  threshold: 0.25,
  backwards: true,
  keepActive: false,
});
```

## Использование
### Самый простой и короткий способ.
Нужно просто добавить название анимации через точку.
```vue
<template>
  <div class="element" v-animate.fadeIn=""></div>
</template>
```


Название можно передать строкой:
```vue
<template>
  <div class="element" v-animate="'fadeIn'"></div>
</template>
```

### Дополнительные параметры
**Возможные параметры для элементов:**
<table>
    <thead>
        <tr>
            <th><b>Параметр</b></th>
            <th><b>Тип</b></th>
            <th><b>Описание</b></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>threshold</td>
            <td><b>number</b></td>
            <td>Порог запуска анимации. 0.25 = 25% элемента во viewPort. высчитывается из высоты элемента</td>
        </tr>
        <tr>
            <td>delay</td>
            <td><b>number</b></td>
            <td>Задержка запуска анимации в секундах. Например: <b>1.5</b></td>
        </tr>
        <tr>
            <td>keepActive</td>
            <td><b>boolean</b></td>
            <td>Сохранять класс активности у элемента после завершения анимации</td>
        </tr>
    </tbody>
</table>

> При короткой записи `ВСЕГДА(!!!)` указывайте первым параметром название анимации.<br>
    А параметр со значением добавляйте последним.

```vue
<template>
  <div class="element" v-animate.fadeIn.keepActive=""></div>
  <!-- или -->
  <div class="element" v-animate.keepActive="'fadeIn'"></div>

  <!-- пример параметра со значением -->
  <div class="element" v-animate.fadeIn.delay="0.75"></div>
  <!-- или -->
  <div class="element" v-animate.fadeIn.keepActive.threshold="1.5"></div>
</template>
```

### Если нужно указать несколько параметров - можно передать их объектом
```vue
<template>
  <div class="element" v-animate="{name: 'fadeIn', keepActive: true, delay: 0.75, threshold: 0.2}"></div>
  <!-- или передав имя как модификатор через точку -->
  <div class="element" v-animate.fadeIn="{keepActive: true, delay: 0.5}"></div>
</template>
```
