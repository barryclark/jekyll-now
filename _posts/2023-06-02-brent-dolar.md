---
layout: post
title: Dependencia COP/USD y el barril Brent
date: 2023-06-02
---
El petroleo referencia Brent es el producto que mas aporta a los ingresos de Colombia, entre 30% y 50%.
Debido a ese peso en las exportaciones, el barril Brent y COP/USD usualmente tienen una asociación negativa, es decir, cuando uno aumenta el otro cae. El orden de causalidad, según los economistas del país, es: precio Brent afecta el dolar en Colombia. Por ejemplo: la caida del barril en el año 2014, y posterios subida del dolar, ó el efecto sobre el peso colombiano por la caida en la demanda de combustible durante la pandemia del COVID. 

Para estudiar esta relación, se hara un análisis exploratorio de la tasa de cambio 
y el precio Brent desde el año 2010 hasta el 2023, periodo con eventos importantes. Tambien se calcularan las métricas de correlación Pearson y Spearman, de forma directa, y con resagos&mdash;el efecto del Brent sobre el dolar no es imediato, puede tener un rezago de horas ó días.

Con el análisis exploratorio tratare de responder las siguientes preguntas: ¿Hay siempre una dependencia negativa entre estas dos variables?
¿Cuales son los rezagos(lags) de su dependencia? ¿si tienen una correlación negativa, es ésta simetrica? 

# Análisis exploratorio
Empesare por hacer una exploración gráfica en donde se representa la serie de tiempo de COP/USD simultaneamente 
con el precio Brent y el índice de fortaleza del dolar(dxy). 

<div align="center">
    <img src="{{ site.baseurl }}/images/copusd_dxy.png">
</div>
<div align="center">
    <img src="{{ site.baseurl }}/images/copusd_brent.png">
</div>

En general, COP/USD se mueve en la misma dirección que dxy, y opuesta a el precio Brent. Hay periodos en los que se desconecta de la dependencia titpica con estas dos variables. En el caso del Brent, en el 2021 parece tomar un correlación positiva. Del 2010 al 2012, parece no moverse en la dirección del indice DXY.

El análisis mas sencillo de asociación es calcular las correlación de Pearson, la cual resulta ser 0.38. Es un valor positivo, lo cual nos dice que si el precio Brent aumenta, entonces el dolar tambien. Esto es contradictorio. Para encontrar la causa, podemos hacer un scatter-plot.

<div align="center">
    <img src="{{ site.baseurl }}/images/scatter_brent_copusd.png">
</div>

En la gráfica se observa que no hay una relación simple entre las dos variables; y que hay grupos de datos con correlación positiva, mientras en otros es negativa. Por ejemplo, en el año 2021(puntos verdes) se ve una relación creciente. Esto nos lleva a verificar la gráfica con colores para todos los años:

<div align="center">
    <img src="{{ site.baseurl }}/images/copusd_brent_colors.png">
</div>

Donde se observa que el año 2021 se comporta diferente al resto. Lo cual se puede verificar, en un futuro blog, para otras paises que tambien dependan del petroleo.

# Análisis de correlación

El análisis de correlación de primera mano es la de Pearson, que es lineal. Sin embargo, generalmente se encuentran muchas relaciones no-lineales. Para esto caso de no-linealidad, podemos complementar calculando la correlación de Spearman.

Tambien hay que tener en cuenta el retardo en el cambio del precio del dolar debido al cambio en el Brent. Como los datos que tenemos son diarios, calcularemos las correlaciones con retardos de días. Por ejemplo, para un retardo de 
10 días buscamos para cada fecha del precio del dolar el valor del Brent 10 días atras.