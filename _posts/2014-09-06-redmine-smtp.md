---
layout: post
title: Настройка smtp.yandex.ru и redmine
---

С введением обязательного использования SSL для почты жить стало веселее. Самое веселое настраивать приложения, которые не имеют нужных возможностей, но это не тот пост. Redmine умеет ходить по SSL и посылать почту, его просто надо настроить.

Имеем vps на DigitalOcean (да, купить проще чем настроить) с установленным из шаблона Redmine, а так же yandex почту для доменов и как всегда «ничего не работает» т.е. не работает отправка уведомлений по почте.

И так, заходим на сервер по ssh и идем к нашим конфигам, у меня это `/srv/redmine/config/`. Нас интересует `configuration.yml`. Если его нет — скопируйте и возьмите за основу лежащий рядом `configuration.yml.example`
Вас интересует секция `default`

```yaml
default:
  # Outgoing emails configuration (see examples above)
  email_delivery:
    delivery_method: :async_smtp
    smtp_settings:
      address: smtp.yandex.ru
      port: 465
      ssl: true
      enable_starttls_auto: true
      domain: company.ru
      authentication: :login
      user_name: "redmine@company.ru"
      password: "password"
```

Если и после этого не заработало, то проверьте — можно ли соединиться с smtp.yandex.ru. Выполните команду в консоле:

```shell
telnet smtp.yandex.ru 465
```

Ответ должен быть приблизительно таким:

```shell
Trying 87.250.250.38...
Connected to smtp.yandex.ru.
Escape character is '^]'.
```

Причин, по которым не соединяется может быть несколько (у меня было):
* ipv6 — да DigitalOcean почему-то не хочет соединяться с yandex по ipv6
* dns не знают о smtp.yandex.ru (а ipv6 dns и подавно). Используйте в паре dns 8.8.8.8 и 77.88.8.8

p.s. И всё же метод `:async_smtp` не такой надежный — используйте метод `:smtp`