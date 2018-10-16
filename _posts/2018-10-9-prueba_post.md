---
layout: post
title: Custom Fields in Drupal 8
categories:
  - github
  - drupal
  - custom
comments: true
visible: 1
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

Una de las posibles soluciones, sobre todo para aquellos que se enfocan más hacia el site-building en Drupal 8, es el uso del **módulo "Field Collection"**. Este módulo nos permite agrupar varios campos a traves de la interfaz de Drupal de modo que podamos utilizar esta agrupación (colección) al igual que si se tratase de un único campo.

El problema de este módulo es que presenta ciertas difilcultades a menudo y no resulta una solución realmente robusta.
Pero es una solución a tener en cuenta si no vas a utilizar muchos campos compuestos y/o no te apetece arremangarte para codificarlos a mano.

Podrás encontrar el Módulo Field Collection en el siguiente enlace:
[Field Collection](https://www.drupal.org/project/field_collection)

Si nos decantamos por codificar nosotros mismos nuestro "custom field" necesitaremos en primer lugar crear un módulo.
Para crear un módulo en Drupal 8 podemos seguir el siguiente árticulo de José Antonio Rodríguez: [Como crear un módulo en Drupal 8](https://www.ladrupalera.com/es/drupal/desarrollo/drupal8/crear-un-modulo-en-drupal-8)