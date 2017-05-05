---
layout: post
title: Usuarios y grupos en linux
---

Si bien es cierto que hoy en día la gestión de usuarios y grupos en linux se puede realizar utlizando herramientas como si de Windows se tratara, es cierto que los más puristas o un buen administrador de sistemas debe conocer los comandos básicos para la creación, eliminación y modificación de usuarios y grupos.

# Usuarios:
* **Creación de usuarios:** useradd
  * **-m, --create-home:** crea el directorio personal del usuario.
  * **-G, --groups GRUPOS :** lista de grupos suplementarios de la nueva cuenta.
  * **-p, --password CONTRASEÑA:** contraseña cifrada de la nueva cuenta.
  
  Ejemplo: 
  ``` bash
  sudo useradd usuario_prueba -p entra -g users -m
  ```
 * **Eliminación de usuarios:** userdel
   * **-f, --force:** forzar la eliminación de los ficheros.
   * **-r, --remove:** elimina el directorio personal y el buzón de correo.
   
  Ejemplo:
  ``` bash
  sudo userdel usuario_prueba
  ```
# Grupos:

Lo primero que debemos saber es a qué grupos pertenece un usuario, para ello hemos de utilizar el comando **groups**, de la siguiente forma groups usuarios.

* **Creación de grupos:** groupadd

  Ejemplo:
  ```bash
  sudo groupadd grupo_prueba
  ```
  
* **Eliminación de grupo:** groupdel

  Ejemplo:
  ``` bash
  sudo groupdel grupo_prueba
  ```
* **Añadir usuario a un grupo:** adduser
  
  Ejemplo:
  ```bash
  sudo adduser usuario_prueba grupo_prueba
  ```
  
* **Quitar usuario de un grupo:** deluser

  Ejemplo:
  ``` bash
  sudo deluser usuario_prueba grupo_prueba
  ```
