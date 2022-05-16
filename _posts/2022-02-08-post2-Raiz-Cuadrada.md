---
layout: post
title: Hágalo Usted mismo, la raíz cuadrada
---
<p align="justify"> Hay distintos métodos para hallar la  <a href = "https://es.wikipedia.org/wiki/Ra%C3%ADz_cuadrada#C%C3%A1lculo_de_ra%C3%ADces_cuadradas" target="_blank">raíz cuadrada</a> de un número positivo a mano, pero sus reglas por lo general requieren varios pasos. Son unas de esas
recetas que sólo la cercanı́a de un examen puede llevarnos a estudiar, incluso si somos matemáticos (ya sea que lo seamos en modo <i>amateur</i> o <i>profesional</i> ).</p>

<p align="justify"> Sin embargo, cada tanto hay salvadores que nos recuerdan que la matemática siempre consigue escaparse, exhibir su belleza y mostrar que es mucho más que aquellas reglas a memorizar, aquellos programas de estudio o esos artı́culos profesionales y estériles, publicados en revistas serias y que sólo servirán para aburrir a nuestros amigos si en alguna fiesta queremos mostrárselos.</p>

<p align="justify">Leyendo la <a href ="http://www.librosmaravillosos.com/historiadelamatematica/index.html" target = "_blank" >Historia de la Matemática</a> de Rey Pastor, encontré este desarrollo para la raı́z cuadrada, debido al matemático renacentista Pietro Cataldi (1552-1626). Hermoso, simple, riguroso... un poema en forma de <a href = "https://es.wikipedia.org/wiki/Fracci%C3%B3n_continua" target= "_blank">fracción continua</a>.</p>

<b>El <del>método</del> soneto de Cataldi</b>

Sea calcular $\sqrt{N}$ y llamemos $a\in\mathbb{N}$ al mayor entero tal que $a^2<N$. Entonces haremos:
\begin{equation}
\sqrt{N}-a = \frac{\overbrace{N-a^2}^{b}}{\sqrt{N}+a}=\frac{b}{2a+\sqrt{N}-a}.
\end{equation}
Luego, tendremos 
\begin{equation}
\sqrt{N} =a+\frac{b}{2a+\sqrt{N}-a},
\end{equation}
y en esta última expresión, donde está $\sqrt{N}-a$ ponemos la fórmula que ya obtuvimos previamente, y nos queda
\begin{equation}
\sqrt{N} =a+\frac{b}{2a+\underbrace{\sqrt{N}-a}_ {\frac{b}{2a+\sqrt{N}-a}}} = a+\frac{b}{2a+\frac{b}{2a+\sqrt{N}-a}},
\end{equation}
y así sucesivamente: cada vez que aparezca $\sqrt{N}-a$ lo reemplazamos por $\frac{b}{2a+\sqrt{N}-a}$. Así conseguimos
\begin{equation}
\sqrt{N} = a+\frac{b}{2a+\frac{b}{2a+\frac{b}{2a+\frac{b}{2a+\frac{b}{...}}}}}.
\end{equation}

Un método mucho más fácil de recordar que aquellas recetas tradicionales con varios pasos.

<b>Un ejemplo:</b>
<p align="justify"> Hagamos una ilustración sencilla hallando $\sqrt{2}$. Entonces $N = 2$, $a = 1$ y $b = N-a^2 = 1$. Tomemos sólo la aproximación de considerar los cinco primeros pasos:</p>
\begin{equation}
\sqrt{2} = 1+\frac{1}{2+\frac{1}{2+\frac{1}{2+\frac{1}{2+\frac{1}{2+\frac{1}{2+...}}}}}}\approx 1+\frac{1}{2+\frac{1}{2+\frac{1}{2+\frac{1}{2+\frac{1}{2}}}}},
\end{equation}
Trabajemos la última fracción:
\begin{equation}
\begin{aligned}
\sqrt{2}&\approx 1+\frac{1}{2+\frac{1}{2+\frac{1}{2+\frac{1}{2+\frac{1}{2}}}}}=
1+\frac{1}{2+\frac{1}{2+\frac{1}{2+\frac{2}{5}}}}\\
&= 1+\frac{1}{2+\frac{1}{2+\frac{5}{12}}} = 1+\frac{1}{2+\frac{12}{29}} = 1+\frac{29}{70}
\end{aligned}
\end{equation}
y con esta aproximación resulta $\sqrt{2}\approx 1.414285714$, es decir, obtuvimos cuatro decimales exactos.

<p align="justify">
<b>A modo de conclusión</b>, lo anterior podría expresarse como un teorema ''sea $N\in\mathbb{R}$, $a\in\{z\in\mathbb{Z}: a^2<N\}$, entonces bla, bla, bla...'', y luego viene la demostración que cerramos con un bello $\blacksquare$. Pero sería injusto hacer eso con el razonamiento precioso y riguroso de Cataldi. Sucede que la estructura <a href = "https://es.wikipedia.org/wiki/Nicolas_Bourbaki" target = "_blank">bourbakista</a> de la matemática a la que estamos acostumbrados, si bien constituye un gran logro intelectual, no le hace justicia al <i>pensamiento</i> matemático, que a menudo (por no decir casi siempre) sucede como en el ejemplo anterior: se parte de una expresión (en este caso $\sqrt{N}-a$), se procede de manera lógica y rigurosa, y al final obtenemos un resultado que jamás habríamos esperado. Busquen cualquier libro de matemática previo a 1950, verán que este era el camino elegido para presentar la mayoría de los resultados.</p>
