---
layout: post
title: Перехватить данные и пробросить их дальше c result_modifier.php 
---

Фишка вот в чем.
Есть компонент в **Bitrix**, все работает. Ок.
Нужно просто изменить поступающие данные в компонент при этом не копировать его шаблон вообще. 

И так. 
Например, нужно изменить данные *$arParams* для компонента **crm.interface.filter**

Cоздаем у себя точь в точь директорию того шаблона из компонента которую хотим расширить
**/local/templates/.default/components/bitrix/crm.interface.filter/flat**
в ней само собой два файла должны быть **result_modifier.php** и **template.php**

По поводу файла **template.php**, его сущ. **обязательно** иначе финт не сработает.
Пропишите проверку ядра и все, хватит.

{% highlight php %}
<?php if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
/**
 * @global CMain $APPLICATION
 * @var array    $arParams
 * @var array    $arResult
 */
{% endhighlight %}

Дальше, дело с **result_modifier.php** в ней обязательно эти строчки

{% highlight php %}
<?php if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
/**
 * @global CMain $APPLICATION
 * @var array    $arParams
 * @var array    $arResult
 */

// зеркально указываем оригинальное место нахождение директори шаблона, которую мы хотим расширить косвенно
$this->__folder = '/bitrix/components/bitrix/crm.interface.filter/templates/flat'; 

// указываем на сам шаблон
$this->__file = '/bitrix/components/bitrix/crm.interface.filter/templates/flat/template.php';

// эти строчки нужны чтобы сработали стили и скрипты
$this->__hasCSS = true;
$this->__hasJS = true;

{% endhighlight %}

И все, теперь у нас в руках косвенное расширение компонента. Не трогая оригинал.
Выкручиваемся так как можем, ребята. 
Это битрикс :(