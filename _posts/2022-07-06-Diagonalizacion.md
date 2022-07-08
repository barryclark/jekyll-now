
---
layout: post
title: Diagonalización de Matrices y Transformaciones
---

<p align = "justify"><em>Hace pocas semanas rendí un concurso para acceder a un nuevo cargo docente
El área del concurso en cuestión era Algebra Lineal, y el tema concursado era Diagonalización de Matrices y Transformaciones.
Este es un miniapunte teórico que escribí para apoyarme durante la defensa de mi proyecto. No tiene demostraciones,
pero sí todos los resultados teóricos básicos del tema. También se encuentra accesible
<a href = "https://drive.google.com/file/d/1H6pSNuRP2DENN5qDoUI5w9BcvtP-HDha/view?usp=sharing">aquí</a>.</em><p>


<font size = "+2"><b> Algunas definiciones previas importantes</b></font>

<b>Definición:</b>(Suma directa de subespacios) Sea $V$ un $K$-espacio vectorial,
  y sean $S$ y $T$ subespacios de $V$. Se dice que <em>$V$ es suma directa de $S$ y $T$</em> ,
y se nota $V = S\oplus T$ si:
\begin{itemize}
\item $V = S+T$
\item $S\cap T = \{0\}$.
\end{itemize} 


<b>Proposición:</b>Si $V$ es suma directa de subespacios $S$ y $T$ entonces, para cada $v\in V$ existen únicos $s\in S$ y $t\in T$ tales que $v = s+t$.

<b>Definición:</b>(Suma directa de subespacios) Sea $V$ un $K$-espacio vectorial y sean $S_1,S_2,...,S_r$ 
  subespacios de $V$. Se dice que $S_1,S_2,...,S_r$ están en <em>suma directa</em> si, 
para cada $w\in W = S_1+S_2+...+S_r$ existen únicos $s_i\in S_i$, $1\leq i\leq r$, tales que
$w = s_1+s_2+...+s_r$. En este caso se dice que $W$ es la <em>suma directa de los subespacios 
  $S_1,...,S_r$</em>, y se nota
\begin{equation*}
W = S_1\oplus S_2\oplus ...\oplus S_r = \bigoplus_{i = 1}^r S_i.
\end{equation*}

<b>Definición:</b> (Vector en cierta base) Sea $V$ un $K$-espacio vectorial de dimensión finita 
y sea $ \mathcal{B} = \{v_1,...,v_n\}$ una base de $V$. Dado $v\in V$ existen únicos valores
$\alpha_i\in K$ tales que $v = \alpha_1 v_1+...+\alpha_n v_n$. 
El vector $\left[\alpha_1,...,\alpha_n\right]\in K^{n\times 1}$ es el 
<i>vector de coordenadas de $v$ en la base $\mathcal{B}$</i> y será notado por 
$\left[ v\right]_\mathcal{B}$.


<p align = "justify">Dadas dos bases de un mismo $K$-espacio vectorial $V$ de <b>dimensión finita</b>, cada elemento de $V$ 
tiene asociados dos vectores de coordenadas (generalmente distintos), uno en cada una de las bases. 
Con la ayuda de cierta matriz, llamada de cambio de base, se pueden obtener las
coordenadas de un vector con respecto a una base de $V$ a partir de las coordenadas del vector en la otra.</p>

<b>Definición:</b>
Sea $V$ un $K$-espacio vectorial de dimensión $n$, y $\mathcal{B}_1 = \{v_1,...,v_n\}$ y
$\mathcal{B}_2 = \{ w_1,...,w_n\}$ bases de $V$. Para cada $1\leq j\leq n$ sean 
$\alpha_{ij}\in K$ $(1\leq j\leq n)$ tales que $v_j = \sum_{i = 1}^n \alpha_{ij}w_i$.
Se llama <em>matriz de cambio de base de $\mathcal{B}_1$ a $\mathcal{B}_2$</em>,
y se nota $C(\mathcal{B}_1,\mathcal{B}_2) = I_{\mathcal{B}_1\mathcal{B}_2}\in K^{n\times n}$,
a la matriz definida por $C(\mathcal{B}_1,\mathcal{B}_2)_{ij} = \alpha_{ij}$.


