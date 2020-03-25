#!/bin/bash

if [[ $# -ne 1 ]]
then
  echo "\nSe requiere un mensaje para enviar. Ejemplo de uso: $0 \"Mensaje de prueba\""
  exit 1
fi

source /home/$USER/.tg_keys

MESSAGE=${1// /+}
URL="https://api.telegram.org/bot$API_KEY/sendMessage?chat_id=$CHAT_ID&text=$MESSAGE&parse_mode=Markdown"

curl -i -H "Accept: application/json" -X GET -g $URL

if [[ $? -eq 0 ]]
then
  echo "\nMensaje $1 publicado."
else
  echo "\nError al publicar el mensaje. Consulta el log para más detalle."
  exit 2
fi

exit 0
