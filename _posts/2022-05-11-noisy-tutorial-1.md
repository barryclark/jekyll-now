---
layout: post
title: Creando ruido blanco
---

<p align = "justify">En esta entrada introduciremos el ruido blanco y los procesos de Wiener (o movimientos brownianos), y veremos como simularlos. Los objetivos de este minicurso pueden <a href = "https://uliseschialva.github.io/noisy-tutorial-0/">encontralos aquí</a> .</p>

<p align = "justify">SPOILER ALERT: no asustarse con la primera definición. Hay que darla sí o sí, lo jugoso y programable viene después.</p>

<p align = "justify"><b>Definición:</b> <em>Llamaremos ruido blanco a toda serie temporal $\eta(t)$ para la cual existe un movimiento browniano o proceso de Wiener $W(t)$ tal que $\dot{W}(t) = \eta(t)$.</em></p>

<p align = "justify">Aquí pueden ver lo que es un <a href = "https://es.wikipedia.org/wiki/Proceso_de_Wiener">proceso de Wiener</a>. Para nosotros, en este curso, cada vez que mencionemos un proceso de Wiener (o movimiento Browniano), tendremos en mente una serie $W(t)$ que cumple
<ol type = "i">
<li> $W(0) = 0$,</li>
<li> $W(t)-W(s) \sim \sqrt(t-s)\mathcal{N}(0,1)$</li>
<li> Los incrementos $W(t)-W(s)$ y $W(u)-W(v)$ son independientes.</li>
</ol>
</p>

<p align = "justify">Para los quisquillosos, lo anterior no es una correcta definición de proceso de Wiener, si no que define una "realización" del proceso.</p>

<p align = "justify">No profundizaremos más acerca de estos procesos, pero señalemos que entre sus propiedades se encuentra la de no ser diferenciables. Por lo que su derivada no existe, y por ello FORMALMENTE el ruido blanco no existe.</p>

<p align = "justify">¿Entonces que haremos? Supondremos que SI existe ese objeto que hemos llamado "ruido blanco", y (haciendo algunas cuentas que omitimos) este objeto deberá cumplir con dos propiedades:
\begin{equation}
E(\eta(t)) = 0
\label{eq1}
\end{equation}
y
\begin{equation}
E\left(\eta(t)\eta(s)\right) = \delta(t-s),
\label{eq2}
\end{equation}
donde $\delta$ es la función <a href = "https://es.wikipedia.org/wiki/Delta_de_Dirac"> delta de Dirac</a>.

Obviamente, las anteriores son dos fórmulas que valen en un sentido informal.


<p><b>--Todo arte está en la ejecución--</b></p>

<p align = "justify">Entonces, ¿cómo simulamos entonces ese ruido blanco que no existe y el proceso de Wiener?</p>

<p align = "justify"> Hay dos enfoques. La vía rápida y la sofisticada. Hoy veremos la rápida.</p>

<b> Simulación del ruido blanco.</b>

Generarmos una señal que satisfaga las ecuaciones \eqref{eq1} y \eqref{eq2}:
{% highlight python %}
import numpy as np
N = 100;                          #número de muestras
eta = np.random.randn(N);         #generamos la señal de ruido blanco
{% endhighlight %}

<p align = "justify">Observacion: si $\eta$ es una señal de ruido blanco, también lo será $a*\eta$ para cualquier número $a\neq 0$.</p>

<p>Y ahora grafiquemos lo obtenido</p>

{% highlight python %}
import matplotlib.pyplot as plt
plt.plot(eta,'b')
plt.show()
{% endhighlight %}

<center>
<figure>
  <img src="https://github.com/uliseschialva/uliseschialva.github.io/blob/master/_posts/_2022-05-11-noisy-tutorial-1/figure1.png?raw=true" alt="Trulli" style="width:70%">
</figure>
</center>

<p>Chequeemos que lo simulado funciona, viendo si se cumplen las condiciones \eqref{eq1} y \eqref{eq2},</p>

