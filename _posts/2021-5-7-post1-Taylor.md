---
layout: post
title: Polinomio de Taylor en dos variables
---
<i>Lo siguiente son algunos apuntes que armé para un concurso recientemente rendido, donde el tema de exposición fue la Fórmula de Taylor en dos variables. Salí segundo, pero creo que los apuntes me quedaron lindos. Son básicamente tres apuntes: uno con resultados (sin demostrar), otro con la demostración de la fórmula de Taylor y un tercero con ejercicios resueltos.</i>

<i> Aquí los pueden descargar: Resultados, Demostración, Ejercicios</i>

Abajo presento los resultados básicos del tema

# El diferencial
\documentclass[12pt,letterpaper]{article}
\usepackage[spanish,es-lcroman]{babel}
\usepackage{amsmath}
\usepackage{amssymb}
\usepackage{multicol}
%\usepackage{enumerate}
%\usepackage[ansinew]{inputenc}
\usepackage{enumitem}
\usepackage[right=2cm,left=3cm,top=2cm,bottom=2cm,headsep=0cm,footskip=0.5cm]{geometry}
\usepackage[dvips]{graphicx}
\usepackage{mathspec}
%\usepackage{OldStandard}
%\usepackage[T1]{fontenc}
%\usepackage{xltxtra} 
%\defaultfontfeatures{Mapping=tex-text}
%\setallmainfonts{OldStandard}
%%%%
\addto\captionsspanish{\renewcommand{\refname}{Bibliograf\'ia.}}
\newtheorem{definition}{Definici\'on}	
%%%%%
%%%%%
\begin{document}
\begin{center}
\small{Concurso de Asistente -- An\'alisis Matem\'atico I (5551) \& An\'alisis Matem\'atico II (5552)}
\end{center}
\vspace{-0.5em}
\hrule
\vspace{1.5em}

\begin{center}
{\Large \textbf{Polinomio y f\'ormula de Taylor en varias variables}}
\end{center}
\subsection*{El diferencial}
\begin{definition} Diremos que la funci\'on $z = f(x,y)$ es diferenciable en el punto $(x_0,y_0)$ si est\'a un\'ivocamente definida en un entorno de este punto y su incremento se expresa as\'i:
\begin{equation}
\Delta z_0 = f(x_0+\Delta x_0,y_0+\Delta y_0)-f(x_0,y_0) = \mathrm{A}\Delta x_0+\mathrm{B}\Delta y_0+o(\rho),
\label{incremento}
\end{equation}
como funci\'on lineal homog\'enea de los incrementos independientes $\Delta x_0$, $\Delta y_0$ con coeficientes constantes $\mathrm{A}$ y $\mathrm{B}$, y $\rho$ es un infinit\'esimo de orden superior a $\sqrt{\Delta x_0^2+\Delta y_0^2}$.

Se llama diferencial total de una funci\'on diferenciable a la parte lineal de \eqref{incremento}, y es designado por
\begin{equation}
dz_0 = \mathrm{A}\Delta x_0+\mathrm{B}\Delta y_0.
\label{dif1}
\end{equation}
\end{definition}
En particular, si $x$ e $y$ son variables independientes, obtendremos que $dx = \Delta x$ y $dy = \Delta y$, por lo que en un punto gen\'erico $(x,y)$ la expresi\'on \eqref{dif1} se puede escribir de la siguiente forma:
\begin{equation}
dz = df(x,y) = f_x(x,y)dx +f_y(x,y)dy,
\label{df1}
\end{equation}
que se denomina {\it expresi\'on anal\'itica del diferencial}, para distinguirla de la definici\'on \eqref{dif1}.
%%%%
%%%%%
\subsection*{Diferenciales sucesivos: f\'ormula simb\'olica}
Observando la expresi\'on \eqref{dif1} del diferencial de $z = f(x,y)$:
\begin{equation*}
df = f_x(x,y)\Delta x+f_y(x,y)\delta y,
\end{equation*}
vemos que $df$ depende de $x$ e $y$ (pues las derivadas parciales son funciones del par $(x,y)$), y tambi\'en de los incrementos $\Delta x$ y $\Delta y$.

Si damos valores constantes a los incrementos $\Delta x$ y $\Delta y$, el diferencial es una funci\'on \'unicamente de $(x,y)$, y considerada como una func\'on de estas dos variables podr\'a tener a su vez un diferencial que llamaremos {\it diferencial segundo de $f$} e indicaremos con $d^2f$:
\begin{equation*}
d^2f = d(df).
\end{equation*}
An\'alogamente representaremos el diferencial tercer, cuarto,..., de en\'esimo orden de $f(x,y)$ por $d^3f$, $d^4f$,...,$d^nf$.
En general, si existen y son continuas las derivadas $n$-\'esimas en el punto considerado y $x$ e $y$ son variables independientes, entonces $dx = \Delta x$ y $dy = \Delta y$ y se verifica la siguiente {\it f\'ormula simb\'olica}
\begin{equation}
\begin{split}
d^nf &= \left(dx\frac{\partial}{\partial x}+dy\frac{\partial}{\partial y}\right)^{(n)}f(x,y)\\
&= \sum_{i = 0}^{n}{n\choose i}dx^{(n-i)}dy^{i}\frac{\partial^nf}{\partial x^{(n-i)}\partial y^i}(x,y).
\end{split}
\label{difsym}
\end{equation}
%%
\noindent\fbox{
    \parbox{\textwidth}{
Hay que se\~nalar que la expresi\'on anterior no constituye una definici\'on del diferencial $n$-\'esimo. Se trata s\'olo de una expresi\'on que, bajo ciertas condiciones sobre las derivadas parciales, permite obtener dicho diferencial.}}
%%%%
%%%%%
\subsection*{F\'ormula de Taylor para dos variables}
Supongamos que la funci\'on $z = f(x,y)$ tiene en un entorno $\mathcal{U}$ del punto $(a,b)$ derivadas parciales continuas hasta el orden $(n+1)$ inclusive. Sean $h,k$ tales que el rect\'angulo formado por los v\'ertices 
\begin{equation*}
\{(a,b),(a+h,b),(a,b+k),(a+h,b+k)\}
\end{equation*}
est\'e contenido en el entorno $\mathcal{U}$, entonces se verifica la {\it f\'ormula de Taylor}:
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
%%%
%%%
Si en \eqref{taylor1} se pasa el primer t\'ermino del miembro derecho al primero, empleando la notaci\'on diferencial, podemos escribir la f\'ormula de Taylor como
\begin{equation}
\Delta f(a,b) = \sum_{i = 1}^{n}\frac{d^if(a,b)}{i!}+\frac{d^{(n+1)}f(a+h\theta,b+k\theta)}{(n+1)!},\quad\left(0<\theta<1\right),
\label{taylor2}
\end{equation}
%%%
%%
En el desarrollo \eqref{taylor1}, los incrementos $h$ y $k$ pueden ser reemplazados por $(x-a)$ y $(y-b)$ respectivamente, y as\'i resulta
\begin{equation}
\begin{split}
f(x,y) = f(a,b)&+\frac{1}{1!}\left[(x-a)f_x(a,b)+(y-b)f_y(a,b)\right]+\\
&+...+\frac{1}{n!}\left[(x-a)\frac{\partial}{\partial x}+(y-b)\frac{\partial}{\partial y}\right]^{(n)}f(a,b)+R_n\left(a+\theta(x-a),b+\theta(x-b)\right),
\end{split}
\label{taylor3}
\end{equation}
donde la expresi\'on entre corchetes se realiza seg\'un la {\it f\'ormula simb\'olica \eqref{difsym}}.

OBSERVACI\'ON: la continuidad de las derivadas parciales es condici\'on fundamental para poder utilizar la f\'ormula al obtener el diferencial $n$-\'esimo.
%%%
\begin{definition} La suma de los $n+1$ primeros t\'erminos de \eqref{taylor3} definen el $n$-\'esimo polinomio de Taylor $P_n(x,y)$ de $f(x,y)$ en torno al punto $(a,b)$.
\end{definition} 

\paragraph{El polinomio de orden 2} En la literatura, resulta de especial inter\'es el polinomio de Taylor de $2^\circ$ orden:
\begin{equation*}
\begin{split}
P_2(x,y)=f(a,b)&+(x-a)\frac{\partial f}{\partial x}(a,b)+(y-b)\frac{\partial f}{\partial y}(a,b)+\\
&+\frac{1}{2}\left((x-a)^2\frac{\partial^2 f}{\partial x^2}(a,b)+(x-a)(y-b)\frac{\partial^2 f}{\partial x\partial y}(a,b)+(y-b)^2\frac{\partial^2 f}{\partial y^2}(a,b)\right),
\end{split}
\end{equation*}

\subsubsection*{F\'ormula de Mc Laurin}
En particular, si el punto $(a,b)$ alrededor del cual se hace el desarrollo es el punto $(0,0)$, obtenemos la llamada {\it f\'ormula de Mc laurin para funciones de dos variables:}
\begin{equation}
\begin{split}
f(x,y) = f(0,0)+\frac{1}{1!}&\left[xf_x(0,0)+yf_y(0,0)\right]+\\
&+...+\frac{1}{n!}\left[x\frac{\partial}{\partial x}+y\frac{\partial}{\partial y}\right]^{(n)}f(0,0)+R_n(\theta x,\theta y),\quad\left(0<\theta<1\right).
\end{split}
\label{mclaurin}
\end{equation}
%%%
%%%
\subsubsection*{El resto $R_n$}
Sea $z = f(x,y)$, y consideremos la aproximaci\'on a $f$ en el punto $(a,b)$ a trav\'es del $n$-\'esimo polinomio Taylor:
\begin{equation*}
f(a+h,b+k) = P_n(h,k)+R_n(h,k), 
\end{equation*}
entonces tendremos que $R_n(h,k) = o\left(\Vert(h,k)\Vert^n\right)$, es decir:
\begin{equation*}
\lim_{(h,k)\to(0,0)}\frac{R_n(h,k)}{\Vert(h,k)\Vert^n} = 0.
\label{cociente}
\end{equation*}
%%%%
%%%%
Adem\'as vale la acotaci\'on
\begin{equation}
\vert R_n(h,k)\vert\leq\frac{M}{(n+1)!}\left(\vert h\vert+\vert k\vert\right)^{(n+1)},
\end{equation}
donde $M$ es una cota del valor absoluto de las derivadas parciales de orden $(n+1)$ en el entorno $\mathcal{U}$. %segmento $\{(a+b)+\theta(h,k):0<\theta<1\}$.

\subsubsection*{Unicidad del polinomio de Taylor} A su vez, el polinomio de Taylor es \'unico. Si hay otro polinomio $Q$ de orden $n$ tal que $S_n(x,y) = f(x,y)-Q(x,y)$, y se verifica que 
\begin{equation*}
\lim_{(x,y)\to(a,b)}\frac{S_n(x,y)}{\Vert(x-a,y-b)\Vert^n}=0,
\end{equation*}
entonces $Q=P_n$ ($Q$ es el $n$-\'esimo polinomio de Taylor centrado en $(a,b)$).
%%
%%%
\begin{thebibliography}{}

\bibitem{} Demidovich, B. \& Aparicio, B. (2001), {\it 5.000 problemas de an\'alisis matem\'atico}. Paraninfo, Madrid.

\bibitem{} Marsden, J. \& Tromba, A. (2004), {\it C\'alculo vectorial - Quinta edici\'on}. Pearson Educaci\'on, Madrid.

\bibitem{} Thomas, G. (2006), {\it C\'alculo, varias variables}. Pearson Educaci\'on, Madrid.

\bibitem{} Becerril, R., Jard\'on, R., \& Reyes, G. (2002), {\it C\'alculo diferencial en varias variables}. Pub. CBS, UAM-I, M\'exico.

\end{thebibliography}
\end{document}

