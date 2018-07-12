Today is going to be about trying to get an accurate error estimate on the flux rate values I've been finding in that random Hubble image I've been working with. Dr. G posted a helpful comment on [yesterday's post](https://thom-ory.github.io/day-eleven/) about error estimation using Poisson statistics. I'd seen Poisson mentioned a few times in the material I've read so far but never connected it to error estimation. Dr. G described the error estimation that Poisson provides as the "uncertainty in counting something" that can be described as \sqrt{N} where _N_ is the number of things you're counting. I did some googling about Poisson and read a [Wikipedia article](https://en.wikipedia.org/wiki/Poisson_distribution) that was actually obscenely helpful, where I learned that the probability distribution of an event _k_ happenning within a certain time interval follows a Poisson distribution if:  
  - _k_ is the number of times an event occurs in an interval and _k_ can take values 0, 1, 2, ….
  - Events occur independently (the last event's occurance doesn't influence the next one's)
  - The rate at which events occur is constant
  - At each small sub-interval exactly one event either occurs or does not occur (no simultaneous events)
  - The probability of an event in a small sub-interval is proportional to the length of the sub-interval

It makes perfect sense why we're using this for stars, then. If, as astronomers do, we're counting the number of times an electron in the CCD gets excited and we assume the electron was excited by a photon from a source we're observing (and call it _k_), then we should register an integer number of counts (electron excitations/_k_ in this example) in the way described by the assumptions of Poisson because there should be a constant stream of photons from the source. So, if you performed the same observation many times and plotted your results with the x-axis displaying the result of a single observation (total counts/number of times _k_ happened) and the y-axis displaying the probability of getting that result, the graph would be a Poisson distribution where the probability of _k_ happening a certain amount of times during a time interval _t_ is: 
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML" async>
</script>
</head>
<body>
<p>
   {% raw %}  
  \[ P(k|t) = {e^{-\lambda} \lambda^k \over k!} = {e^{-rt} rt^k \over k!} \]  
   {% endraw %}   
</p>
</body>
</html>
   _where \lambda (a scalar) is the number of events k in a certain interval, t is the time interval, r is the rate at which counts are observed (assumed constant), and e is Euler's constant_   
   
So, since we only performed one observation, there is an uncertainty in the number of photons the star consistently emits in equal-length time intervals, which is what we're really trying to determine. If we had taken the same observation at a different time, there is a chance we would have gotten a different result based on the Poisson distribution. We can derive this uncertainty in the stars actual flux (or flux rate, depending on your data) from Poisson because our data obeys Poisson's assumptions. From Poisson, the uncertainty is, as Dr. G said, \sqrt{k} (just redefining a variable to mirror the math I've learned today). 

Looking through the [photutils documentation](http://photutils.readthedocs.io/en/stable/index.html), this definition of the uncertainty makes even more sense. The `aperture_photometry()` command that calculates the flux (or flux rate) of the stars has an option to calculate total error based on Poisson statistics. The math it uses is:  
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML" async>
</script>
</head>
<body>
<p>
  {% raw %}   
  \[ \Delta F = \sqrt{\sum_{i=1}^{N_k}\sigma_i^2} \]  
  {% endraw %}  
</p>
</body>
</html>
  _where \Delta F is the total flux error for the source, \sigma_i is the error for each pixel, and N_k is the number of pixels in the aperture object_  
  
So, if the error on each pixel is \( \sigma_i = sqrt{k_i} \) like Dr. G and Poisson say (where k_i is the number of events at each pixel), the above equation becomes:  
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML" async>
</script>
</head>
<body>
<p>
  {% raw %}   
  \[ \Delta F = \sqrt{\sum_{i=1}^{N_k}k_i} = \sqrt{k} \]  
  {% endraw %}  
</p>
</body>
</html>
  _Where k_i is the number of events at each pixel, N_k is the number of pixels in the aperture object, and k is number of events in the aperture object_ 
  
Which is just exactly the same as the square root of the total flux in the aperture object. Seems reasonable. Now that I understand the theory behind how to estimate uncertainty, I can start integrating it into my code. 

## Coding [aperture_photometry.py](https://github.com/GosnellResearchGroupSummer2018/NGC6819/blob/master/photometry%20codes/aperture_photometry.py)
So, I have two options for coding as I see it. I could add a few lines after the aperture photometry has been done that calculate the error for each source and then add that back in the text file as a new column, or I can write a function that calculates the error for each pixel, then use the built in ability of `aperture_photometry()` to calculate the total error and have that column in the text file automatically. The second option seems a little easier to me and I think would require fewer lines of code. 

So, this went pretty smoothly. At first, I had a bit of an error back-and-forth; I was either dividing by zero or getting complex values. If I replaced all the negatives in the data array with zero (which, surprisingly, there _were_ negatives in the raw data), then `DAOStarFinder()` has a divide by zero error when trying to find flux (even though I don't actually care  what `DAOStarFinder()` says the flux is because it's inaccurate compared to aperture photometry), but if I don't replace the negatives, I get complex numbers from `np.sqrt()` while finding the uncertainty. The solution was obvious though, just wait to replace the negatives until after source detection but before error estimation. Now, running the codes gives you a [phot_table](https://github.com/GosnellResearchGroupSummer2018/NGC6819/blob/master/first_attempt_at_HST_source_detection/day_four/phot_table.txt), an image with all the sources circled, and a graph that plots the flux of each source with uncertainty bars:  
![flux_rates]({{thom-ory.github.io}}/images/flux_rates.png)  
_Sources with the section of the sky between RA = {-19:41:06.6573 U -19:41:05.6944} Dec = {40:10:46.003 U 40:10:44.051} and the the flux rates of those sources. Sources are numbered 1-147 as shown in [phot_table.txt](https://github.com/GosnellResearchGroupSummer2018/NGC6819/blob/master/first_attempt_at_HST_source_detection/day_four/phot_table.txt), which is how the x-axis is organized_

---
I'm happy with these results.

# Conclusion
I'm honestly not sure about next steps. I think I might move on to PSF photometry soon, but I am still going to read those [manuals](http://www.stsci.edu/hst/HST_overview/documents/) for [HST](http://www.stsci.edu/hst/HST_overview/documents/datahandbook/toc.html) and [WFC3](http://www.stsci.edu/hst/HST_overview/documents/datahandbook/toc.html) data analysis. I also want to read the [pandas tutorial](https://pandas.pydata.org/pandas-docs/stable/10min.html) and the [astrpoy resources](http://docs.astropy.org/en/stable/index.html), especially the one Rory found on writing text files using `astropy.io.ascii()`. 
