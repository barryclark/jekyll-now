#! /bin/bash

CSV_ALLOGGI='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=2016214992&single=true&output=csv'
CSV_DONAZIONI='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=444688992&single=true&output=csv'
CSV_RACCOLTE='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=178302385&single=true&output=csv'

wget -O _data/alloggi.csv $CSV_ALLOGGI 
wget -O _data/donazioni.csv $CSV_DONAZIONI
wget -O _data/raccolte.csv $CSV_RACCOLTE
