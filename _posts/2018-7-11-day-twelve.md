<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML' async></script>

Today is going to be about trying to get an accurate error estimate on all our flux values. Dr. G posted a helpful comment on [yesterday's post](https://thom-ory.github.io/day-eleven/) about error esetimation using Poisson statistics. I'd seen Poisson mentioned a few times in the material I've read so far but never connected it to this. Dr. G described the error estimation that Poisson describes as the "uncertainty in counting something" that can be described as \sqrt{N}. I did some googling about Poisson and read a [Wikipedia article](https://en.wikipedia.org/wiki/Poisson_distribution) that was actually obscenely helpful, where I learned that the probability distribution of an event _k_ happenning follows a Poisson distribution if (from Wikipedia)
- _k_ is the number of times an event occurs in an interval and _k_ can take values 0, 1, 2, ….
- Events occur independently (the last event's occurance doesn't influence the next one's)
- The rate at which events occur is constant
- At each small sub-interval exactly one event either occurs or does not occur (no simultaneous events)
- The probability of an event in a small sub-interval is proportional to the length of the sub-interval

It makes perfect sense why we're using this for stars, then. If, as astronomers do, we're counting the number of times an electron in the CCD gets excited and we assume the electron was excited by a photon from a source we're observing (and call it _k_), then there should be a constant stream of photons from the source and we should register counts (electron excitations) in the way described by the assumptions of Poisson statistics. So, if you performed the same observation many times and plotted your results (on the x-axis: the data you get (like total counts or number of times _k_ happened); y-axis: the number of times you got that result), the graph would be a Poisson distribution:

    $\mathrm{P(k)}\ = \mathrm{e}^{-\lambda}\frac{k}^{\lambda}{k!}$
