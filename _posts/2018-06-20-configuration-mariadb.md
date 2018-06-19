---
layout: post
title: Конфигурация всего у MariaDB на UTF8_UNICODE_CI
---

Добавить эти конфигурационные параметры в файл **/etc/mysql/my.cnf**


{% highlight text %}
[client]
default-character-set=utf8
 
[mysql]
default-character-set=utf8
 
[mysqld]
sql-mode=''
init_connect='SET collation_connection = utf8_unicode_ci'
init_connect='SET NAMES utf8'
character-set-server=utf8
collation-server=utf8_unicode_ci
skip-character-set-client-handshake
{% endhighlight %}

Вывод **SHOW VARIABLES**.

{% highlight bash %}
+----------------------+-----------------+
| Variable_name        | Value           |
+----------------------+-----------------+
| collation_connection | utf8_unicode_ci |
| collation_database   | utf8_unicode_ci |
| collation_server     | utf8_unicode_ci |
+----------------------+-----------------+
{% endhighlight %}

{% highlight text %}
+--------------------------+----------------------------+
| Variable_name            | Value                      |
+--------------------------+----------------------------+
| character_set_client     | utf8                       |
| character_set_connection | utf8                       |
| character_set_database   | utf8                       |
| character_set_filesystem | binary                     |
| character_set_results    | utf8                       |
| character_set_server     | utf8                       |
| character_set_system     | utf8                       |
| character_sets_dir       | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+

{% endhighlight %}
