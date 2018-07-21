---
layout: post
title: Конфигурирование Exim4 под Debian
---

Exim4 идёт по дефолту в **Debian**. Имется почта в Яндекс с сущетсвующим паролем-прилоежнии для него. 
Конфигурировать этот файл **/etc/exim4/update-exim4.conf.conf**:
<script src="https://gist.github.com/davletyarov/89e82fe108795338c9c80866b5855acb.js"></script>

Строку в конце **/etc/exim4/passwd.client** указав почту и пароль-приложение к нему:
<script src="https://gist.github.com/davletyarov/535dc872c1dd9f24bc287fe61ab3ccdf.js"></script>
Перекофигурировать и перезагрузить службу Exim4:
<script src="https://gist.github.com/davletyarov/30546bc9df097c343cf53a1ae857372f.js"></script>

Отправляем тестовое письмо:
<script src="https://gist.github.com/davletyarov/e678e9cc933b8c8c86e45192fa0f1028.js"></script>

