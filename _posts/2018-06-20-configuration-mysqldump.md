---
layout: post
title: mysqldump по unicode’вский
---

Если БД и данные хранятся в **UTF-8**.
То, нужно делать дамп БД правильно так. Минимум настроек.
<script src="https://gist.github.com/davletyarov/b1ee50d50e330580f87249a92ef25d55.js"></script>


А для рестора, из полученного дампа, в БД типа UTF-8.
Правильней будет так.
<script src="https://gist.github.com/davletyarov/7a747c225bd54a2f20a6e211143be695.js"></script>
Если не делать так, тогда когда в таблице записаны в другой кодировке данные, а заливаем в utf-8. То иногда получаются невероятные ошибки.
