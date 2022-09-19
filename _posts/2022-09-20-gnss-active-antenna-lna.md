---
layout: post
title: Active GNSS antenna design (Part II)
---

Alright, here we are for the second part of the GNSS active antenna design. This time it didn't took so long to get a new post release into the blog. I guess it's because I haven't been doing any online courses or anything, so more free time to play around with 

<iframe src="https://giphy.com/embed/V2Ylf5EhsUPMQ" width="480" height="201" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/reactiongifs-request-redditors-V2Ylf5EhsUPMQ">via GIPHY</a></p>

...engineering!

In the [last post](https://theantennaguy.github.io/gnss-active-antenna/), I described the antenna portion design. In this post I explain the LNA (Low Noise Amplifier) part, the design steps and the measurement results of the prototype.

I mentioned in the last post that for the LNA design I've chosen the BFP640FESD low noise BJT transistor from Infineon. Because Infineon has good documentation, has support files for simulation, it's cheap and I had it available - problem is sometimes I trust too much on my memory, and when the PCBs for this board arrived, I realized I had not the BFP640FESD, but the BFP740F! 

<div class="tenor-gif-embed" data-postid="11107551" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/elaine-well-thats-because-youre-an-idiot-seinfeld-idiot-gif-11107551">Elaine Well Thats Because Youre An Idiot GIF</a>from <a href="https://tenor.com/search/elaine-gifs">Elaine GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>

Oh well, I'll explain the design steps with the BFP540FESD and use this opportunity to show what I checked and verified the impact of adapting the existing board and matching networks to the BFP740F instead of the BFP640F.

Alright, so first step is to download the S-parameter files for the transistor. Otherwise, it's also possible to use the component models for SPICE, Keysight ADS or AWR Microwave Office - good guy Infineon having the support for all the tools. With the latter two, one can use non-linear simulations and make a more refined design. However, I'll keep it simple and go for the design steps using the linear models (S-parameters) and design the LNA with those only. This is possible for LNAs, especially for a GNSS application, where power levels are so low that we are sure to be operating in a linear range of operation of the transistor. It would be more risky to assume something like this when designing a PA (Power Amplifier).

The S-parameter folder from Infineon has a bunch of files with the parameters of the transistor for different bias levels. Therefore, the first step is to choose the right bias point. For that we look into the datasheet and check the gain and noise figure plots and determine the preferable bias that will give us the operation parameters we want. The following pictures are taken from the [transistor's datasheet](https://www.infineon.com/dgdl/Infineon-BFP640FESD-DS-v02_00-EN.pdf?fileId=5546d462689a790c01690f03c65d392e) and show the variation of the Noise Figure and Gain with the collector current for a bias voltage of 3 V:

![noisef](/images/post14/noise-figure.png) | ![gain](/images/post14/gain.png)  
:-------------------------:|:-------------------------:
Noise figure with collector current | Gain with collector current 

From the plot on the left we can see the minimal NF is attained with a low collector current, but the gain is smaller for lower currents. The compromise is to have the collector current (IC) between 20 and 30 mA. This provides a noise figure between 0.9 and 1.1 dB and a gain between 26 and 28 dB. Something in between would be preferable, but since Infineon only provides S-parameters for the 20 and 30 mA, we have to go with either one or the other and I'll choose to go with higher gain IC = 30mA.

We fetch the S-parameters file corresponding to that bias point and from here I'll be using [QUCStudio](http://qucsstudio.de/) for designing the matching networks and bias networks for the circuit. First I load the corresponding S-parameters to QUCSstudio and check the stability, noise and gain circles.

![sparams](/images/post14/sparams.png) | ![stability](/images/post14/stability.png)  
:-------------------------:|:-------------------------:
S-parameters | Stability
:-------------------------:|:-------------------------:
![sparamsmith](/images/post14/sparams_smith.png) | ![circles](/images/post14/circles.png)  
:-------------------------:|:-------------------------:
S-parameters | Gain and Noise circles

First, from the stability results we can see the transistor is unconditionally stable, that is, \mathit{K} and $\mu$ > 1 and $\Delta$ < 1, this is good since we can design the matching networks for the noise/gain we want and don't have restrictions with stability of the amplifier. To obtain the \mathit{K}, $\mu$ and $\Delta$ parameters we place equations in QUCS schematic as I show in the final circuit figure further down this post. The equations for the Rollet's stability criterion (\mathit{K}-factor) and the Edwards-Sinsky stability criterion ($\mu$-factor), as found in [Pozar's](https://www.wiley.com/en-us/Microwave+Engineering%2C+4th+Edition-p-9780470631553):

$$K=\frac{1-|S_{11}|^2|-S_{22}|^2+|\Delta|^2}{2|S_{12}S_{21}|}$$

$$\Delta=S_{11}S_{22}-S_{12}S_{21}$$

$$\mu=frac{1-|S_{11}|^2|}{|S_{22}-S_{11}\Delta|+|S_{12}S_{21}|}$$

You can look into the book to know how you come to these criteria, but the principle is that if the Rollet's stability criteria or the Edwards-Sinsky criteria are met, meaning the \mathit{K} and $\mu$ are above 1, the transistor is unconditionally stable. When this does not happen, then the input and output matching networks need to be carefully designed in order to avoid getting an oscillator instead of a transistor.

Next, we look into the Gain and Noise circles, these are generated for a NF (Noise Figure) < 1.5 and a Gain > 26 dB. There's a zone where both these circles intersect each other. If we design our input network to match any impedance in this zone, and then design the output matching network for the complex match, we get a noise figure below 1.5 and a gain above 26 dB. For reference, I also plotted there the 'Sopt' which is the optimal impedance for minimum noise, which is why it is right in the center of the Noise circle. Luckily, this spot falls right in the intersection between our noise and gain circles, and besides, it is a real impedance (no imaginary part), which means a simple $\lambda$/4 line can be used to match it. These pieces seem the be falling into place quite nicely...

<iframe src="https://giphy.com/embed/l2Je6sbvJEn1W9OWQ" width="480" height="366" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/season-3-the-simpsons-3x11-l2Je6sbvJEn1W9OWQ">via GIPHY</a></p>

To get the noise and gain circles in QUCStudio, run a S-parameter simulation for a single frequency, in this case I did for 1.575 GHz, place a smith chart into the data analysis pane and plot the 'GaCircle(x)' and the 'noiseCircle(y)', where the 'x' and 'y' parameters are the gain and noise you want in **linear form**!

We use the line calculator embedded into QUCS to calculate that line characteristics for the input match, we know it has to have an impedance of $\sqrt{50 x 32} = 40 \Omega$:

{:refdef: style="text-align: center;"}
![lambda4](/images/post14/line_section_1.png)
{:refdef}

After adding this line section to the circuit input and simulating, we get the following results for the S-parameters:

{:refdef: style="text-align: center;"}
![sparams2](/images/post14/lsparams_after_input.png)
{:refdef}

From here, we just need to do matching of the output impedance to the complex conjugate in order to get maximum power transfer, therefore, to match the impedance of 45.6-j40. This impedance is really close to 50 Ohm, hence we'll just add a series inductor to bring it upwards in the direction of the circle center. I could do some calculations to determine the correct value of inductor to match this impedance, but my lazy ass we'll do it the lazy way, I just add the inductor to the circuit and click "Tune" to vary the inductor value and iteratively see in the smith chart the output match moving. Which led me to a value of 6 nH and the resulting final S-parameters:

![sparamsf](/images/post14/sparams_final.png) | ![sparamsfsmith](/images/post14/sparams_final_smith.png)  
:-------------------------:|:-------------------------:
Final S-parameters (Cartesian) | Final S-parameters (Smith chart)

Rending a final circuit that looks like this:

{:refdef: style="text-align: center;"}
![circuit](/images/post14/final_circuit.png)
{:refdef}

The 22 pF caps at each side are essentially DC blocks for the biasing voltages of the transistor. The high capacitance has little effect at the working difference, but still they impose some effect, so I added those and always simulated with them so I was designing having that small effect of the DC blocks in consideration and not be surprised later on.

