---
layout: post
title: nguyenhung log!
---

#Send message when ssh to server
##Step 01: Create file telegram-send.sh
>vi telegram-send.sh

```bash
#!/bin/bash
BOT_TOKEN=5914125474:AAEcEaGH70y7Mvo3AOyo5leNP6AP6vdliBo
if [ "$1" == "-h" ]; then
echo "Usage: `basename $0` \"text message\""
exit 0
fi

if [ -z "$1" ]
then
echo "Add message text as second arguments"
exit 0
fi

if [ "$#" -ne 1 ]; then
echo "You can pass only one argument. For string with spaces put it on quotes"
exit 0
fi

curl -s --data "text=$1" --data "chat_id=5434140366" 'https://api.telegram.org/bot5914125474:AAEcEaGH70y7Mvo3AOyo5leNP6AP6vdliBo/sendMessage' > /dev/null
```
##Step 02: Grant permission and mv file /usr/bin
> chmod +x telegram-send.sh \
mv telegram-send.sh /usr/bin/telegram-send \
chown root:root /usr/bin/telegram-send

##Step 03: Create file login-notify.sh

> vi login-notify.sh

```bash
#!/bin/bash
# prepare any message you want
login_ip="$(echo $SSH_CONNECTION | cut -d " " -f 1)"
login_date="$(date +"%e %b %Y, %a %r")"
login_name="$(whoami)"
# For new line I use $'\n' here
message="New login to server"$'\n'"$login_name"$'\n'"$login_ip"$'\n'"$login_date"
#send it to telegram
telegram-send "$message"
```

##Step 04: mv /etc/profile.d

> mv login-notify.sh /etc/profile.d/login-notify.sh