<p align = "justify">En otros términos, la matriz de cambio de base $C(\mathcal{B}_1,\mathcal{B}_2)$ es la matriz cuya j-ésima
columna son las coordenadas en la base $\mathcal{B}_2$ del j-ésimo vector de la base $\mathcal{B}_1$,
para cada $1\leq j\leq n$, es decir</p>
\begin{equation*}
C(\mathcal{B}_1,\mathcal{B}_2) = \left[\left[v_1\right]_{\mathcal{B}_2},...,\left[v_n\right]_{\mathcal{B}_2}\right].
\end{equation*}

<b>Teorema:</b> (Teorema de la dimensión para transformaciones lineales) Sean $V$ y $W$ dos espacios 
$K$-vectoriales, $V$ de dimensión finita, y sea $T:V\to W$ una transformación lineal. Entonces
\begin{equation*}
\mathrm{dim}V = \mathrm{dim}(\mathrm{Ker}(T))+ \mathrm{dim}(\mathrm{Im}(T)).
\end{equation*}

<p align = "justify">Si $V$ y $W$ son $K$-espacios vectoriales de dimensión $n$ y $m$ respectivamente, 
una transformación lineal $T:V\to W$ queda unívocamente determinada por los $n$ vectores 
de $W$ que son los valores de $T$ en una base cualquiera de $V$ . Además, fijada una base de $W$ ,
estos $n$ vectores quedan determinados por medio de sus vectores de coordenadas en $K^m$ . Se define
entonces una matriz asociada a $T$ que contiene toda esta información.</p>

