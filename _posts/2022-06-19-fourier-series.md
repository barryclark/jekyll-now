---
layout: post
title: Crash class sobre Series de Fourier
---

<p  align = "justify"> En esta breve, brevísima entrada introduciremos las <b>series de Fourier</b>. La idea es mencionar brevemente qué son, cómo calcularlas, y mostrar un algoritmo en <i>Python</i> para aproximarlas numéricamente. Todos los códigos que aquí presente, los pueden hallar implementados en este <a href = "https://colab.research.google.com/drive/1mTuM8GVtO_OLxWqiRtA06QTnrF45cLrM?usp=sharing">Colab de Google</a>.</p>

<p align = "justify"><i>DISCLAIMER: el objetivo de estas "crash classes" es presentar diversos temas con lo mínimo indispensable. Claramente, no veremos teoría aquí.</i></p>

<font size = "+2"><b> Qué son las series de Fourier</b></font>

<p align = "justify"> Las series de Fourier son un método desarrollado inicialmente por 
<a href = "https://es.wikipedia.org/wiki/Joseph_Fourier">Joseph Fourier</a> alrededor del año 1820. Lo que buscamos
con este método es <b>aproximar</b> una función $f(t)$ a través de una suma de senos y cosenos.</p>

<p align = "justify"> En otras palabras, las series de Fourier nos permitirán expresar cualquier función continua
$f(t)$ definida en el intervalo $\left[-T/2,T/2\right]$ como la suma:</p>

\begin{equation}
f(t) \sim \frac{a_0}{2}+\sum_{n=0}^\infty a_n \cos\left(\frac{2n\pi t}{T}\right)+ b_n \sin\left(\frac{2n\pi t}{T}\right).
\end{equation}

<p align = "justify"> Cualquier función escrita de la manera anterior, se dice que "se encuentra desarrollada en serie de Fourier".
En otras palabras, cuando algún profesor nos pida "desarrollar una función en serie de Fourier", básicamente nos está pidiendo que hallemos los coeficientes $a_n$ y $b_n$.</p>

<p align = "justify">En la práctica puede llegar a ser muy difícil encontrar los infinitos $a_n$ y $b_n$. En tal caso, sólo determinaremos numéricamente esos coeficientes hasta cierto índice $N$.</p>

<font size = "+2"><b> Fórmulas para los coeficientes</b></font>

<p align = "justify"> Para hallar los coeficientes $a_n$ y $b_n$ tenemos que utilizar solamente tres fórmulas:</p>

\begin{equation}
a_0 = \frac{2}{T}\int_{-T/2}^{T/2}f(t)dt
\end{equation}


\begin{equation}
a_n = \frac{2}{T}\int_{-T/2}^{T/2}f(t)\cos\left(\frac{2n\pi t}{T}\right)dt
\end{equation}

\begin{equation}
b_n = \frac{2}{T}\int_{-T/2}^{T/2}f(t)\sin\left(\frac{2n\pi t}{T}\right)dt
\end{equation}


<font size = "+2"><b>Algoritmos numéricos</b></font>

Como dijimos anteriormente, al aproximar numéricamente una función a través de su desarrollo de Fourier, no calcularemos
infinitos coeficientes $a_n$ y $b_n$, simplemente los determinaremos hasta cierto índice $N$. Luego, podremos escribir

\begin{equation}
f(t)\approx\frac{a_0}{2}+\sum_{n=0}^N a_n \cos\left(\frac{2n\pi t}{T}\right)+ b_n \sin\left(\frac{2n\pi t}{T}\right).
\end{equation}

<p align = "justify"><b>Consideraremos dos casos:</b> el primer caso será cuando conozcamos explícitamente la función $f(t)$ y tengamos una expresión explícita para calcularla (caso sencillo). El segundo caso (más interesante) tendrá lugar cuando desconozcamos cuál es la función $f(t)$ y sólo tengamos acceso a serie temporal $s(t)$ de valores de $f$ en ciertos instantes.</p>

