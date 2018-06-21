---
layout: post
title: Получаем все появившийся события в Bitrix
---

Чтобы получить все запущенные события во время хита, нужно сделать так.
В файле **/bitrix/modules/main/lib/entity/event.php** внутри конструктора можно перехватить и записать в лог параметры/
Добавить логирование перед вызовом конструктора предка.

{% highlight php %}

Debug::writeToFile([
    'module' => $entity->getModule(),
    'eventName' => $eventName,
    'parameters' => $parameters
]);

parent::__construct($entity->getModule(), $eventName, $parameters);

{% endhighlight %}


и в корне проекта появится лог **__bx_log.log** со всеми событиями.