---
layout: post
title:  Reset Password Grafana
---

docker exec -u 0 -it [DOCKERID] bash

>ln -s /var/lib/grafana  /usr/share/grafana/data \
ln -s /var/log/grafana /usr/share/grafana/data/logs\
grafana-cli admin reset-admin-password --homepath "/usr/share/grafana" admin