<p align = "justify">Para ser más claros, en el primer caso sabremos que la función es, por ejemplo, $f(t) = t^2$. En este caso, tenemos una fórmula explícita para calcular las integrales y hallar la serie de Fourier. El segundo caso tendrá lugar cuando desconozcamos dicha $f(t)$ pero sabiendo que dicha función toma valores $\{f(0) = 0, f(1) = 1, f(2) = 4, f(3) = 9\}$. En este caso, lo único que conoceremos de la función será la serie temporal $s = \{0,1,4,9\}$ que corresponde a los valores de la función evaluada en los instantes $t = \{0,1,2,3\}$. Este último caso sin duda es el más interesante y permite usar el desarollo de Fourier con todo su poder: gracias a la serie de Fourier que obtendremos podremos <i>aproximar</i> los valores que tomará nuestra $f(t)$ desconocida en todos los valores que querramos dentro del intervalo $\left[-T/2,T/2\right]$.
</p>


<font size = "+1"><b>Caso 1: función conocida</b></font>
<p>Haremos lo siguiente:</p>
<ol>
<li>Determinamos el rango $\left[-T/2,T/2\right]$</li>
<li>Evaluamos la función $f(t)$ sobre el intervalo anterior</li>
<li>Fijamos $N$, el índice de aproximaciones deseadas</li>
<li>Para cada $n\leq N$ calculamos las integrales
$a_n = \frac{2}{T}\int_{-T/2}^{T/2}f(t)\cos\left(\frac{2n\pi t}{T}\right)dt$ y
$b_n = \frac{2}{T}\int_{-T/2}^{T/2}f(t)\sin\left(\frac{2n\pi t}{T}\right)dt$ </li>
<li>Formamos la suma 
$\frac{a_0}{2}+\sum_{n=0}^N a_n \cos\left(\frac{2n\pi t}{T}\right)+ b_n \sin\left(\frac{2n\pi t}{T}\right)$</li>
</ol>

Ahora escribimos todo lo anterior en Python:

{% highlight python %}
import numpy as np               #importamos algunos paquetes que utilizaremos
import scipy
from scipy import integrate
import matplotlib.pyplot as plt

f = lambda t: 3*t**2;             #tomamos la expresión conocida para f(t)
T = 10;                           #definimos nuestro T...
ts = np.linspace(-T/2,T/2,100);   #...y tomamos el intervalo
sig = f(ts);                      #evaluamos la función sobre el intervalo
N = 50;                           #fijamos el orden de la aproximación

An = []                           #calculamos los coeficientes
Bn = []
for n in range(0,N):
  fc = lambda t: f(t)*np.cos(n*2*np.pi*t/T)    #calculo del a_n
  an = np.trapz(fc(ts),ts)*2/T
  fs = lambda t: f(t)*np.sin(n*2*np.pi*t/T)    #calculo del b_n
  bn = np.trapz(fs(ts),ts)*2/T
  An = np.append(An,an)
  Bn = np.append(Bn,bn)
  
ffs = An[0]/2*np.ones(len(ts))                 #calculamos la suma de todo lo anterior, arrancando por el a_0...
kk = np.zeros((N,len(ts)))                     #... y también guardamos las sumas parciales
kk[0] = ffs                                    #comenzamos guardando la del a_0
for i in range(1,N):
  ks = An[i]*np.cos(2*np.pi*i*ts/T)+Bn[i]*np.sin(2*np.pi*i*ts/T)
  ffs = ffs+ks
  kk[i] = ffs  
  
fig = plt.figure()                            #graficamos algunas aproximaciones
idx = [2,5,10,20,N-1]                         #determinamos las que deseamos mostrar
j = 1
for i in idx:
  ax = fig.add_subplot(len(idx),1,j)
  j += 1
  ax.plot(ts,sig = '--',label = 'Original')
  ax.plot(ts,kk[i], label = 'Aproximacion')
{% endhighlight %}

