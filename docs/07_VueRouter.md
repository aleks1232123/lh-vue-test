# Роутинг

Все компоненты страниц должны храниться в `src/pages/`.<br>
**Установлен плагин авто-роутинга** - не нужно вручную прописывать все пути.<br>
Плагин автоматически соберет их из этой папки.<br>

#### Обязательное условие для корректной работы:<br>
**Главная страница всегда должна называться `Index.vue`**<br>

## Именование страниц
Пример структуры и названий страниц:
```
pages/
├── Index.vue
├── Users.vue
└── Users/
    └── _id.vue
```

Будет скомпилировано в:
```js
export default [
  {
    name: 'index',
    path: '/',
    component: () => import('@/pages/Index.vue')
  },
  {
    name: 'users',
    path: '/users',
    component: () => import('@/pages/Users.vue'),
    children: [
      {
        name: 'users-id',
        path: ':id',
        component: () => import('@/pages/Users/_id.vue')
      }
    ]
  }
]
```