{% highlight python %}
E = np.mean(eta);
print(E)
{% endhighlight %}
y el resultado da 0.02133

{% highlight python %}
from scipy import signal
autocorr = signal.correlate(eta, eta);    #hacemos la autocorrelación
lags = np.arange(-N+1,N,1)                #calculamos los lags
plt.plot(lags,autocorr)                   #ploteamos para chequear.
plt.show()
{% endhighlight %}

<center>
<figure>
  <img src="https://github.com/uliseschialva/uliseschialva.github.io/blob/master/_posts/_2022-05-11-noisy-tutorial-1/figure_1b.png?raw=true" style="width:70%">
</figure>
</center>

<b> Ahora toca simular un proceso de Wiener</b>

<p align = "justify">Usaremos escencialmente la propiedad ii) del proceso de Wiener para simular una señal de ruido blanco de T segundos de duración, a una tasa de muestreo de $f_s$ determinada por nosotros ($f_s$ también se denomina frecuencia de muestreo o <em>sampling frequency</em>).</p>

<p align = "justify">$f_s$ no es otra cosa que la cantidad de muestras por unidad de tiempo, es decir $f_s = N/T$ (donde N es la cantidad de muestras).

Luego, la longitud de nuestra muestra de ruido blanco será $N = T\times f_s$, y la distancia entre dos muestras será $\Delta t = T/N = 1/f_s$.</p>

<p align = "justify"><b>Ejemplo</b>: Supongamos por ejemplo que queremos simular un proceso de Wiener de 100 segundos de duración, y con una frecuencia de muestreo de 4 Hz.</p>

{% highlight python %}
T = 100;                      #duración de la muestra [s]
fs = 4;                       #sampling frequency [Hz] 
N = round(T*fs);              #tamaño de la muestra (= 400)  
dt = T/N;                     #distancia entre muestras
t = np.arange(0,T,dt);        #creamos el vector de instantes de las muestras

W = np.empty(N);              #creamos el vector de nuestro futuro proceso
W[0] = 0;                     #hacemos que nuestra muestra verifique la condición i
for i in range(N-1):
    W[i+1] = W[i] + sqrt(dt)*np.random.randn()   #generamos iterativamente la serie
{% endhighlight %}

<p align = "justify">Y la serie de W será nuestro proceso de Wiener! Algunos también lo denominan "camino browniano discretizado".</p>

<p align = "justify">NOTA: También podemos abreviar el for-loop del proceso anterior con la función cumsum:</p>

{% highlight python %}
W[0] = 0;
index = range(1,N)
W[index] = np.cumsum(np.random.randn(N-1))
{% endhighlight %}

<p align = "justify">Si queremos graficar el proceso anteriormente simulado, usamos el siguiente código</p>

{% highlight python %}
plt.plot(t,W,label = 'Wiener process')
plt.xlabel('Time [s]')
plt.show()
{% endhighlight %}

<center>
<figure>
  <img src="https://github.com/uliseschialva/uliseschialva.github.io/blob/master/_posts/_2022-05-11-noisy-tutorial-1/figure2.png?raw=true" style="width:70%">
</figure>
</center>

<p align = "justify">Ahora generamos y ploteamos distintas realizaciones del proceso.</p>

{% highlight python %}
M = 3;                       #número de realizaciones
W_matrix = np.empty((M,N));  #creamos la matrix 

for i in range(M):
  W = np.zeros(N)
  index = range(1,N)
  W[index] = np.cumsum(np.random.randn(N-1))
  W_matrix[i] = W

for i in range(M):
  plt.plot(t,W_matrix[i])
plt.xlabel('Time [s]')  
plt.show()
{% endhighlight %}

<center>
<figure>
  <img src="https://github.com/uliseschialva/uliseschialva.github.io/blob/master/_posts/_2022-05-11-noisy-tutorial-1/figure3.png?raw=true" style="width:70%">
</figure>
<center>
En la próxima entrega veremos un método más sofisticado.

