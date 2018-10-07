---
layout: post
title: Custom Fields in Drupal 8
categories:
  - github
  - drupal
  - custom
comments: true
---


## Creacion de campos compuestos o personalizados (custom fields)

A medida que comenzamos a desarrollar en Drupal nos vamos encontrando con la necesidad de reutilizar grupos de campos simples. 
Por ejemplo, a la hora almacenar la información personal de N personas. 
No tendremos problema si el formulario almacena solo la información de 1 persona en cada iteración; pero, ¿Y si nuestro sistema es un registro de agrupaciones? 

Para explicar como crear y utilizar campos compuestos (custom fields) utilizaremos el siguiente caso de ejemplo:

Nuestro Drupal almacenará el registro de asociaciones de vecinos de nuestro municipio. Para cada Asociación deberemos almacenar los datos personales de cada miembro de la junta directiva, es decir, al menos Presidente, Secretario y Tesorero.

La información que almacenaremos de cada miembro será:
  * Nombre
  * Apellidos
  * Cargo
  * DNI
  * Telefono
  * E-mail
 
 
Y para cada Asociacion almacenaremos:
  * Nombre Asociación
  * Nº Miembros
  * Miembro de la Junta Directiva

[Linkedin](http://linkedin.com)

`una linea de codigo de prueba`