<b>Definición:</b>
{\bf Matriz de una transformación} Sea $T:V\to W$ una transformación lineal entre dos espacios vectoriales 
de dimensión finita. Sea $\mathcal{B}$ base de $V$ y $\mathcal{B}'$ base de $W$. 
Se define la <em>matriz de $T$ en las bases $\mathcal{B},\mathcal{B}'$</em>, como la matriz definida
\begin{equation*}
\left[T\right]_{\mathcal{B}\mathcal{B}'} = \left[\left[T(v_1)\right]_{\mathcal{B}'},...,\left[T(v_n)\right]_{\mathcal{B}'}\right],
\end{equation*}
donde $\mathcal{B}= \{v_1,...,v_n\}$.


<font size = "+2"><b> Diagonalización de transformaciones y matrices</b></font>

<p align = "justify">Hay muchas formas de introducir este tema, particularmente a mí me gusta comenzar a través 
de la definición de matrices semejantes (tema que cobra mayor relevancia cuando se estudie la 
Forma Normal de Jordan).</p>

<b>Definición:</b>
Sean $A,B\in K^{n\times n}$. Se dice que $A$ y $B$ son <em>semejantes</em>,
y se nota $A\sim B$ si existe una matriz inversible $C$ tal que $A = CBC^{-1}$.


Un resultado importante que vincula la semejanza de matrices con los endomorfismos es el siguiente:
<b>Proposición:</b>
$A\sim B$ si y sólo si existen una transformación lineal $T:K^n\to K^n$ y 
bases $B_1$ y $B_2$ de $K^n$ tales que $\left[T\right]_{B_1} = A$ y $\left[T\right]_{B_2} = B$. 

En tal caso, la matriz $C$ tal que $A= CBC^{-1}$ no es otra cosa que la matriz cambio de base de
$B_2$ a $B_1$. Es decir, $C = \left(\left[v_1\right]_{B_1},...,\left[v_n\right]_{B_1}\right)$,
donde $\{v_1,...,v_n\} = B_2$ 

<b>Definición:</b>
  Una matriz $A\in K^{n\times n}$ se dice <em>diagonalizable</em> si existe $C$ invertible 
tal que $CAC^{-1}$ es diagonal, es decir, si es semejante a una matriz diagonal.

<p align = "justify">Claramente, todo lo que puedo definir para matrices lo puedo extender a transformaciones lineales, 
entonces de manera natural definimos:</p>

<b>Definición:</b>
Sea $V$ un $K$-espacio vectorial de dimensión finita y $T:V\to V$ una transformación lineal. 
Se dice que $T$ es <em>diagonalizable</em> si existe una base $B$ de $V$ tal que $\left[T\right]_B$ 
es diagonal.

<p align = "justify">Algo que debemos observar, es que si $T$ es diagonal si y sólo si dada cualquier base $B$ tendremos
que $\left[T\right]_B$ es diagonalizable.</p>

<font size = "+2"><b> Autovalores y autovectores</b></font>

<p align = "justify">Consideremos ahora un espacio vectorial $V$ de dimensión finita $n$, y un endomorfismo $T$ diagonalizable,
entoncesexiste una base $\mathcal{B} = \{v_1,...,v_n\}$ de $V$ tal que la matriz es diagonal</p>
\begin{equation*}
\begin{aligned}
\left[T\right]_{\mathcal{B}} &= 
\begin{pmatrix}
\lambda_1 & 0 & ... & 0\\
0 & \lambda_2 & ... & 0\\
... & ... & ... & ...\\
0 & 0 & ... & \lambda_n\\
\end{pmatrix}\\
&= \left(\left[T(v_1)\right]_{\mathcal{B}},...,\left[T(v_n)\right]_{\mathcal{B}}\right),
\end{aligned}
\end{equation*}

Como sabemos que cada columna es el vector $T(v_j)$ en la base $\mathcal{B}$, tendremos que 
para cada $j$ vale $T(v_j) = \lambda_j v_j$.

Esta observación nos lleva naturalmente a la siguiente definición:
<b>Definición:</b>
Sea $V$ un $K$-espacio vectorial y $T:V\to V$ una transformación lineal. 
Se dice que $v\in V$, $v\neq 0$ es un <em>autovector</em> de $T$ si existe $\lambda\in K$ tal que
$T(v) = \lambda v$. El elemento $\lambda\in K$ se llama <em>autovalor</em> de $T$.

<p align = "justify">Remarquemos que si bien la motivación inicial fueron las transformaciones lineales de un espacio vectorial
de dimensión finital, la definición anterior no hace referencia a esa hipótesis. De hecho, 
utiliza solamente la estructura vectorial de $V$, por lo que la definición de autovalores y autovectores 
también tiene sentido en el contexto de espacios vectoriales de dimensión no finita.</p>

<p align = "justify">Notemos también que de lo anterior tenemos que si $T$ es diagonalizable, entonces la
base $\mathcal{B}$ en la cual su matriz es diagonal, está formada por autovectores. Luego</p>

<b>Proposición:</b>
Un endomorfismo $T$ de un espacio vectorial finito es diagonalizable sii hay una base de $V$ formada 
por autovectores.

También observamos lo siguiente: si $v$ es un autovector de $T$, entonces si $\left[T\right]_B$ es 
su matriz en cierta base $B$ tendremos
\begin{equation*}
\left[T\right]_B\left[v\right]_B = \left[T(v)\right]_B = \lambda \left[v\right]_B.
\end{equation*}

Esto nos lleva naturalmente a extender la definición de autovalor y autovector para matrices en 
$K^{n\times n}$.

<b>Definición:</b>
Sea $A\in K^{n\times n}$. Se dice que $v\in K^n$, $v\neq 0$ es un autovector de $A$ si 
existe $\lambda\in K$ tal que $Av = \lambda v$. El elemento $\lambda$ se denomina autovalor.

<p align = "justify">Por las observaciones anteriores quedó claro que si $A$ es la matriz de $T$ en alguna
base $B$ y $v$ es un autovalor, entonces $\left[v\right]_B$ es un autovector de $A$. 
Y viceversa, si $A$ tiene un autovector $v$, entonces $v$ es un autovector de $T$ escrito en la base $B$.</p>

<p align = "justify">Entonces ya tenemos un método para determinar los autovalores de una transformación:
basta encontrar los de su matriz en alguna base $B$.</p>

Veamos ahora cómo determinar los autovalores de $T$ a partir de los de la matriz $A = \left[T\right]_B$.

Observemos que
\begin{equation*}
\begin{aligned}
\lambda\textrm{ es autovalor de }A &\Leftrightarrow\exists v\in K^n-\{0\}\textrm{ tal que }Av=\lambda v\\
&\Leftrightarrow\textrm{El sistema } Av=\lambda v\textrm{ tiene solución no trivial}\\
&\Leftrightarrow\textrm{El sistema } (\lambda I_n-A)\textrm{ tiene solución no trivial}\\
&\Leftrightarrow\underbrace{\mathrm{det}(\lambda I_n-A)}_{\textrm{polinomio mónico de grado }n}=0
\end{aligned}
\end{equation*}

<b>Definición:</b>Sea $A$ una matriz, se define su polinomio característico
$\mathcal{X}_A(\lambda) =\mathrm{det}(\lambda I_n-A)$.

Luego
<b>Definición:</b> $\lambda$ es autovalor de $A$ sii es raíz de $\mathcal{X}_A$ en $K$.

<p align = "justify">Para poder hacer extensiva esta definición a las transformaciones $T$, necesitamos demostrar que 
este polinomio puede definirse sin importar la base $B$ que estemos usando para expresar a $T$ como matriz.</p>

<b>Definición:</b> Si $A\sim B$ entonces $\mathcal{X}_A = \mathcal{X}_B$.

Luego
<b>Definición:</b> Sea $T$ un endomorfismo lineal de un espacio vectorial $V$ de dimensión finita,
se define su polinomio característico como $\mathcal{X}_T =\mathcal{X}_{\left[T\right]_B}$, 
donde $B$ es una base cualquiera.

Luego, tendremos que $\lambda$ es autovalor de $T$ sii $\lambda$ es raíz de $\mathcal{X}_T$.

<font size = "+2"><b>Una caracterización de las transformaciones diagonalizables</b></font>

<b>Definición:</b> Si $T:V\to V$ es una transformación lineal y $\lambda\in K$ es un autovalor, 
se define el subespacio de autovectores asociados a $\lambda$ como
\begin{equation*}
E_\lambda =\{v\in V: T(v) = \lambda v\}.
\end{equation*} 


Es inmediato corroborar los siguientes items:
<b>Proposición:</b>
Sea $T:V\to V$ una transformación lineal, y $\lambda_1,...,\lambda_r$ autovalores de $T$, entonces
\begin{enumerate}[i)]
\item $E_{\lambda_i}$ es un subespacio.
\item $E_{\lambda_1},...,E_{\lambda_r}$ están en suma directa.
\item Si $V$ tiene dimensión finita, $\mathrm{dim}(E_\lambda)\leq\mathrm{mult}(\lambda,P_T)$.
\end{enumerate}


