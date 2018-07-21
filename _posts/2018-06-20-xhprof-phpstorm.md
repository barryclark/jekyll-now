---
layout: post
title: Профилирование с XHProf для PHP7 в отдельном хосте
---

Для начало нужно чтобы было установленно 

<script src="https://gist.github.com/davletyarov/8836f0e324e415fae54bf645d50d3910.js"></script>

Далее, скачиваем профилировщик и устанавливаем его

<script src="https://gist.github.com/davletyarov/2526bf3c37febcb3d23e62ad4a097a87.js"></script>

Далее, нужно создать файл по пути **/etc/php/7.2/mods-available/xhprof.ini** и прописать туда.
<script src="https://gist.github.com/davletyarov/978dca889bd5e95af5b6c0a445883680.js"></script>
и сделать на него символьную ссылку
<script src="https://gist.github.com/davletyarov/c86d02ee66528ca056a4ed1ca1d8fb42.js"></script>
Дальше нужно создать виртуальный хост, например **xhprof.local**
создадим файл по пути **/etc/apache2/sites-available/xhprof.local.conf** и пропишем туда конфигурацию такую
<script src="https://gist.github.com/davletyarov/5cdd482dd4e673fd14a3f681b7f914a3.js"></script>
Замечу, что я пробиваю для этого хоста параметр **func_overload** в **0** для корректной работы при отображении рисунка, графа вызовов функции.
Дальше нужно добавить наш хост **xhprof.local** в файл **/etc/hosts** строку
<script src="https://gist.github.com/davletyarov/6f91594fc29ec5b0a3044895b9de644c.js"></script>
Не забыть еще добавить наш сайт в Apache и перезагрузить его.
<script src="https://gist.github.com/davletyarov/d7324892513df63f3a50fa5430645f78.js"></script>
И все. Теперь в нужном месте, нужно будет прописать явный вызов профилировщика, например так.
<script src="https://gist.github.com/davletyarov/d2b37db712e15e627238f2519d002d36.js"></script>
В **xhprof_enable()** можно передать параметры для фиксации нужных телеметрии и можно исключить вызов встроенных функции, например такие параметры:
<script src="https://gist.github.com/davletyarov/97f0d4b57d384ecf2c3ac2d4f55b8d1e.js"></script>
После того как прописали явный участок кода, перезагрузили страницу. Нужно перейти в xhprof.local и увидете список в хронологическом порядке логи. При детальном просмотре лога.
Будет таблица, в которой параметры (столбцы) значат:
<script src="https://gist.github.com/davletyarov/9cdc3b67a13bf901b00e8657873cf8b7.js"></script>
При переходе по ссылке **View Full Callgraph**, покажется граф вызовов функции с визуальной индикацией наиболее тормознутого кода, там же можно проследить цепочку вызова и взаимосвязи между ними.
Скромный пример графа тупой страницы:


![Рисунок графа](/images/callgraph.png)
