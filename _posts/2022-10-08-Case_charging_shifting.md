---
layout: post
title: A back of the enveloppe case for load-shifting
comments: True
share: True
---

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2022-10-08/ev_generator.jpg" style="width: 40%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;">Huh??</span>
</div>

A recurring question I ask myself is:

__How much carbon savings can one actually achieve by load shifting e.g. an electric car charge?__

Load shifting electric car charges or smart charging refers to the act of using an external signal (price, carbon intensity) for optimising the decision of when and how much to charge.
There is no doubt that, even without carbon-aware smart charging, switching from a combustion engine car to an electric vehicle is beneficial in terms of greenhouse gas emissions [1].

Furthermore, as more and more variable renewable electricity sources are integrated into the grid, its carbon intensity will display a higher variability. See below for a typical day in Sjælland, Denmark. The carbon intensity of the grid goes from around 60 gCO2eq/kWh to more than 130 gCO2eq/kWh (more than X2!) in a matter of hours.

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2022-10-08/DK-DK2.png" style="width: 60%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;">A typical windy day in Eastern Denmark. <a href="https://app.electricitymaps.com/zone/DK-DK2">Source</a></span>
</div>

This variability opens up the possibility to be leveraged for optimising any carbon-intensive electric activity with some level of flexibility. Electric car charges are one of the best example of this. Hence, my original question, how much benefit can we actually hope to get? And how much better can we make electric vehicles?

To do this, I'll use a back of the envelope optimisation procedure in a simplified scenario.

### Use case

Let's stay in Eastern Denmark, and look at the example of Mette. Let's say that she is an eco-conscious engineer that works for Novo Nordisk. Everyday, she has to commute from her cosy apartment in central Copenhagen to Målov, where the company has production facilities. She drives a Tesla model 3 back and forth, for a total of around 70 km per day. She usually makes sure that her car is plugged in after she's done putting her kids to bed, and walking her dog. Overall that means that the car is plugged in between 00:00 an 07:00 every day.

### The modelisation

We will rely on the following assumptions, which should correspond to standard values for a Tesla model 3 [2]:

* Total battery capacity: 50 kWh
* Maximal charging power: 11 kW (assuming home charger, not fast charger)
* Daily energy consumption: 11.154 kWh (City/Highway combined drive cycle, in cold to mild climate for 70 km per day)
* Optimisation window: 48 hours (She would have access to 48h ahead forecasted carbon intensity)

Mette likes the safety of knowing that at the end of the optimisation window she will have a full battery. Physically, it's also impossible to charge more after a day than what was consumed.

__Naive charging__

In the naive scenario, the car is plugged and charges at full power until it is fully charged.

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2022-10-08/naive_profile.png" style="width: 90%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;">The charge profile in the naive scenario.</span>
</div>

The daily energy consumption being 11.154 kWh, it takes 1.02 hours to charge the car everyday.

__Smart charging__

In the smart charging scenario, a simple optimisation algorithm is used to find the optimal charge times and power. It could potentially result in something like below.

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2022-10-08/optimal_profile.png" style="width: 90%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;">Potential optimal profile with load shifting.</span>
</div>

The problem we are trying to optimise can be expressed in the standard form as:

$$\begin{aligned}
\min_{x} & \;\;\;\mathbf{c}^T \mathbf{x} \\
\text{s.t.} & \;\;\;\mathbf{A}_{ub}\mathbf{x} \leq \mathbf{b}_{ub}\\
& \;\;\;\mathbf{A}_{eq}\mathbf{x} \leq \mathbf{b}_{eq}\\
& 0 \leq x_i \leq P_{\text{max}}, \quad i = 1, \dots, n
\end{aligned}$$

With $$E_d = 11.154$$ (kWh) the daily energy usage, we have:

