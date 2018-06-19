---
layout: post
title: Настройка XDebug
---

Пример конфигурации:

{% highlight ini %}
zend_extension=xdebug.so
xdebug.default_enable = 1
xdebug.overload_var_dump = 1
xdebug.var_display_max_children = 356
xdebug.var_display_max_depth = 16
xdebug.var_display_max_data = 1024
xdebug.collect_includes = 1
xdebug.collect_params = 4
xdebug.collect_vars = 1
xdebug.dump.REQUEST = *
xdebug.dump.SESSION = *
xdebug.dump.SERVER = *
xdebug.dump_globals = 1
xdebug.dump_undefined = 1
xdebug.show_exception_trace = 1
xdebug.idekey = "PHPSTORM"
xdebug.remote_autostart = 1
xdebug.remote_enable = 1
xdebug.remote_handler = dbgp
xdebug.remote_connect_back = 1
xdebug.remote_mode = req
xdebug.remote_port = 9000
xdebug.auto_trace = 1
xdebug.collect_assignments = 1
xdebug.collect_return = 1
xdebug.trace_format = 1
xdebug.trace_options = 0
xdebug.trace_output_dir = "/tmp"
xdebug.profiler_append = 0
xdebug.profiler_enable = 1
xdebug.profiler_enable_trigger = 1
xdebug.profiler_enable_trigger_value = "PHPSTORM_PROFILER"
xdebug.profiler_output_dir = "/tmp"
xdebug.profiler_output_name = "cachegrind.out.%p"
{% endhighlight %}

Дебагер соединяется по хосту localhost, слушает порт 9000, ключ «PHPSTORM» для IDE. Логи трасcировки и профилировщика падают по пути /tmp


