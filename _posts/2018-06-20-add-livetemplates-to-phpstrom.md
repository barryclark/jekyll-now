---
layout: post
title: Добавить сниппет в PHPStorm
---

Добавим сниппет в PhpStorm. Завернем конструкцию вызова нашего профилировщика **XHProf**.

Перейдем в настройку **File | Settings | Editor | Live Templates**
Выберем из доступного списка PHP. Жмём Alt+Insert для добавления нового сниппета.
Выпавшем списке выбираем Live Template.

Снизу появится дополнительная панель для заполнения сниппета.
Нужно задать **Abbreviation** это коротки вызов. Например: **xhprof-start**
**Description** — не обязательно, описание нашего сниппета. Но оно отобразится в автодополнении.
**Expand with** можете выбрать Tab как клавишу для замены сниппета.
**Template text** вбиваем код, который запускает профилировщик.

{% highlight php %}
include_once '/var/www/xhprof.local/xhprof_lib/utils/xhprof_lib.php';
include_once '/var/www/xhprof.local/xhprof_lib/utils/xhprof_runs.php';
xhprof_enable(XHPROF_FLAGS_NO_BUILTINS | XHPROF_FLAGS_CPU | XHPROF_FLAGS_MEMORY);
{% endhighlight %}
Обязательно, чтобы путь к библиотеке были верными.
**Внимание на надпись!!! No application contexts yet.**
Нужно опредилить контекст для нашего сниппета, т.е. нужно выбрать язык для которого должно срабатывать наш сниппет. Кликнем по Define и в открывшимся окне выберем PHP.

Аналогично, зададим сниппет для xhprof-end в котором определим такой код:
{% highlight php %}
$xhprofData = xhprof_disable();
$xhprofRuns = new XHProfRuns_Default();
$runId = $xhprofRuns->save_run($xhprofData,'xhprof');
{% endhighlight %}
Т.е. если в PHP коде вбить xhprof-** то в списке автодополнении появятся наши сниппеты, выбираем нужный и жмём на Tab или Enter
Всё сделано.
![Рисунок автодополнения](/images/addlivetemplatesphpstrom.png)
