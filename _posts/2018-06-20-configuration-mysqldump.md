---
layout: post
title: mysqldump по unicode’вский
---

Если БД и данные хранятся в **UTF-8**.
То, нужно делать дамп БД правильно так. Минимум настроек.


{% highlight bash %}
mysqldump --default-character-set=utf8 -uroot -p namedatabase -r dump.sql
{% endhighlight %}


А для рестора, из полученного дампа, в БД типа UTF-8.
Правильней будет так.


{% highlight bash %}
mysql -uroot -p --default-character-set=utf8 namedatabase
mysql> SET names 'utf8';
mysql> SOURCE ./dump.sql
{% endhighlight %}

Если не делать так, тогда когда в таблице записаны в другой кодировке данные, а заливаем в utf-8. То иногда получаются невероятные ошибки.