---
layout: post
title: Парсим сайты на php
---

Так повелось, что rss стал отходить в сторону. Новости и анонсы стали помещать в twitter. А некоторые вообще не утруждают себя такой вещью, хочешь новостей зайди на сайт.

Потребовалось мне собирать новости по всем провайдерам нашего города. Провайдеров много, конкуренция большая, провайдеры борются за клиента кто как может. Сейчас с почти самой низкой ценой в РФ, провайдеры стали предлагать дополнительные услуги... в общем новостей полно и в ручную ходить по сайтам и собирать новости сплошные мучения.

И так у нас есть: лень, еще немного лени, знание php, выделенный сервер, немного рабочего/домашнего времени что бы все автоматизировать и пореже прикасаться к этому.

Берем для примера Росстелеком, а конкретно Воронежское отделение http://www.voronezh.center.rt.ru/press/news/

Для начала, чем разбирать… я предпочел [simplehtmldom](http://simplehtmldom.sourceforge.net/), ибо прост, документирован, удобен и регулярные выражения ломают мне мозг.

Для генерации RSS воспользуемся [готовым классом](http://www.phpclasses.org/package/4427-PHP-Generate-feeds-in-RSS-1-0-2-0-an-Atom-formats.html), написанный англоговорящим индусом. Прост, но нуждается в небольшой правке.

В файле FeedWriter.php 298 строку надо привести к виду:

```php
$nodeText .= (in_array($tagName, $this-&gt;CDATAEncoding))? $tagContent :htmlentities($tagContent, ENT_QUOTES, 'UTF-8');
```

Иначе у нас будут кракозяблы.

И так простенькая функция для получения данных curl, ибо ограничения на сервере.

```php
function getUrlFromCurl($url)
{
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
$urlhtml = curl_exec($ch);
curl_close($ch);
$html = str_get_html($urlhtml);
return $html;
}

$url = "http://www.voronezh.center.rt.ru/press/news/";
$url2 = "http://www.voronezh.center.rt.ru";

$html = getUrlFromCurl($url);

$Feed = new FeedWriter(RSS2);

$Feed->setTitle('Росстелеком');
$Feed->setLink($url);
$Feed->setDescription('Ростелеком - Воронежская область - Пресс-центр');

$dom = $html->find(".newsblock");
```

* Заносим url в переменную.
* Хватает curl страницу.
* Создаем новый объект Feed
* У нового объекта устанавливаем заголовок, url, и описание.

Значит нам нужны все *div* с классом *newsblock*. Соответственно хватаем нужно с помощью

```php
$dom = $html->find(".newsblock");
```

Далее разберем массив

```php
foreach ($dom as $value) {
    $zagNews = $value->find(".zagNews",0);
    $title = $zagNews->find('a',0)->plaintext;
    $link = $zagNews->find('a',0)->href;

    $html2 = getUrlFromCurl($url2.$link);

    $news = $html2->find(".news-item",0);
    $date = $news->find("h4",0)->plaintext;
}
```

* Хватаем вложенный `div` с классом `zagNews`, и он у нас 0 элемент
* Ищем в нем тег `a` и хватаем из него текст, это будет заголовком
* От туда же хватаем ссылку, по которой мы потом перейдем и скачаем всю новость.
* Скачиваем новость целиком curl
* Полностью запись оформлена в `div` с классом `news-item`
* Оттуда же хватаем дату новости, она зачем-то оформлена заголовком h4 и берем ее как plaintext.

Осталось оформить это в фид и получится код

```php
<?php
include_once 'simple_html_dom.php';
include_once 'FeedWriter.php';
header("Content-Type: text/html; charset=utf-8");

$Feed = new FeedWriter(RSS2);
$url = "http://www.voronezh.center.rt.ru/press/news/";
$url2 = "http://www.voronezh.center.rt.ru";
$html = getUrlFromCurl($url);

$Feed = new FeedWriter(RSS2);
$Feed->setTitle('Росстелеком');
$Feed->setLink($url);
$Feed->setDescription('Ростелеком - Воронежская область - Пресс-центр');</code>

$dom = $html->find(".newsblock");

foreach ($dom as $value) {
    $zagNews = $value->find(".zagNews",0);
    $title = $zagNews->find('a',0)->plaintext;
    $link = $zagNews->find('a',0)->href;

    $html2 = getUrlFromCurl($url2.$link);

    $news = $html2->find(".news-item",0);
    $date = $news->find("h4",0)->plaintext;

    $Item = $Feed->createNewItem();

    $Item->setTitle($title);
    $Item->setLink($url2.$link);
    $Item->setDate($date);
    $Item->setDescription($news);

    $Feed->addItem($Item);
}

$Feed->genarateFeed();

function getUrlFromCurl($url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
    $urlhtml = curl_exec($ch);
    curl_close($ch);
    $html = str_get_html($urlhtml);
    return $html;
}
?>

```

Недостатки:

* Слишком долго парсится, т.к. не мультипоточный и тянет каждый раз все записи (для больше надо пользоваться curl_multi)
* Писать в БД было бы разумнее
* Это получился фид для себя любимого, который рассчитан на 1 проверку в час. Если будет много пользователей — начнутся проблемы
* simplehtmldom не лучшая по скорости библиотека, хоть и проста
* simplehtmldom ломается на не валидной или кривой разметке