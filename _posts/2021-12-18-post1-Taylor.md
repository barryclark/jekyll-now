---
layout: post
title: Polinomio de Taylor en dos variables
---
<i>Lo siguiente son algunos apuntes que armé para un concurso recientemente rendido, el tema de exposición fue la Fórmula de Taylor en dos variables. Salí segundo, pero creo que los apuntes quedaron lindos. Son tres apuntes: uno con resultados (sin demostraciones), otro con la demostración de la fórmula de Taylor y un tercero con ejercicios resueltos.</i>

<i> Aquí los pueden descargar: <a href = "https://drive.google.com/file/d/1pQJFa5nNHgjibx8G1PQB3EaAsqJagjVb/view?usp=sharing" target="_blank">Resultados</a>, <a href="https://drive.google.com/file/d/1pJi5mmGerrfOUmi2_OkzloG8k099ztJy/view?usp=sharing" target="_blank">Demostración</a>, <a href="https://drive.google.com/file/d/1WORhSLhlQ8JPgoqidI4b6vuflTpd8Lxq/view?usp=sharing" target="_blank">Ejercicios</a></i>

# Resultados básicos

<b>Definición:</b>Diremos que la función $z = f(x,y)$ es diferenciable en el punto $(x_0,y_0)$ si está unívocamente definida en un entorno de este punto y su incremento se expresa así:
\begin{equation}
\Delta z_0 = f(x_0+\Delta x_0,y_0+\Delta y_0)-f(x_0,y_0) = \mathrm{A}\Delta x_0+\mathrm{B}\Delta y_0+o(\rho),
\label{incremento}
\end{equation}
como función lineal homogénea de los incrementos independientes $\Delta x_0$, $\Delta y_0$ con coeficientes constantes $\mathrm{A}$ y $\mathrm{B}$, y $\rho$ es un infinitésimo de orden superior a $\sqrt{\Delta x_0^2+\Delta y_0^2}$.


Se llama diferencial total de una función diferenciable a la parte lineal de \eqref{incremento}, y es designado por
\begin{equation}
dz_0 = \mathrm{A}\Delta x_0+\mathrm{B}\Delta y_0.
\label{dif1}
\end{equation}


En particular, si $x$ e $y$ son variables independientes, obtendremos que $dx = \Delta x$ y $dy = \Delta y$, por lo que en un punto genérico $(x,y)$ la expresión \eqref{dif1} se puede escribir de la siguiente forma:
\begin{equation}
dz = df(x,y) = f_x(x,y)dx +f_y(x,y)dy,
\label{df1}
\end{equation}
    que se denomina <i>expresión analítica del diferencial</i>, para distinguirla de la definición \eqref{dif1}.


<b>Diferenciales sucesivos y la fórmula simbólica:</b> Observando la expresión \eqref{dif1} del diferencial de $z = f(x,y)$:
\begin{equation}
df = f_x(x,y)\Delta x+f_y(x,y)\Delta y,
\end{equation}
vemos que $df$ depende de $x$ e $y$ (pues las derivadas parciales son funciones del par $(x,y)$), y también de los incrementos $\Delta x$ y $\Delta y$.

Si damos valores constantes a los incrementos $\Delta x$ y $\Delta y$, el diferencial es una función únicamente de $(x,y)$, y considerada como una función de estas dos variables podrá tener a su vez un diferencial que llamaremos <i> diferencial segundo de $f$</i> e indicaremos con $d^2f$:
\begin{equation}
d^2f = d(df).
\end{equation}

Análogamente representaremos el diferencial tercer, cuarto,..., de enésimo orden de $f(x,y)$ por $d^3f$, $d^4f$,...,$d^nf$.
En general, si existen y son continuas las derivadas $n$-ésimas en el punto considerado y $x$ e $y$ son variables independientes, entonces $dx = \Delta x$ y $dy = \Delta y$ y se verifica la siguiente <i> fórmula simbólica</i>
\begin{equation}
\begin{split}
d^nf &= \left(dx\frac{\partial}{\partial x}+dy\frac{\partial}{\partial y}\right)^{(n)}f(x,y)\\
&= \sum_{i = 0}^{n}{n\choose i}dx^{(n-i)}dy^{i}\frac{\partial^nf}{\partial x^{(n-i)}\partial y^i}(x,y).
\end{split}
\label{difsym}
\end{equation}

<i>Hay que señalar que la expresión anterior no constituye una definición del diferencial $n$-ésimo. Se trata sólo de una expresión que, bajo ciertas condiciones sobre las derivadas parciales, permite obtener dicho diferencial.</i>

    
<b>Fórmula de Taylor para dos variables:</b> Supongamos que la función $z = f(x,y)$ tiene en un entorno $\mathcal{U}$ del punto $(a,b)$ derivadas parciales continuas hasta el orden $(n+1)$ inclusive. Sean $h,k$ tales que el rectángulo formado por los vértices 
\begin{equation}
\{(a,b),(a+h,b),(a,b+k),(a+h,b+k)\}
\end{equation}
 esté contenido en el entorno $\mathcal{U}$, entonces se verifica la <i> fórmula de Taylor</i>:
\begin{equation}
\begin{split}
f(a+h,b+k) = f(a,b)+\frac{1}{1!}&\left[hf_x(a,b)+kf_y(a,b)\right]+\\
&+...+\frac{1}{n!}\left[h\frac{\partial}{\partial x}+k\frac{\partial}{\partial y}\right]^{(n)}f(a,b)+R_n(h,k),
\end{split}
\label{taylor1}
\end{equation}
donde
\begin{equation}
R_n(h,k) = \frac{1}{(n+1)!}\left[h\frac{\partial}{\partial x}+k\frac{\partial}{\partial y}\right]^{(n+1)}f(a+h\theta,b+k\theta),\quad\left(0<\theta<1\right).
\label{resto}
\end{equation}