* $$\mathbf{x}$$ is the vector of decision variables. Here $$x_i$$ represents the amount of energy charged at hour $$i$$.
* $$\mathbf{c}$$ is the vector of cost coefficients. Here $$c_i$$ represents the carbon intensity of the grid at hour $$i$$.
* $$\mathbf{A}_{ub}$$ is the matrix of upper bound constraints and $$\mathbf{b}_{ub}$$ is the vector of upper bound constraints. Here $$\mathbf{A}_{ub}$$ and $$\mathbf{b}_{ub}$$ are used to express the constraint of not being able to charge more than what was consumed.

$$\begin{aligned}
\mathbf{A}_{ub} = \begin{bmatrix}
\mathbf{L} & \mathbf{0} \\
\mathbf{J} & \mathbf{L} \\
\end{bmatrix}, \quad
\mathbf{b}_{ub} = \begin{bmatrix}
E_d \\
\dots \\
E_d \\
2 \cdot E_d \\
\dots \\
2 \cdot E_d \\
\end{bmatrix}
\end{aligned}$$

with $$\mathbf{L}$$ being the lower triangular matrix of ones and $$\mathbf{J}$$ being the matrix of ones.

* $$\mathbf{A}_{eq}$$ is the matrix of equality constraints and $$\mathbf{b}_{eq}$$ is the vector of equality constraints. Here $$\mathbf{A}_{eq}$$ and $$\mathbf{b}_{eq}$$ are used to express the constraint of having a full battery at the end of the optimisation window.

$$\begin{aligned}
\mathbf{A}_{eq} = \begin{bmatrix}
1 & \dots & 1 \\
\dots & \dots & \dots \\
1 & \dots & 1 \\
\end{bmatrix}, \quad
\mathbf{b}_{eq} = 2 \cdot \begin{bmatrix}
E_d \\
\dots \\
E_d \\
\end{bmatrix}
\end{aligned}$$

* $$P_{\text{max}}$$ is the maximal charging power.

This linear optimisation problem can directly be solved by simple solvers.

### Results

Overall, and reassuringly, we can see below that the daily emissions are lower for the smart charging scenario.

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2022-10-08/yearly_comparison.png" style="width: 90%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;">Daily emissions for both charge profiles.</span>
</div>

Looking at a specific day, we see what we would expect. Below highlights the selected charging times in both scenarii.
For that specific two day window, the second day has much lower carbon intensity, and the algorithmn correctly tells our dear Mette to only charge during the second night.

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2022-10-08/largest_difference.png" style="width: 90%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;">Comparison of charge profiles on a given day. Colours highlight the charging times selected by both profiles.</span>
</div>

Overall, this simple back of the enveloppe optimisation strategy leads to 66 kg of CO2 saved per year. __That amounts to a 10% reduction of total emissions related to car charging.__

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky"></th>
    <th class="tg-0pky">Naive</th>
    <th class="tg-0pky">Optimal</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">Total emissions (kgCOeq)</td>
    <td class="tg-0pky">643</td>
    <td class="tg-0pky">577</td>
  </tr>
</tbody>
</table>
<span style="color: #666; font-size: 13px; font-style: italic; margin-top: 16px;">Total emissions.</span>
</div>

In practice this very simple modelisation simply amounts to selecting the hours with the lowest carbon intensity in the optimisation window and charging as much as possible during these hours. This simplistic formulation of the problem might seem overly complex, and it is, but could be expanded with more realistic constraints.

For example, the behaviour of Mette could be different on weekends, and she might allow for greater flexibility than what we did.

Finally, orders of magnitude are important to keep in mind when considering how useful it would be in practice to roll-out smart charging. These 66 kg of greenhouse gas saved are important as they are very much a low-hanging fruit. They nevertheless are only a fraction of what Mette would emit flying to Canada for her holidays, thinking that her ecoconscious behaviour compensates for her flying.

Thanks for reading!

You can find the code I wrote for this calculation [here](https://drive.google.com/file/d/1K_SJL0JPzo8AGAxZ6-Uh_IJJa55zUyKj/view?usp=sharing).


## References

* [1] [EPA](https://www.epa.gov/greenvehicles/electric-vehicle-myths)
* [2] [EV database](https://ev-database.uk/car/1060/Tesla-Model-3-Standard-Range)
