---
layout: post
title: Tema 2 de Acceso a Datos
---
### Introducción a SQL
Este es mi resumen del Tema 2 de Acceso a Datos, del 2º curso del Ciclo de Desarrollo de Aplicaciones Multiplataforma.

## Tipos de Datos
Tipo | Descripción
-- | --
__CHAR(n)__ | String de longitud fija de n caracteres (máximo 255 caracteres).
__VARCHAR2(n)__ | String de logitud variable de n caracteres (máximo 2000 carcteres).
__NUMBER(n,m)__ | Numérico de longitud n con m decimales (máximo 38 dígitos).
__LONG__ | Cadenas de caracteres de longitud variable (hasta 2 gigabytes de información).
__DATE__ | Fechas y horas (Siglo/Año/Mes/Día/Hora/Minutos/Segundos).
__RAW__ | Datos binarios (cadenas de bytes hasta 255 bytes).
__LONG RAW__ | Almacenamiento de gráficos, sonidos, etc. (hasta 2 Gigabytes).
__ROWID__ | Dirección que identifica de forma única a una fila de una tabla.

## Consultas de Datos
### Sentencias SELECT
- #### Sintaxis:
```sql
SELECT [ALL | DISTINCT] [expre_colum1, expre_colum2, .., expre_column | * ]
FROM [nombre_tabla1., ncmbre_tabla2......nombre_tablan]
[WHERE condición]
[ORDER BY <expre_colum [DESC | ASC] [ ,expre_colum [DESC | ASC]...];
```
___Uso de Alias___:
```sql
  SELECT  nombre_tabla [AS] "alias" FROM ...
```
- #### Operadores de Comparación y Lógicos:
__'='__ (igual que), __'>'__ (mayor que), __'<'__ (menor que), __'>='__ (mayor o igual que), __'<='__ (menor o igual que),
__'!='__ o __'<>'__ (distinto de).
__AND__ (Y lógico), __OR__ (O lógico), __NOT__ (NO lógico)
- #### Operadores de Comparación de Cadenas:
__'%'__ : Comodín (Cualquier cadena de 0 o más caracteres).
__'_'__ : Marcador de posición (Cualquier un carácter cualquiera).

  ___Sintaxis___:
  ```sql
    ... WHERE columns LIKE 'caracteres_especiales' ...
  ```
- #### NULL y NOT NULL:
Se dice que una columna de una fila es _NULL_ si está completamente vacía.
Para comprobar si el valor de una columna es nulo empleamos la expresión: ___column IS NULL___.
Si queremos saber si el valor de una columna no es nulo, usamos la expresión: columna ***column IS NOT NULL***.

- #### Comprobaciones de Conjuntos de valores:
  - **IN**
  El operador *IN* nos permite comprobar si una expresión pertenece o no (_NOT_) a un conjunto de valores.
    ```sql
  <expresión> [NOT] IN (lista de valores separados por comas)
```
 - **BETWEEN**
El operador *BETWEEN* comprueba si un valor está comprendido o no (*NOT*) dentro de un rango de valores, desde un valor inicial a un valor final.
  ```sql
<expresión> [NOT] BETWEEN valor_inicial AND valor_final)
```
- #### SUBCONSULTAS:
Se utilizan para realizar alguna operación de consulta a partir de los datos devueltos por otra consulta.

  ___Sintaxis___:
```sql
  SELECT ... FROM ... WHERE columna operador_comparativo (SELECT ... FROM ... WHERE ...);
```
 - #### Subconsulta que generan valores simples:
 Se trata de aquellas subconsultas que devuelven una fila o un valor simple.
 ```SQL
 SELECT APELLIDO FROM EMPLE WHERE OFICIO = (SELECT OFICIO FROM EMPLE WHERE DEPT_NO = 20);
 ```
 - #### Subconsulta que generan listas de valores:
 Son aquellas subconsultas que devuelven más de una fila o más de un valor.
 Cuando una subconsulta devuelva más de un valor, usaremos el operador ***IN*** en la cláusula *WHERE*.
 ```SQL
 SELECT APELLIDO FROM EMPLE WHERE OFICIO IN (SELECT OFICIO FROM EMPLE WHERE DEPT_NO = 20);
 ```
- #### COMBINACION DE TABLAS:
Consultas de columnas de varias tablas. Las tablas se expresarán a la derecha de la palabra *FROM*.
 ```SQL
 SELECT columnas de tablas citadas en cláusula_from FROM tabla1, tabla2, ...
 WHERE tabla1.columna = tabla2.columna;
 ```
