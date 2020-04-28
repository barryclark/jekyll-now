---
layout: post
title: Pipenv cheatsheet
categories:
  - buenas prácticas
  - python
tags:
  - python
  - pipenv
published: true
---

> La vida es muy simple, pero nos empeñamos en hacerla difícil - Confucio -

# ¿Qué es pipenv?
Si quieres saber que es pipenv visita: [https://pipenv-es.readthedocs.io/es/latest/](https://pipenv-es.readthedocs.io/es/latest/)  

# Cheatsheet
## pipenv install
Crea un nuevo entorno virtual si no existe. Crea un pipfile si no existe

## pipenv shell
Activa el entorno virtual

## deactivate
Desactiva el entorno virtual actual
## pipenv install <package>
Instala un paquete 
## pipenv install <package> --dev
Instala un paquete solo para desarrollo
## pipenv unistall <package>
Desinstala un paquete
## pipenv clean
Desinstala paquetes que no están en el pipfile.lock
## pipenv graph
Muestra el grafo de dependencias
## pipenv run <command>
Ejecuta un comando dentro de un entorno virtual sin activarlo
## pipenv check
Check vulnerabilidades de seguridad
## pipenv check --unused .
Muestra **potenciales** dependencias sin usar. Cuidado, por ejemplo, en un proyecto gunicorn detecta como no usados: gunicorn y json-logging-py -_-'
## pipenv lock -r > requirements.txt
Crea un fichero requirements.txt
## pipend install -r requirements.txt
Importa un fichero requirements.txt en el pipfile. Revisa las versiones
## pipenv intall -c .
Descubre los requerimientos dentro de tu código
## pipenv --rm
Borra un entorno vitual
## pipenv --support
Para obtener la información detalla de pipenv en caso de problemas


# Otras cosas a tener en cuenta
- pipenv carga ficheros .env de forma autómatica
- Si tienes muchos entornos y tienes que hacer activar y saltar entre ellos: https://github.com/gtalarico/pipenv-pipes
- Alternativa a pipenv -> https://python-poetry.org/

