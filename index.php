<?php

// Например
$req_uri = $_SERVER['REQUEST_URI']; // Например, получим '/special/pik/article/17'



$projectName = "projectName"; // Например, avito
$host = 'https://' . $_SERVER['HTTP_HOST'] . '/';

// Если мета-данные статичны, просто заполняем руками

$title = 'TITLE HERE';
$title_soc = $title;
$description = 'DESCRIPTION HERE';
$description_soc = $description;
$image = $host . $projectName . '/dist/share.jpg';
$canonical = $host . $projectName . '/';

$metas = [
    '[TITLE]' => $title,
    '[TITLE_SOC]' => $title_soc,
    '[DESCRIPTION]' => $description,
    '[DESCRIPTION_SOC]' => $description_soc,
    '[IMAGE]' => $image,
    '[CANONICAL_URL]' => $canonical,
];

// Получаем содержимое dist/index.html

$index_file = file_get_contents(__DIR__ . '/dist/index.html');

// Делаем замену плейсхолдеров

foreach ($metas as $key => $value)
    $index_file = str_replace($key, $value, $index_file);

echo $index_file;

exit;

// чтобы увидеть плейсхолдеры, см. исходный файл index.html в корне проекта
