---
layout: post
title: Ошибка 404 в админке Битрикса
---

Один из возможных вариантов, устранения проблемы с 404 в админке для вкладок «переиндексации» поиска и списка «хайлоад-блоков». 
Все дело в **.htaccess**, в моем случаи было неправильно задано правило, а именно: 

{% highlight apache %}
RewriteCond %{REQUEST_URI} ^(.*)index\.(php|html|php\/)(?:\?*)(?:\S*)$
{% endhighlight %}

В регулярке забыли прописать слэш, и из-за этого в адресной строке которая заканчивается на index.php обрезался, и получали 404 в внутри админки. 
Например в случаи списка хайлодблоков в админке **/bitrix/admin/highloadblock_index.php?lang=ru** после будет сокращен до **/bitrix/admin/highloadblock_/?lang=ru** или еще например вот для вкладки «Переиндексации» модуля поиска адресная строка **/bitrix/admin/search_reindex.php?lang=ru** сократится до **/bitrix/admin/search_re/?lang=ru** и из-за этого мы полчаем Ошибку 404 
Поэтому нужно исправить правило для Apache, и добавить слэш:

{% highlight apache %}
RewriteCond %{REQUEST_URI} ^(.*)\/index\.(php|html|php\/)(?:\?*)(?:\S*)$
{% endhighlight %}