El siguiente teorema caracteriza y al mismo tiempo da criterios para trabajar con la diagonalización 
de transformaciones.

<b>Teorema:</b>
Sea $V$ un $K$-espacio vectorial de dimensión finita y $T:V\to V$ una transformación lineal y 
sean sus autovalores $\lambda_1,...,\lambda_r$ con $\lambda_i\neq\lambda_j$, $i\neq j$.
Entonces son equivalentes:
\begin{enumerate}[i)]
\item $T$ es diagonalizable.
\item $V=\bigoplus_{i=1}^rE_{\lambda_i}$.
\item $\mathcal{X}_T(x) = (x-\lambda_1)^{a_1}...(x-\lambda_r)^{a_r}$ donde $a_i =\mathrm{dim}(E_{\lambda_i})$.
\end{enumerate}

Lo anterior está planteado para una transformación $T$, pero vale <i>mutatis mutandi</i> para una 
matriz $A\in K^{n\times n}$

<p align = "justify"><b>Aplicación del Teorema anterior:</b> En general, todos los problemas consistirán en diagonalizar una determinada
matriz o transformación, y señalar su base de autovectores y el conjunto de sus autovalores. Entonces lo que haremos
será encontrar autovectores que cumplan la condición segunda o tercera, y por el teorema, tendremos garantizado
que esos vectores diagonalizan nuestra transformación o matriz. Veremos cómo funciona esto en los ejercicios.
</p>
