#! /bin/bash

git clean -fxd
git reset --hard HEAD
git pull

CSV_CONTATTI='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=0&single=true&output=csv'
CSV_ALLOGGI='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=2016214992&single=true&output=csv'
CSV_DONAZIONI='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=444688992&single=true&output=csv'
CSV_RACCOLTE='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=178302385&single=true&output=csv'
CSV_NOTIZIE='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=739713240&single=true&output=csv'
CSV_BOLLETTINO='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=814315&single=true&output=csv'
CSV_FABBISOGNI='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=66190431&single=true&output=csv'
CSV_VITTIME='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=1445675693&single=true&output=csv'
CSV_PRESS='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=1534569987&single=true&output=csv'
CSV_STORIE='https://docs.google.com/spreadsheets/d/e/2PACX-1vRfNyClIl9C7yvUJP7UAhoh9Al_pPKQeP5aKZ4lrnAjWtsWANelYI5qJOnJHBm2y1uj-Eqcx5Glc_Wl/pub?gid=512745056&single=true&output=csv'
#MD_vittime='http://blog.spaziogis.it/static/projs/terremotocentroitalia/vittime.md'

wget -O _data/contatti.csv $CSV_CONTATTI
wget -O _data/alloggi.csv $CSV_ALLOGGI 
wget -O _data/donazioni.csv $CSV_DONAZIONI
wget -O _data/raccolte.csv $CSV_RACCOLTE
wget -O _data/notizie.csv $CSV_NOTIZIE
wget -O _data/bollettino.csv $CSV_BOLLETTINO
wget -O _data/fabbisogni.csv $CSV_FABBISOGNI
wget -O _data/vittime.csv $CSV_VITTIME
wget -O _data/press.csv $CSV_PRESS
wget -O _data/storie.csv $CSV_STORIE

#wget -O vittime.md $MD_vittime

sed -i 's/\r$//g' _data/*.csv

git add _data
#git add vittime.md
git commit -m "auto CSV update $(date -Iseconds)"
git pull --rebase
git push

git clean -fxd
git reset --hard HEAD

