---
layout: post
title: Diagonalización de Proyectores e Involuciones
---

<p align= "justify"> En esta entrada estudiaremos dos tipos básicos de transformaciones lineales y probaremos que
ambas son diagonalizables en dimensión finita. Y todo lo haremos aplicando el teorema expuesto en 
<a href = "https://uliseschialva.github.io/Diagonalizacion/">la entrada anterior</a>.
Finalmente, en la última parte presentaremos un ejemplo de aplicación sobre la transposición de matrices.</p>

<p align = "justify">Voy a plantear el modo tradicional de exposición Afirmación/Demostración, aunque todo también podría verse
como la resolución de una serie de ejercicios implícitos (que los anotaré en cursivas). También daré unos breves comentarios técnicos que pueden
obviarse en una primer lectura.</p>

<p align = "center"><font size = "+2"><b>Breve, brevísimo estudio de Proyectores e Involuciones</b></font></p>

<p align = "justify">
  <b>Definición:</b> Sea $V$ un espacio vectorial sobre un cuerpo $K$, y $P,T:V\to V$ dos transformaciones lineales.
Diremos que $P$ es un <em>proyector</em> si cumple $P\circ P = P$, y diremos que $T$ es una <em>involución</em>
si cumple $T\circ T = \mathbb{I}_V$. Escribiremos $P^2 = P\circ P$.</p>

<p align = "justify">Vamos con el primer resultado <em>(Ejercicio implícito: Probar que los valores propios de una proyección son 0 o 1,
y todos los de una involución 1 o -1.¿Depende este resultado de la dimensión del espacio vectorial?)</em></p>

<p align = "justify">
  <b>Proposición:</b> Los autovalores de una proyección son 0 y/o 1, y los de una involución 1 y/o -1.</p>
<p align = "justify">
  <b>Demostración:</b> Consideraremos primero el caso de una proyección $P:V\to V$. Si $P = \mathbb{I}$ o $0$,
en tal caso tendremos que todos sus autovalores son 1 (en el caso que $P$ sea la identidad) o 0 (en el caso que $P$
sea la trasnformación nula). Supongamos ahora que $P\neq\mathbb{I},0$. </p>
<p align = "justify">
  Notemos que si $P$ es una proyección, entonces
\begin{equation*}
P^2 = P\Rightarrow P-P^2 = 0\Rightarrow P (\mathbb{I}-P) = (\mathbb{I}-P)P = 0.
\end{equation*}
</p>
<p align = "justify">
  Sabiendo que $P\neq\mathbb{I}$, entonces existe $w\in V$ tal que $Pw\neq w$. 
Luego $(\mathbb{I}-P)w\in\mathrm{Ker}(P)$, entonces $\lambda = 0$ es autovalor de $P$.</p>        
<p align = "justify">Por otro lado, suponiendo que $P$ no es trivial, es decir $P\neq 0$, entonces existe
$v\in V$ tal que $Pv\neq 0$. Entonces $Pv\in\mathrm{Ker}(I-P)$, entonces $\lambda = 1$ es autovalor de $P$.</p>
<p align = "justify">
  Supongamos ahora que hay un autovalor $\lambda \neq 0$, entonces existe $v\neq 0$ autovector tal que
\begin{equation*}
  P(v) = \lambda v\Rightarrow P(P(v)) = P(\lambda v)\Rightarrow P(v) = \lambda^2 v\Rightarrow
   \lambda v = \lambda^2 v\Rightarrow v = \lambda v\Rightarrow \lambda = 1.
\end{equation*}
</p>
<p align = "justify">
  Luego 0 y 1 son los únicos autovalores posibles para una proyecci\'on.</p>

<p align = "justify">
  Ahora estudiemos el caso de una involución $T:V\to V$. Supongamos $T\neq\pm\mathbb{I}$, en tal caso es 
inmediato el resultado. Notemos que si $v$ es autovector y $\lambda$ autovalor entonces
\begin{equation*}
  T(v) =\lambda v\Rightarrow v = T^2(v) = \lambda^2 v\Rightarrow \lambda^2 = 1.
\end{equation*}
Luego $\lambda$ vale 1 \'o -1.</p>
<p align = "justify">
  También tendremos que $\mathbb{I}-T^2=(\mathbb{I}-T)(\mathbb{I}+T) = 0$.</p>
<p align = "justify">
  Bajo la hip\'otesis de que $T\neq -I$, tendremos $v$ tal que $T(v)\neq -v$, entonces 
$0\neq(v+T(v))\in\mathrm{Ker}(\mathbb{I}-T)$, luego $\lambda = 1$ es autovalor. Bajo la hip\'otesis 
que $T\neq I$, tendremos $v$ tal que $T(v)\neq v$, entonces $0\neq(v-T(v))\in\mathrm{Ker}(\mathbb{I}+T)$,
luego $\lambda = -1$ es autovalor. QED.</p>

<p align = "justify">
  Lo más notorio del resultado previo, es que en ningún momento utilizamos hipótesis acerca de la dimensión de $V$.