Si en \eqref{taylor1} se pasa el primer término del miembro derecho al primero, empleando la notación diferencial, podemos escribir la fórmula de Taylor como
\begin{equation}
\Delta f(a,b) = \sum_{i = 1}^{n}\frac{d^if(a,b)}{i!}+\frac{d^{(n+1)}f(a+h\theta,b+k\theta)}{(n+1)!},\quad\left(0<\theta<1\right),
\label{taylor2}
\end{equation}

En el desarrollo \eqref{taylor1}, los incrementos $h$ y $k$ pueden ser reemplazados por $(x-a)$ y $(y-b)$ respectivamente, y así resulta
\begin{equation}
\begin{split}
f(x,y) = f(a,b)&+\frac{1}{1!}\left[(x-a)f_x(a,b)+(y-b)f_y(a,b)\right]+\\
&+...+\frac{1}{n!}\left[(x-a)\frac{\partial}{\partial x}+(y-b)\frac{\partial}{\partial y}\right]^{(n)}f(a,b)+R_n\left(a+\theta(x-a),b+\theta(x-b)\right),
\end{split}
\label{taylor3}
\end{equation}
donde la expresión entre corchetes se realiza según la <i> fórmula simbólica</i> \eqref{difsym}.

OBSERVACION: la continuidad de las derivadas parciales es condición fundamental para poder utilizar la fórmula al obtener el diferencial $n$-ésimo.

<b>Definición:</b> La suma de los $n+1$ primeros términos de \eqref{taylor3} definen el $n$-ésimo polinomio de Taylor $P_n(x,y)$ de $f(x,y)$ en torno al punto $(a,b)$.

<b>Polinomio de orden 2:</b> En la literatura, resulta de especial interés el polinomio de Taylor de $2^\circ$ orden:
\begin{equation}
\begin{split}
P_2(x,y)=f(a,b)&+(x-a)\frac{\partial f}{\partial x}(a,b)+(y-b)\frac{\partial f}{\partial y}(a,b)+\\
&+\frac{1}{2}\left((x-a)^2\frac{\partial^2 f}{\partial x^2}(a,b)+(x-a)(y-b)\frac{\partial^2 f}{\partial x\partial y}(a,b)+(y-b)^2\frac{\partial^2 f}{\partial y^2}(a,b)\right),
\end{split}
\end{equation}

<b>Fórmula de Mc Laurin:</b> En particular, si el punto $(a,b)$ alrededor del cual se hace el desarrollo es el punto $(0,0)$, obtenemos la llamada <i> f\'ormula de Mc laurin para funciones de dos variables</i>:
\begin{equation}
\begin{split}
f(x,y) = f(0,0)+\frac{1}{1!}&\left[xf_x(0,0)+yf_y(0,0)\right]+\\
&+...+\frac{1}{n!}\left[x\frac{\partial}{\partial x}+y\frac{\partial}{\partial y}\right]^{(n)}f(0,0)+R_n(\theta x,\theta y),\quad\left(0<\theta<1\right).
\end{split}
\label{mclaurin}
\end{equation}

<b>El resto $R_n$:</b> Sea $z = f(x,y)$, y consideremos la aproximación a $f$ en el punto $(a,b)$ a través del $n$-ésimo polinomio Taylor:
\begin{equation}
f(a+h,b+k) = P_n(h,k)+R_n(h,k), 
\end{equation}
entonces tendremos que $R_n(h,k) = o\left(\Vert(h,k)\Vert^n\right)$, es decir:
\begin{equation}
\lim_{(h,k)\to(0,0)}\frac{R_n(h,k)}{\Vert(h,k)\Vert^n} = 0.
\label{cociente}
\end{equation}

Además vale la acotación
\begin{equation}
\vert R_n(h,k)\vert\leq\frac{M}{(n+1)!}\left(\vert h\vert+\vert k\vert\right)^{(n+1)},
\end{equation}
donde $M$ es una cota del valor absoluto de las derivadas parciales de orden $(n+1)$ en el entorno $\mathcal{U}$.

<b>Unicidad del polinomio de Taylor:</b> A su vez, el polinomio de Taylor es único. Si hay otro polinomio $Q$ de orden $n$ tal que $S_n(x,y) = f(x,y)-Q(x,y)$, y se verifica que 
\begin{equation}
\lim_{(x,y)\to(a,b)}\frac{S_n(x,y)}{\Vert(x-a,y-b)\Vert^n}=0,
\end{equation}
entonces $Q=P_n$ ($Q$ es el $n$-ésimo polinomio de Taylor centrado en $(a,b)$).

<b>Bibliografía</b>

Demidovich, B. & Aparicio, B. (2001),<i>5.000 problemas de análisis matemático</i>. Paraninfo, Madrid.

Marsden, J. & Tromba, A. (2004), <i> Cálculo vectorial - Quinta edición</i>. Pearson Educación, Madrid.

Thomas, G. (2006), <i> Cálculo, varias variables</i>. Pearson Educación, Madrid.

Becerril, R., Jardón, R., & Reyes, G. (2002), <i> Cálculo diferencial en varias variables</i>. Pub. CBS, UAM-I, México.




