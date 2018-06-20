---
layout: post
title: Профилирование с XHProf для PHP7 в отдельном хосте
---

Для начало нужно чтобы было установленно 

{% highlight bash %}
sudo apt isntall php7.2-dev graphviz
{% endhighlight %}

Далее, скачиваем профилировщик и устанавливаем его

{% highlight bash %}
git clone https://github.com/longxinH/xhprof.git /var/www/xhprof
cd xhprof/extension/
/usr/bin/phpize7.2
./configure --with-php-config=/usr/bin/php-config7.2
sudo make
sudo make install
{% endhighlight %}

Далее, нужно создать файл по пути **/etc/php/7.2/mods-available/xhprof.ini** и прописать туда.
{% highlight ini %}
extension=xhprof.so
xhprof.output_dir="/var/tmp/xhprof"
{% endhighlight %}
и сделать на него символьную ссылку
{% highlight bash %}
ln -s /etc/php/7.2/mods-available/xhprof.ini /etc/php/7.2/apache2/conf.d/20-xhprof.ini
{% endhighlight %}
Дальше нужно создать виртуальный хост, например **xhprof.local**
создадим файл по пути **/etc/apache2/sites-available/xhprof.local.conf** и пропишем туда конфигурацию такую
{% highlight apache %}
<VirtualHost *:80>
  ServerName xhprof.local
  <Directory /var/www/xhprof.local/xhprof_html>
    Options Indexes FollowSymLinks MultiViews
    AllowOverride All
    Order allow,deny
    allow from all
    Require all granted
<IfModule mod_php7.c>
    php_admin_value mbstring.func_overload 0
</IfModule>
</Directory>
  ServerAdmin xhprof@localhost
  DocumentRoot /var/www/xhprof.local/xhprof_html
  LogLevel debug
  ErrorLog /var/www/xhprof.local/error.log
  CustomLog /var/www/xhprof.local/access.log combined
</VirtualHost>
{% endhighlight %}
Замечу, что я пробиваю для этого хоста параметр **func_overload** в **0** для корректной работы при отображении рисунка, графа вызовов функции.
Дальше нужно добавить наш хост **xhprof.local** в файл **/etc/hosts** строку
{% highlight text %}
127.0.0.1 xhprof.local
{% endhighlight %}
Не забыть еще добавить наш сайт в Apache и перезагрузить его.
{% highlight bash %}
sudo a2ensite xhprof.local.conf
sudo systemctl restart apache2
{% endhighlight %}
И все. Теперь в нужном месте, нужно будет прописать явный вызов профилировщика, например так.
{% highlight php %}
include_once '/var/www/xhprof/xhprof_lib/utils/xhprof_lib.php';
include_once '/var/www/xhprof/xhprof_lib/utils/xhprof_runs.php'; 
xhprof_enable(XHPROF_FLAGS_CPU);
 
/**
* Тут рабочий код, для профилирования
*/
 
$xhprofData = xhprof_disable();
$xhprofRuns = new XHProfRuns_Default();
$runId = $xhprofRuns->save_run($xhprofData, 'Название профайла');
{% endhighlight %}
В **xhprof_enable()** можно передать параметры для фиксации нужных телеметрии и можно исключить вызов встроенных функции, например такие параметры:
{% highlight text %}
XHPROF_FLAGS_CPU - для фиксирования статистики процессора;
XHPROF_FLAGS_MEMORY — для памяти;
XHPROF_FLAGS_NO_BUILTINS — для игнорирования встроенных функций.
{% endhighlight %}
После того как прописали явный участок кода, перезагрузили страницу. Нужно перейти в xhprof.local и увидете список в хронологическом порядке логи. При детальном просмотре лога.
Будет таблица, в которой параметры (столбцы) значат:
{% highlight text %}
Calls — количество и процентное соотношение вызовов функции;
Incl. Wall Time — время выполнения функции с вложенными функциями;
Excl. Wall Time — время выполнения функции без вложенных функций;
Incl. CPU — процессорное время с вложенными функциями;
Excl. CPU — процессорное время без вложенных функций;
Incl. MemUse — потребление памяти с вложенными функциями;
Excl. MemUse — потребление памяти без вложенных функций;
Incl. PeakMemUse — максимальное потребление памяти с вложенными функциями;
Excl. PeakMemUse — максимальное потребление памяти без вложенных функций.
{% endhighlight %}
При переходе по ссылке **View Full Callgraph**, покажется граф вызовов функции с визуальной индикацией наиболее тормознутого кода, там же можно проследить цепочку вызова и взаимосвязи между ними.
Скромный пример графа тупой страницы:


![Рисунок графа](/images/callgraph.png)