<font size = "+1"><b>Caso 2: función desconocida</b></font>
<p>El código será muy similar al anterior, aunque no idéntico. Haremos lo siguiente:</p>
<ol>
<li>Determinamos el rango $\left[-T/2,T/2\right]$</li>
<li>Tomamos la señal $sig(t)$.</li>
<li>Fijamos $N$, el índice de aproximaciones deseadas</li>
<li>Para cada $n\leq N$ calculamos las integrales $a_n$ y $b_n$ con el algoritmo np.trapz de SciPy.</li>
<li>Formamos la suma 
$\frac{a_0}{2}+\sum_{n=0}^N a_n \cos\left(\frac{2n\pi t}{T}\right)+ b_n \sin\left(\frac{2n\pi t}{T}\right)$</li>
</ol>

Ahora escribimos todo lo anterior en Python:

{% highlight python %}
import numpy as np               #importamos algunos paquetes que utilizaremos
import scipy
from scipy import integrate
import matplotlib.pyplot as plt

T = 2;                               #definimos nuestro T...
ts = np.linspace(-T/2,T/2,100);       #...y tomamos el intervalo
sig = ts**2+np.random.rand(len(ts));  #consideramos la señal (puede ser cualquiera)
N = 50;                               #fijamos el orden de la aproximación

An = []                           #calculamos los coeficientes
Bn = []
for n in range(0,N):
  sc = sig*np.cos(n*2*np.pi*ts/T)    #calculo del a_n
  an = np.trapz(sc,ts)*2/T
  ss = sig*np.sin(n*2*np.pi*ts/T)    #calculo del b_n
  bn = np.trapz(ss,ts)*2/T
  An = np.append(An,an)
  Bn = np.append(Bn,bn)
  
ffs = An[0]/2*np.ones(len(ts))                 #calculamos la suma de todo lo anterior, arrancando por el a_0...
kk = np.zeros((N,len(ts)))                     #... y también guardamos las sumas parciales
kk[0] = ffs                                    #comenzamos guardando la del a_0
for i in range(1,N):
  ks = An[i]*np.cos(2*np.pi*i*ts/T)+Bn[i]*np.sin(2*np.pi*i*ts/T)
  ffs = ffs+ks
  kk[i] = ffs  
  
fig = plt.figure()                            #graficamos algunas aproximaciones
idx = [2,5,10,20,N-1]                         #determinamos las que deseamos mostrar
j = 1
for i in idx:
  ax = fig.add_subplot(len(idx),1,j)
  j += 1
  ax.plot(ts,sig = '--',label = 'Original')
  ax.plot(ts,kk[i], label = 'Aproximacion')
{% endhighlight %}


<font size = "+2"><b>Ejemplo del caso 2</b></font>

<p align = "justify"> Apliquemos el último código para el caso en que la función desconocida esté dada
  por una función cuadrática mas un término ruidoso:</p>
  
<center>
<figure>
  <img src="https://github.com/uliseschialva/uliseschialva.github.io/blob/master/_posts/_2022-06-19-fourier-series/noisy_signal.png?raw=true" alt="Trulli" style="width:70%">
</figure>
</center>

<p>Aplicando luego el algoritmo desarrollado para el caso de la señal anterior, obtendremos</p>
<center>
<figure>
  <img src="https://github.com/uliseschialva/uliseschialva.github.io/blob/master/_posts/_2022-06-19-fourier-series/noisy_signal_fourier.png?raw=true" alt="Trulli" style="width:70%">
</figure>
</center>

<p>Podemos observar cómo a medida que se incrementa el índice $n$ la aproximación a la señal original mejora rápidamente.</p>

<p>Finalmente, si tomamos la diferencia entre la última aproximación y la señal original, vemos que el error tiende a ser mayor en los extremos del intervalo (no nos meteremos con eso, pero hay toda una teoría sobre cómo <a href = "https://es.wikipedia.org/wiki/Fen%C3%B3meno_de_Gibbs">acotar ese error</a>).</p>

<center>
<figure>
  <img src="https://github.com/uliseschialva/uliseschialva.github.io/blob/master/_posts/_2022-06-19-fourier-series/error.png?raw=true" alt="Trulli" style="width:70%">
</figure>
</center>

