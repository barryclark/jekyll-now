#!/bin/bash

# This script should be allocated in /etc/pam.scripts/ssh_alert.sh
# Then, in /etc/pam.d/sshd add this line:
# # SSH Alert script
# session required pam_exec.so /etc/pam.scripts/ssh_alert.sh


echo $PAM_TYPE

MESSAGE="*ALERTA SSH*%0A%0A"

case $PAM_TYPE in
  "open_session")
    MESSAGE="$MESSAGE _$(date +"%Y-%m-%d %H:%M:%S")_ -  El usuario *$PAM_USER* se ha logado en el sistema desde $PAM_RHOST a través del servicio \`$PAM_SERVICE\` y TTY $PAM_TTY."
    ;;
  "close_session")
    MESSAGE="$MESSAGE _$(date +"%Y-%m-%d %H:%M:%S")_ - El usuario *$PAM_USER* se ha salido del sistema."
    ;;
esac

/home/pi/scripts/publishMessageToRaspiBot.sh "$MESSAGE" >> /dev/null

exit 0
