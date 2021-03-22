---
layout: post
title: Hola mundo - Powershell
---

Hay muchas maneras de obtener un mismo resultado cuando trabajamos con Powershell. 

Veamos un ejemplo sencillo con el cual todo buen programador empieza en este mundo de codigos.

*Aquí el código en powershell*

```powershell
> Write-Host "Hola Mundo!"
"Hola Mundo!"
```
Usamos Write-Host para imprimir el texto "Hola mundo!"

Veamos un ejemplo más de como se puede hacer lo mismo utilizando Write-Output 

*Aquí el código en powershell*

```powershell
> Write-Output "Hola Mundo!"
"Hola Mundo!"
```

Vale la pena señalar que aunque Write-Output y Write-Host muestran un texto en la pantalla, hay una sutil diferencia. Write-Host escribe solo en la salida estándar (es decir, la pantalla de la consola), mientras que Write-Output escribe tanto en la salida estándar como en la secuencia de salida [éxito] permitiendo utilizar este valor nuevamente. Esto permite que la salida de un comando se dirija como entrada a otro, incluida la asignación a una variable.

*Veamos*

```powershell
> $mensaje = Write-Output "Hola Mundo!"
> $mensaje
"Hola Mundo!"
```

*Y por último tambien podríamos tipear directamente para mostrar el texto en la pantalla*

```powershell
> "Hola Mundo!"
"Hola Mundo!"
```






