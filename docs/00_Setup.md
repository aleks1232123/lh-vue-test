# Установка и работа со сборкой
Пример c NPM и yarn.

### Установка зависимостей
```
npm install
yarn install
```

### Компиляция и запуск dev-server для режима разработки
```
npm run serve
yarn serve
```

### Компиляция и минификация для продакшн-сервера.
```
npm run build
yarn build
```

### То же что и build, но с локальными путями для отладки
```
npm run localBuild
yarn localBuild
```

### Запуск линтера для выявления и исправления ошибок
```
npm run lint
yarn lint
```

## Деплой
Автодеплой происходит из ветки **stage** на бета-сервер `lifebeta.ru/special/<PROJECT_NAME>`<br>
Если хотите запустить автодеплой на продакшн-сервер `lifehacker.ru/special/<PROJECT_NAME>` -<br>
нужно раскомментировать соответствующую часть кода в **gitlab-ci.yml** и запушить в ветку **master**.

## Общие настройки
В файле index.php указать $projectName и meta данные проекта.
В файле index.html в GoogleAnalyticsObject поменять дату на актуальную дату релиза проекта.
