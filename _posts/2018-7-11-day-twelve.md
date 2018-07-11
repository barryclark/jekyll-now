Today is going to be about trying to get an accurate error estimate on all our flux values. Dr. G posted a helpful comment on [yesterday's post](https://thom-ory.github.io/day-eleven/) about error estimation using Poisson statistics. I'd seen Poisson mentioned a few times in the material I've read so far but never connected it to error estimation. Dr. G described the error estimation that Poisson provides as the "uncertainty in counting something" that can be described as \sqrt{N} where _N_ is the number of things you're counting. I did some googling about Poisson and read a [Wikipedia article](https://en.wikipedia.org/wiki/Poisson_distribution) that was actually obscenely helpful, where I learned that the probability distribution of an event _k_ happenning within a certain time interval follows a Poisson distribution if:  
  - _k_ is the number of times an event occurs in an interval and _k_ can take values 0, 1, 2, ….
  - Events occur independently (the last event's occurance doesn't influence the next one's)
  - The rate at which events occur is constant
  - At each small sub-interval exactly one event either occurs or does not occur (no simultaneous events)
  - The probability of an event in a small sub-interval is proportional to the length of the sub-interval

It makes perfect sense why we're using this for stars, then. If, as astronomers do, we're counting the number of times an electron in the CCD gets excited and we assume the electron was excited by a photon from a source we're observing (and call it _k_), then there should be a constant stream of photons from the source and we should register an integer number of counts (electron excitations) in the way described by the assumptions of Poisson statistics. So, if you performed the same observation many times and plotted your results with the x-axis displaying the data you get (like total counts/number of times _k_ happened) and the y-axis displaying the probability of getting that result, the graph would be a Poisson distribution where the probability of _k_ happening a certain amount of times during a time interval _t_:  
   {% raw %}  
  \[P(k|t) = {e^(-\lambda) \lambda^k \over k!} = {e^(-rt) rt^k \over k!}\]  
   {% endraw %}   
   _where \lambda (a scalar) is the number of events k in a certain interval, t is the time interval, r is the rate at which counts are observed (assumed constant), and e is Euler's constant_   
   
So, since we only performed one observation, there is an uncertainty in the number of photons the star consistently emits in equal-length time intervals, which is what we're really trying to determine. If we had taken the same observation at a different time, there is a chance we would have gotten a different result based on the Poisson distribution. We can derive this uncertainty in the stars actual flux (or flux rate, depending on your data) from Poisson because our data obeys Poisson's assumptions (we claim this based on the physics of observing a star, described above). From Poisson, the uncertainty is, as Dr. G said, \sqrt{k} (just redefining a variable to mirror the math I've learned today). 

Looking through the [photutils documentation](http://photutils.readthedocs.io/en/stable/index.html), this definition of the uncertainty makes even more sense. The `aperture_photometry` command that calculates the flux (or flux rate) of the stars has an option to calculate total error based on Poisson statistics. The math it uses is:  
  {% raw %}   
  \[\Delta F = \sqrt{\sum_{i=1}^{N_k}\sigma_i^2\]
  {% endraw %}  
  _where \Delta F is the total flux error for the source, \sigma_i is the error for each pixel, and N_k is the number of pixels in the aperture object_   
So, if the error on each pixel is as Dr. G described (\sqrt{k}) = \sigma_i), the above equation becomes:  
  {% raw %}   
  \[\Delta F = \sqrt{\sum_{i=1}^{N_k}k\]  
  {% endraw %}  
  _Where k is the number of counts in a single pixel_ 
Which is just exactly the same as the square root of the total flux in the aperture object. Seems reasonable. Now that I understand the theory behind how to estimate uncertainty, I can start integrating it into my code. 

## Coding
