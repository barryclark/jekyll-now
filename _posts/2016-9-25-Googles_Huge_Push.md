---
layout: post
title: Google hit 2 million self-driving miles, and they're pushing for much more
---

<div>
    <a href="https://plot.ly/~alexcthompson/467/" target="_blank" title="Google&#39;s Total Autonomous Miles" style="display: block; text-align: center;"><img src="https://plot.ly/~alexcthompson/467.png" alt="Google&#39;s Total Autonomous Miles" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="alexcthompson:467"  src="https://plot.ly/embed.js" async></script>
</div>

Google cars have driven 2 million miles in self-driving mode (if you believe in projections.) And Google is making a huge push to drive more autonomous miles.  In August of last year, Google's cars drove nearly 100,000 miles (precisely, 93,023).  This August, they hit 169,935.  That's enough driving to wear out one Toyota a month, or two GM cars from the 80s ;)  Still, while that's a big jump, it is not that impressive when you realize that Google probably has to double autonomous mileage many times to prove out level 4 autonomy.

<div>
    <a href="https://plot.ly/~alexcthompson/461/" target="_blank" title="Google&#39;s Self-Driving Project Mileage" style="display: block; text-align: center;"><img src="https://plot.ly/~alexcthompson/461.png" alt="Google&#39;s Self-Driving Project Mileage" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="alexcthompson:461"  src="https://plot.ly/embed.js" async></script>
</div>

*(I compiled this data from [Google's monthly reports](https://www.google.com/selfdrivingcar/reports/){:target="_blank"} on their Self Driving Car program.  You may grab an Excel sheet, as well as the code for these charts from [this GitHub repo](https://github.com/alexcthompson/google_autonomous_stats){:target="_blank"}.)*

Total miles, the dashed line, conceals the real move.  While Google's driving miles only went up 83%, their miles in autonomous mode skyrocketed by 119%.  To do that, Google has slowly increased the percentage of miles their cars drive in autonomous mode:

<div>
    <a href="https://plot.ly/~alexcthompson/463/" target="_blank" title="Mileage in Autonomous Mode" style="display: block; text-align: center;"><img src="https://plot.ly/~alexcthompson/463.png" alt="Mileage in Autonomous Mode" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="alexcthompson:463"  src="https://plot.ly/embed.js" async></script>
</div>

This is way more significant.  The race to level 4 autonomous cars is not about how many miles you can drive autonomously, it's about the percentage of situations in which the cars can safely and effectively drive themselves.  You could drive 1 million miles in autonomous mode, but if you also drove 9 million miles in manual mode, you're not doing so hot. Each percentage point moved from the manual driving column to the autonomous column likely represents a lot of hard work to deal with different driving situations.

One last graph: let's look at the number of autonomous miles driven per deployed car, per day:

<div>
    <a href="https://plot.ly/~alexcthompson/465/" target="_blank" title="Autonomous Miles Driven Per Day, Per Car" style="display: block; text-align: center;"><img src="https://plot.ly/~alexcthompson/465.png" alt="Autonomous Miles Driven Per Day, Per Car" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="alexcthompson:465"  src="https://plot.ly/embed.js" async></script>
</div>

Wow, look at that jump!  While Google has added a few vehicles to their test fleet, they've really increased the utilization of the individual vehicles.

Just how much driving is that?  Considering the following factors:

- Google limits the speed of their cars to 25 mph while in autonomous mode.
- Having encountered a few of the Google cars on the streets of Palo Alto and Mountain View, I know they go slower.
- If your max is 25 mph, lights and stop signs will bring your speed down.

Based on that, I'll guesstimate that a Google car averages 15 mph while in autonomous mode.

When Google's team was driving the cars ~30 miles per day, that was about 2 hours of driving in autonomous mode @ 15 mph.  For engineers collecting their own data, and living the philosophy of 'eat your own dog food', that's a reasonable burden if it's split across multiple engineers.

But last month, when Google's cars were driving nearly 70 miles in autonomous mode (plus some in manual), that represents roughly 5 hours a day of driving in autonomous mode.  That's no longer an acceptable commitment for $100 / hour engineering talent.  So it makes sense that, in May, Google started hiring full time drivers for the cars.

The rest of this post is a bit of speculation about Google's position in the self-driving space.

# What's next for Google

Where is Google headed?  Google's strategy seems to rest on solving the 2nd hardest problem first: developed country urban driving.  If you rank the difficulty of broad types of autonomous driving problems, one rough ranking by difficulty might shake out like this:

1. Everything outside the developed world
2. Urban driving in the developed world
3. Highway and rural driving in the developed world

Google seems to have chosen to take on #2.  I think this makes sense: solve the biggest problem for the developed world, and highway driving is a quick solve after that.  Based on the fact that they're putting in loads of real autonomous miles, Google might have level 4 autonomy in urban settings years before anyone else.

If I'm Google, a strategy to increase my lead might be to solve a specific subproblem of the developed-urban problem: driving mostly low built lower density environments like Mountain View, Austin, Phoenix and Kirkland.  In other words, NYC is not the first problem I chase.  Once limited to those types of cities, I would find all the hairiest situations in those environments, and I could do it by:

- Driving more miles.
- Adding cities that have varied driving policy and **weather**, but somewhat similar traffic levels and engineering.
- And I would start to pushing to drive more night miles.

The data is consistent with that, though we have no idea how many night miles Google is driving.

# Level 4 autonomy on fixed route

It seems like Google's team might be ready to take on driving fixed routes autonomously.  It's a lot easier to drive the same route everyday.  Especially if you're an ever vigilant algorithm that never lets its guard down, and doesn't fall into listless boredom.  Driving a fixed route allows you to limit your car to known traffic signals and road engineering, and to expose your vehicle to 99.99% of the circumstances it might encounter, **before deployment,** reducing the surprise factor.

Google has so many autonomous miles in Mountain View and adjacent cities, I wager they can pick out routes on which they've been almost completely autonomous.  With [Uber entering the realm of public transportation](http://gizmodo.com/uber-and-lyft-come-for-public-transportation-1785330916){:target="_blank"}, Google could put a big dent in Uber's uber appearance by deploying a self-driving public transit pilot.  

To mitigate your risk in new situations you could bias your autonomous vehicle to be very cautious in new situations.  Google does this in the extreme; I've slightly cut off a Google car on bicycle and it backed way off.  The Oatmeal captured it nicely when [the cartoonist was invited to ride in a Google car](http://theoatmeal.com/blog/google_self_driving_car){:target="_blank"}:

![Google car and pedestrian play the who goes first game](http://s3.amazonaws.com/theoatmeal-img/blog/google_self_driving_car/intersection.png)

To further mitigate risk, you could drop your speed.  Traffic studies consistently show that the risk of a pedestrian dying from a collision increases dramatically as impact speed goes from 20 mph to 30 mph.  See for example, [this study by the AAA Foundation for Traffic Safety](https://www.aaafoundation.org/sites/default/files/2011PedestrianRiskVsSpeed.pdf){:target="_blank"}, where they found that the risk of pedestrian fatality is 10% at 23 mph impact speed, but rises to 50% by 31 mph.

By limiting their cars to 25 mph, Google is almost guranteeing that their first serious collision with a pedestrian or cyclist will be below 20 mph, since the car has an extreme bias for safety.  This means that they're unlikely to be involved in anything nasty like Tesla was for a long time.

So, perhaps a fixed route pilot is in Google's near future.

That seems like enough speculation for now!