En otras palabras, el resultado anterior es totalmente general y aplicable a
proyecciones e involuciones definidas sobre<em>cualquier espacio vectorial</em></p>

<p align = "justify">
  El próximo resultado, trata acerca de la diagonalización de estos tipos de transformaciones y nos obligará
a considerar, ahora si, hipótesis acerda de la dimension de $V$ y de $K$.</p>

<p align = "justify">
  <b>Aclaración MUY técnica para puristas:</b> (no enloquecer con esta aclaración) A partir de ahora, $K$ notará a un cuerpo con
<em><a href = "https://es.wikipedia.org/wiki/Caracter%C3%ADstica_(matem%C3%A1tica)">característica</a> distinta de 2</em>.
No entraremos en mayores sutilezas algebraicas. Solo diremos que si $K = \mathbb{Q}$, $\mathbb{R}$ o $\mathbb{C}$,
el cuerpo $K$ cumple la condición de tener característica mayor que 2.</p>

<p align = "justify">
  <em>(Ejercicio implícito 2: si $V$ tiene dimensión finita, probar que $P$ y $T$ son diagonalizables).</em></p>
<p align = "justify">
  <b>Proposición:</b> Sea $V$ un $K$-espacio vectorial de dimensión finita, entonces toda proyección $P$ y toda involución $T$ son diagonalizables</p>
<p align = "justify">
  <b>Demostración:</b> Lo probaremos usando el segundo item del teorema de diagonalización expuesto en esta
entrada.</p>

<p align = "justify">
  Veamos primero el caso de la proyección $P$: dado $v\in V$ podemos escribir
\begin{equation*}
v = \underbrace{P(v)}_{E_1}+\underbrace{(v-P(v))}_{E_0}.
\end{equation*}
Como los espacios propios siempre est\'an en suma directa (ver de vuelta la lista de <a href = "https://uliseschialva.github.io/Diagonalizacion/">resultados previos</a>).
), esa descomposici\'on es \'unica. Luego $V=E_{0}\oplus E_{1}$. Si $V$ es finito dimensional, por el item <em>ii)</em> del Teorema de Diagonalización,
eso significa que $P$ es diagonalizable.</p>

<p align = "justify">
  Ahora, de manera similar, veremos el caso de una involución $T$. Sea $v\in V$, entonces podemos
escribir
\begin{equation*}
v = \underbrace{\frac{1}{2}\left(v+T(v)\right)}_{E_{1}}+\underbrace{\frac{1}{2}\left(v+T(v)\right)}_{E_{-1}}.
\end{equation*}
Como los espacios propios est\'an en suma directa, esa descomposici\'on es \'unica, y cubren todo el espacio 
$V$. Luego $V=E_{1}\oplus E_{-1}$. Si $V$ es finito dimensional, eso significa que $T$ es diagonalizable. QED.</p>

<p align = "justify">
  <b>Observación MUY técnica para puristas:</b> el hecho de que $K$ sea un cuerpo con característica distinta a 2, lo utilizamos
al demostrar que las involuciones son diagonalizables. Al utilizar el factor $1/2$ cuando descomponemos el vector $v$,
estamos asumiendo que es posible dividir por 2 (lo cual no ocurre si el cuerpo tiene característica 2, es decir, si
$K = \mathbb{Z}_2$).</p>

<p align = "center">
  <font size = "+1"><b>Un ejercicio concreto de aplicación</b></font></p>
<p><b>Ejercicio:</b> Sea el operador $T:K^{n\times n}\to K^{n\times n}$, donde $K$ es un cuerpo, definido por $T(A) = A^t$ 
para $A\in K^{n\times n}$. Demostrar que $T$ es diagonalizable y determinar sus autovalores y autovectores.</p>
<p align = "justify">
  <b>Resolución:</b> Notemos que $T$ es una involución, pues $T\circ T (A) = (A^t)^t = A$ y la dimensión 
de $V$ es $n^2$. Luego por la primera proposición, los autovalores son $1$ y $-1$, por otro lado, es muy sencillo de corroborar que
los autovecores son las matrices simétricas y antisimétricas.</p>

<p align = "justify">
  Entonces, por la proposición 2, la transformación es diagonalizable, 
y su matriz en cualquier base será semejante a
\begin{equation*}
\begin{pmatrix}
1 & 0 & 0 & ...& 0 & 0\\
0 & 1 & 0 & ... & 0 & 0\\
... & ... & ... & ...& ...& \\
0 & 0 & 0 & ... & -1 & 0\\
0 & 0 & 0 & ... & 0 & -1\\
\end{pmatrix}.
\end{equation*}
 </p>
 <p align = "justify">
  Adem\'as tendremos que $dim(E_{1}) = n(n+1)/2$ y $dim(E_{-1}) = n(n-1)/2$,
 por lo que el polinomio característico de la transformación será
 \begin{equation*}
 \mathcal{X}_{.^t}(X) = (X-1)^{\frac{n(n+1)}{2}}(X+1)^{\frac{n(n-1)}{2}}.
 \end{equation*}
</p>

