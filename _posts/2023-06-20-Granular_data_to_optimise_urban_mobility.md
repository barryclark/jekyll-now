---
layout: post
title: Using granular data to optimise urban mobility
comments: True
share: True
canonical_url: "https://www.electricitymaps.com/blog/using-granular-electricity-data-to-optimise-urban-mobility"
---

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/tanya-pro-O2JsA_nz4pQ-unsplash.jpg" style="width: 100%; overflow: hidden; margin: 16px 0;">
</div>

_A quantification of emission savings for electric vehicles in Frederiksberg_

## Introduction

### FUSE

The goal of the Frederiksberg Urban Smart Electromobility (FUSE) project is to inform and accelerate investments in urban charging infrastructure by providing solutions and advice aimed at municipalities and grid operators for an efficient and smart charging infrastructure.

### Frederiksberg

The city of Frederiksberg, located in the capital region of Denmark, and home to around 100 000 inhabitants, has set itself the ambitious goals of becoming carbon-neutral by 2030 and achieving net-zero emissions by 2050. Accounting of emissions towards these goals cover scope 1 & 2 of emissions. This includes emissions for thermal engine vehicles of residents (scope 1), as well as emissions from the power plants supplying the electricity charged into electric vehicles of residents (scope 2).

Reducing transportation emissions will therefore be an important, necessary step to achieve these goals.

### Objective

This report will outline how the electrification of transportation within Frederiksberg can contribute to reducing the total carbon emissions of the city. To do so, it will utilise data collected from two curbside charging stations, totalling more than 1700 charging events. Total emissions resulting from the electricity consumption of charges will be quantified, and compared to higher emissions from thermal engine cars that would have burned an equivalent amount of fuel.

Charging emissions when optimising the charging profile will also be quantified, and provide an actionable pathway to reduce electric vehicles’ emissions even further.

### Quantifying electricity emissions

The data used to assess the carbon intensity of the consumed electricity during charges is sourced from [Electricity Maps](https://www.electricitymaps.com/). Electricity Maps provides granular electricity and carbon data worldwide, which enables an accurate mapping of any electricity consumption to its associated carbon emissions.
The carbon intensity dataset used throughout this study consists of **hourly** values of **direct emission factors** (scope 2 compliant) for the grid of [East Denmark](https://app.electricitymaps.com/zone/DK-DK2), where Frederiksberg is located.

Two main methodologies exist to compute the carbon intensity of consumed electricity. The average carbon intensity is obtained by assessing the emissions of the mix of electricity consumed. On the other hand, the marginal carbon intensity is obtained by identifying which power plant provides the additional electricity requested as a result of the decision to consume at a specific time.

For this study, the **average carbon intensity was preferred**. The two main reasons for this are that 1. EV Charge profiles should be seen as long-term, systematic decisions, which are poorly captured by available short-term marginal carbon intensities 2. Scope 2 emissions are used to assess progress towards carbon neutrality goals, which are better aligned with the usage of the average carbon intensity.

We refer to [Electricity Maps’ comparison blog post](https://www.electricitymaps.com/blog/marginal-vs-average-real-time-decision-making) for further information.

## The Charges Dataset

The dataset for EV charges on which this study is based has been collected by [Spirii](https://spirii.com/en), a Danish EV charging platform. It consists of 1779 charge logs from two curbside charging stations, Adolph Steens Allé (1217 charges) and TEC (562 charges), operated by Spirii. The charges were recorded between the 2021-09-02 and the 2022-09-27. Each station consists of 6 individual chargers, identified by their ID, following the format *“DK.SPI.ZXXXX”* in subsequent visualisations.

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/street_view.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure 1:</b> The two locations considered in the charges dataset. On the left, a residential street (Adolph Steens Allé). On the right, a street facing an educational institution (Stæhr Johansens Vej, referred as TEC). Note that the chargers were not yet installed when the pictures were taken.</span>
</div>

All charge events with missing or implausible data are removed from the study, which accounts for only a small fraction (<10%) of total events.

The distribution of the charge durations per charger and charging station is exposed in Fig. 2. A slight majority of charges (55%) lasts strictly less than 6 hours, indicating a charging during daylight hours. It is also noticeable that the station located in a residential street (Adolph Steens Allé) displays more frequent long duration charges (23% of charges last more than 10 hours in TEC vs 29% in Adolph Steens Allé).

The discrimination of charges between those that started before and after 17:00 (Fig. 3) reveals an interesting pattern. Charges that start after 17:00 are very likely to last longer than 10h (71%), contrary to those that start before (19%). This suggests that smart charging could be easily suggested by default to users connecting in the evening, a proposition otherwise supported in other bodies of work of the FUSE project.

Total power consumption reaches at the maximum 79 kWh, which is within reasonable bounds for current electric vehicles \[[1]\]. We did not have access to the nominal power ratings of the chargers, but can infer from the data that they can reach around 15kW, which is in line with common values found in the literature \[[2]\].

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/Adolph Steens Allé_charging_time.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <img src="../../resources/posts/2023-06-20/TEC_charging_time.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure 2:</b> Distribution of charging durations per charger for the two stations. Top represents Adolph Steens Allé, bottom TEC.</span>
</div>

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/charging_time.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure 3:</b> Distribution of charging durations for charges started before (green) and after (red) 17:00.</span>
</div>

## EVs vs ICEs

First off, as the overall goal of Frederiksberg is to become net-zero by 2050, it is important to verify that the replacement of thermal transportation vehicles by electric counterparts leads to a noticeable decrease in total emissions within the city.

A simple comparison method, relying on typical efficiency for both EVs and ICE cars, allows translating amounts of electricity charged into an electric vehicle into an equivalent amount of fuel. As outlined on Fig.4, The typical efficiency of an EV, 0.9 \[[3]\], means that 1 kWh of electricity charged translates into 0.9 kWh of useful energy. 0.9 kWh of energy is contained in 0.101 l of motor petrol \[[4]\]. In turn, the 0.2 efficiency of an ICE \[[5]\] car means that a car needs to be fuelled with 0.504 l of petrol to obtain 0.101 l of fuel of useful energy. In the end, **1 kWh of charged electricity in an electric vehicle translates into roughly 0.504 l of motor petrol**.

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/FUSE.jpg" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure 4:</b> Equivalence between energy charged for EVs and fuelled for thermal cars.</span>
</div>

Based on this approximate equivalence ratio for translating the electricity charged to an amount of motor petrol fuelled, it is possible to quantify and compare emissions from both all electrical charges and equivalent ICE cars.
The translation from amount of energy charged to total emissions relies on the following emission factors. Burning one litre of motor petrol equates to the release of 2.3 kgCO₂eq in the atmosphere \[[6]\], while the charge of 1 kWh amounts to releasing 133.54 gCO₂eq in 2021 and 96.61 gCO₂eq in 2022 \[[7]\].

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/emissions_EV_vs_ICE.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure 5:</b> Comparison of emissions from charges of electric vehicles in the dataset to equivalent usage with thermal engine cars.</span>
</div>

Fig. 5 demonstrates that **direct emissions for the usage of electric vehicles** (2.7 tCO₂eq) **is an order of magnitude lower than for an equivalent usage of petrol cars** (31 tCO₂eq).
This confirms that the electrification of transportation is a powerful mechanism for the city of Frederiksberg to quickly reduce its total emissions. This finding is further supported by the decarbonisation of the Danish electric grid. We can indeed see in Fig. 6 that the average carbon intensity of the electricity on the Eastern Danish grid has decreased by 55% since 2018, and is projected to more than halve by 2025 \[[8]\].

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/carbon_intensity_yearly.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure 6:</b> Yearly evolution of the average direct carbon intensity in Eastern Denmark (2018-2022).</span>
</div>

## Accounting for lifecycle emissions

While we’ve just seen that direct emissions from the usage of electric vehicles are much lower than from their thermal counterparts, it is also important to verify that lifecycle emissions are also reduced. Recommending the electrification of transportation if only direct emissions are reduced would lead to an export of emissions. While this would clean the balance sheet of e.g. Frederiksberg, it would not actually constitute a viable global decarbonisation pathway.
The [Climobil tool](https://climobil.connecting-project.lu/?batteryLifetime=240000&batteryCapacity=30&greenhouseGas=65&electricCarRange=250&carbonElectricityMix=300&greenhouseBattery=30&greenhouseWTT=25&greenhouseTTW=150&batteryPenalty=0.9&annualMileage=20000&ICECurb=1551&ECurb=1977&NEDCpenalty=0.39&decarbonization=0) provides typical emission intensities for EVs and ICE cars (as well as precise estimations for specific car models) for both upstream (construction of the engine, glider, battery, tank, maintenance, well-to-tank) and downstream (tank-to-wheel) activities.
Tab. 1 exposes the used intensities to quantify the upstream emissions for both types of vehicles.


<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
    overflow:hidden;padding:10px 5px;word-break:normal;}
    .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
    font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
    .tg .tg-dvpl{border-color:inherit;text-align:right;vertical-align:top}
    </style>
    <table class="tg" style="margin: 16px 0;">
    <thead>
    <tr>
        <th class="tg-dvpl"><span style="font-weight:700;font-style:normal;text-decoration:none;color:#000;background-color:transparent">Category</span></th>
        <th class="tg-dvpl"><span style="font-weight:700;font-style:normal;text-decoration:none;color:#000;background-color:transparent">ICE car (gCO₂eq/km)</span></th>
        <th class="tg-dvpl"><span style="font-weight:700;font-style:normal;text-decoration:none;color:#000;background-color:transparent">EV (gCO₂eq/km)</span></th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td class="tg-dvpl"><span style="font-weight:400;font-style:normal;text-decoration:none;color:#000;background-color:transparent">Glider</span></td>
        <td class="tg-dvpl"><span style="font-weight:400;font-style:normal;text-decoration:none;color:#000;background-color:transparent">21</span></td>
        <td class="tg-dvpl"><span style="font-weight:400;font-style:normal;text-decoration:none;color:#000;background-color:transparent">22</span></td>
    </tr>
    <tr>
        <td class="tg-dvpl"><span style="font-weight:400;font-style:normal;text-decoration:none;color:#000;background-color:transparent">Engine/Motor</span></td>
        <td class="tg-dvpl"><span style="font-weight:400;font-style:normal;text-decoration:none;color:#000;background-color:transparent">2</span></td>
        <td class="tg-dvpl"><span style="font-weight:400;font-style:normal;text-decoration:none;color:#000;background-color:transparent">6</span></td>
    </tr>
    <tr>
        <td class="tg-dvpl"><span style="font-weight:400;font-style:normal;text-decoration:none;color:#000;background-color:transparent">Tank</span></td>
        <td class="tg-dvpl"><span style="font-weight:400;font-style:normal;text-decoration:none;color:#000;background-color:transparent">1</span></td>
        <td class="tg-dvpl"><span style="font-weight:400;font-style:normal;text-decoration:none;color:#000;background-color:transparent">0</span></td>
    </tr>
    <tr>
        <td class="tg-dvpl"><span style="font-weight:400;font-style:normal;text-decoration:none;color:#000;background-color:transparent">Maintenance</span></td>
        <td class="tg-dvpl">6</td>
        <td class="tg-dvpl"><span style="font-weight:400;font-style:normal;text-decoration:none;color:#000;background-color:transparent">6</span></td>
    </tr>
    <tr>
        <td class="tg-dvpl"><span style="font-weight:400;font-style:normal;text-decoration:none;color:#000;background-color:transparent">Battery</span></td>
        <td class="tg-dvpl"><span style="font-weight:400;font-style:normal;text-decoration:none;color:#000;background-color:transparent">0</span></td>
        <td class="tg-dvpl"><span style="font-weight:400;font-style:normal;text-decoration:none;color:#000;background-color:transparent">11.9</span></td>
    </tr>
    <tr>
        <td class="tg-dvpl"><span style="font-weight:400;font-style:normal;text-decoration:none;color:#000;background-color:transparent">Total upstream</span></td>
        <td class="tg-dvpl"><span style="font-weight:700;font-style:normal;text-decoration:none;color:#000;background-color:transparent">30</span></td>
        <td class="tg-dvpl"><span style="font-weight:700;font-style:normal;text-decoration:none;color:#000;background-color:transparent">45.9</span></td>
    </tr>
    </tbody>
    </table>
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Table 1:</b> Decomposition of upstream emissions for both car types.</span>
</div>

Previously, we based our quantification on energy consumption, while the figures exposed in Tab. 1 are expressed in gCO₂eq/km. To assess the total upstream emissions from energy charged, we can apply the following formulation:

> Upstream emissions \[gCO₂eq\] = (upstream emission factor \[gCO₂eq/km\] / consumption \[kWh or l/km\]) * energy consumption \[kWh or l\]

Using that, a typical EV consumes 0.198 kWh/km \[[9]\] and a ICE car 0.08 l/km \[[10]\].

Fig. 7 compares the total emissions for both types of vehicles, including lifecycle emissions (rightmost bars). Even though upstream emissions for EVs are higher (6.13 tCO₂eq vs 5.05 tCO₂eq), total emissions for the electric cars are much lower overall (8.86 tCO₂eq vs 36 tCO₂eq). This confirms that even if a significant portion of the emissions will be exported, the electrification of transportation will result nonetheless in an overall decrease in total global emissions.

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/emissions_EV_vs_ICE_lifecycle.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure 7:</b> Comparison of emissions from charges of electric vehicles in the dataset to equivalent usage with thermal engine cars for both direct and lifecycle emissions.</span>
</div>

## Quantifying EVs emissions

Fig. 8 displays the allocation of charges for each charger during a two-week period in November 2021. Depending on the charger, a variety of charging events can be observed, from regular short term charges, to rarer long charges.
Fig 9 displays the distribution of start and end hours of charging events. The distribution is broad. It is more frequent for charges to start in the morning, and for charges to finish around 14:00 or 15:00, but without a clear pattern.

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/timeline.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure 8:</b> Allocation of charges for each charger (rows) during the first two weeks of November 2011. The height of each charge event (coloured rectangle) is proportional to the amount of electricity charged.</span>
</div>

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/hour_of_the_day.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure 9:</b> Distribution of charges start and end times as hours of the day.
</span>
</div>

Fig. 10 further shows that, intraday, the direct carbon intensity of the electricity on the Danish grid can vary by at least a factor 2. On that day (picked randomly in the time range depicted on Fig. 8), the intensity was around 90 gCO₂eq/kWh during the early hours of the day, before peaking at more than 160 gCO₂eq/kWh at around 16:00. These variations result in a difference between the actual hourly carbon intensity and the yearly average of up to 48 gCO₂eq/kWh, which represents a 30% error.

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/carbon_intensity_day.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure 10:</b> Comparison of the yearly and hourly direct carbon intensity in Eastern Denmark on the 2021-11-13.
</span>
</div>

Overall, it means that the emission from charges, which will occur throughout the day and night, will mostly be inaccurately quantified if computed using an average yearly emission factor.
This methodological consideration is essential to assess the progress towards net-zero. Charges that occur when carbon intensity is the highest will have a much higher impact than those that happened during the dead of the night when carbon intensities are the lowest (for supporting elements, see Appendix).

Fig. 11 displays the difference in computed emissions when using yearly average or hourly carbon intensities. **The total footprint of charges drops from 2.7 to 2.4 tCO₂eq (-11%) by accounting more accurately for emissions**.

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/emissions_yearly_vs_hourly.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure 11:</b> Comparison of total charges emissions using yearly and hourly carbon intensity values.
</span>
</div>

The benefits of doing hourly carbon accounting would therefore be manifold for Frederiksberg. Adopting a more accurate methodology would **strengthen the credibility of their accounting** and **hedge their approach against future evolutions of recommended carbon accounting practices**. It would also **lower the computed footprint from charges**. Finally, as we will see in the next section, it would **enable them to optimise consumption to minimise their carbon footprint**.

## Is it worth doing smart charging?

The adoption of hourly accounting for electric charging offers the possibility of optimisation. Providing incentives to users to charge their EVs when the carbon intensity of the electricity is the lowest would reduce the total emissions of charges. Typically, on the day represented on Fig. 10, that would mean encouraging charging during the early hours of the morning, or late hours of the evening (the Appendix contains supporting elements to show that the middle of night corresponds to the lowest carbon intensity).

To determine the upper bound for the savings potential offered by smart charging, we can proceed as follows. For each charge, we assume that the charge is flexible and can be controlled. We define as constraints that the total amount of energy charged must be matched, and that within an hour, the maximal charging power does not exceed the max power inferred from the data for each station (typically around 15kW). Each charge’s start and end time is preserved.

An optimisation algorithm can then be applied to minimise total emissions from consumption, computed for each hour as the amount of electricity consumed times the carbon intensity. Implementation details for the modelling are provided in Appendix.

Fig. 12 compares the total emissions from the EV charges with and without the adoption of smart charges. The potential benefits of smart charging clearly appear; **the computed emissions drop from 1.49 to 1.25 tCO₂eq, which represents a clear 16% decrease.**

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/emissions_optimised.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure 12: </b> Comparison of total EV emissions from hourly carbon intensities with and without smart charging.
</span>
</div>

Furthermore, the same comparison performed only on charge events that start after 17:00 is provided in Fig. 13. In this case, the potential emission savings are even greater. **The total footprint decreases from 0.37 tCO₂eq to 0.30 tCO₂eq with smart charging, which is a 19% decrease.** Note that in this case, the number of charge events considered has been reduced to only 228, which increases the underlying uncertainty of the estimation.

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/emissions_optimised_after_17.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure 13: </b> Comparison of total EV emissions from hourly carbon intensities with and without smart charging, when only looking at charges that start after 17:00.
</span>
</div>

## Conclusion

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/emissions_all.jpg" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure 14: </b> Comparison of total footprint for all considered scenarii.
</span>
</div>

Throughout this study, the charges dataset has provided a useful frame of reference for quantifying greenhouse gas emissions from transportation within the city of Frederiksberg. As highlighted in Fig. 14, this sample provides clear guidelines to reduce carbon emissions from transportation, a necessary step for the city to achieve its net-zero objective by 2050.

It was first observed that **the electrification of transportation within the city has the potential to slash emissions by a factor of 10**. It was then demonstrated that **accurate methods to account for emissions from electric vehicles are preferable, as they correct an 11% overestimation** of total emissions. Lastly, **this study suggests that access to granular electricity data, such as provided by Electricity Maps, enables further emission savings through smart charging procedures** (16-19% savings). The benefits of smart charging further exceed emission savings, as flexible electricity consumption has otherwise been shown to be an important aspect of distribution level grid stability, and as it lowers EV owners' charging costs (The correlation between day-ahead price and carbon intensity being around 0.7 in 2023 in Eastern Denmark, as detailed in Appendix).

## References

\[1\]: [https://ev-database.org/cheatsheet/useable-battery-capacity-electric-car](https://ev-database.org/cheatsheet/useable-battery-capacity-electric-car)

\[2\]: [https://www.transportation.gov/rural/ev/toolkit/ev-basics/charging-speeds](https://www.transportation.gov/rural/ev/toolkit/ev-basics/charging-speeds)

\[3\]: [https://www.fueleconomy.gov/feg/atv-ev.shtml](https://www.fueleconomy.gov/feg/atv-ev.shtml)

\[4\]: [https://natural-resources.canada.ca/energy-efficiency/transportation-alternative-fuels/personal-vehicles/choosing-right-vehicle/buying-electric-vehicle/understanding-the-tables/21383](https://natural-resources.canada.ca/energy-efficiency/transportation-alternative-fuels/personal-vehicles/choosing-right-vehicle/buying-electric-vehicle/understanding-the-tables/21383)

\[5\]: [https://www.fueleconomy.gov/feg/atv.shtml](https://www.fueleconomy.gov/feg/atv.shtml)

\[6\]: [https://natural-resources.canada.ca/sites/www.nrcan.gc.ca/files/oee/pdf/transportation/fuel-efficient-technologies/autosmart_factsheet_6_e.pdf](https://natural-resources.canada.ca/sites/www.nrcan.gc.ca/files/oee/pdf/transportation/fuel-efficient-technologies/autosmart_factsheet_6_e.pdf)

\[7\]: Electricity Maps, 2023

\[8\]: [https://en.energinet.dk/About-our-news/News/2021/06/22/Danish-electricity-generation-was-greener-than-ever-in-2020/](https://en.energinet.dk/About-our-news/News/2021/06/22/Danish-electricity-generation-was-greener-than-ever-in-2020/)

\[9\]: [https://www.carsguide.com.au/car-advice/what-is-average-fuel-consumption-88469](https://www.carsguide.com.au/car-advice/what-is-average-fuel-consumption-88469)

\[10\]: [https://ev-database.org/cheatsheet/energy-consumption-electric-car](https://ev-database.org/cheatsheet/energy-consumption-electric-car)

## Appendix

### Distribution of electricity consumption per charger

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/Adolph Steens Allé_consumed.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <img src="../../resources/posts/2023-06-20/TEC_consumed.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure A.1:</b> Distribution of energy charged per charger for the two stations. Top represents Adolph Steens Allé, bottom TEC.</span>
</div>

### Average carbon intensity per hour of the day

We claim in the main body that the carbon intensity in Eastern Denmark is generally lowest in the middle of night, and illustrate it with a single day as an example. To make sure that we don’t extrapolate arbitrarily from that single example, we expose here the average carbon intensity per hour of the day, computed over an entire year of data. Fig. A.2 shows that, indeed, the lowest carbon intensity is at night. Taking an entire year of data ensures that we average over different seasons and environmental conditions. The difference between the carbon intensity peaks in the beginning of the day and in the evening and the valley in the middle of night, is significant with a difference of around 35 gCO2eq/kWh, or 20%.

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/avg_carbon_intensity_per_hour.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure A.2:</b> Average carbon intensity per hour of the day in Eastern Denmark in 2022. On top, hourly carbon intensities per day are displayed (red lines), as well as the average per hour (yellow). Bellow, the average carbon intensity per hour is highlighted.</span>
</div>

### Optimisation for smart charging

Each charge event is considered as its own optimisation problem. During event k, we note $$C_k$$ the amount of energy charged. We split the charging time range into $$n$$ different hours. The objective is to allocate the charge between the different hours, such that the amount of energy charged during an hour does not exceed the maximum power output of the charger $$P_{max}$$, whilst minimising the total emissions of the charge.

The problem we are trying to optimise can be expressed in the standard form as:

$$\begin{aligned}\min_{x} & \;\;\;\mathbf{c}^T \mathbf{x} \\\text{s.t.} & \;\;\;\mathbf{A}_{ub}\mathbf{x} \leq \mathbf{b}_{ub}\\& \;\;\;\mathbf{A}_{eq}\mathbf{x} = \mathbf{b}_{eq}\\& 0 \leq x_i \leq P_{\text{max}}, \quad i = 1, \dots, n\end{aligned}$$

With $$C_k$$ the total amount of energy charged for the event k, we have:
* $$\mathbf{x}$$ is the vector of decision variables. Here, $$x_i$$ represents the amount of energy charged at hour $$i$$.
* $$\mathbf{c}$$ is the vector of cost coefficients. Here, $$c_i$$ represents the carbon intensity of the grid at hour $$i$$.
* $$\mathbf{A}_{ub}$$ is the matrix of upper bound constraints and $$\mathbf{b}_{ub}$$ is the vector of upper bound constraints. Here, $$\mathbf{A}_{ub}$$ and $$\mathbf{b}_{ub}$$ are used to express the constraint of not being able to charge more than what was consumed.

$$\begin{aligned}\mathbf{A}_{ub} = \begin{bmatrix}1 & 0 & \dots & 0 \\\vdots & \ddots & \ddots & \vdots \\ \vdots  & & \ddots  & 0 \\1 & \dots & \dots & 1\end{bmatrix}, \quad\mathbf{b}_{ub} = \begin{bmatrix} C_k\\ \vdots \\ C_k \\ \end{bmatrix}\end{aligned}$$

* $$\mathbf{A}_{eq}$$ is the matrix of equality constraints and $$\mathbf{b}_{eq}$$ is the vector of equality constraints. Here, $$\mathbf{A}_{eq}$$ and $$\mathbf{b}_{eq}$$ are used to express the constraint of having a full battery at the end of the optimisation window.

$$\begin{aligned}\mathbf{A}_{eq} = \begin{bmatrix}1 & \dots & 1 \\0 & \dots & 0 \\\vdots & & \vdots \\0 & \dots & 0\end{bmatrix}, \quad\mathbf{b}_{eq} = \begin{bmatrix} C_k \\0 \\\vdots \\0 \\\end{bmatrix}\end{aligned}$$

* $$P_{\text{max}}$$ is the maximal charging power.

This linear optimisation problem can directly be solved by linear solvers, such as HiGHS. In this case, we relied on the [scipy implementation](https://docs.scipy.org/doc/scipy/reference/optimize.linprog-highs.html#optimize-linprog-highs) for solving.

Real-world modelling necessitates accurate carbon intensity forecasts to enable smart charging. In this case, past known carbon intensity values were used, which would amount to having at hand perfect forecasts. The more accurate the information available about the future evolution of the carbon intensity values is, the closer one can get from the upper bound of potential savings computed here.

### Correlation between day-ahead prices and carbon intensity

The following plots provide intuition for the correlation between the day-ahead price and the carbon intensity of the electricity on the grid in Eastern Denmark. The data is sourced from Electricity Maps, which obtains it from ENTSO-E, and in turn, Nordpool, the market operator for day-ahead auctions in Eastern Denmark.

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/price_carbon_intensity_one_week.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure A.3:</b> Evolution of the carbon intensity (green, left axis) and the day-ahead price (red, right axis) in 2023 (until 2023-05-25) for Eastern Denmark.</span>
</div>

<div id="html" markdown="0" style="display: flex; flex-direction: column; align-items: center; margin: 16px 0 32px;">
    <img src="../../resources/posts/2023-06-20/price_carbon_intensity.png" style="width: 100%; overflow: hidden; margin: 16px 0;">
    <span style="color: #666; font-size: 13px; font-style: italic;"><b>Figure A.4:</b> Day-ahead price against carbon intensity for all hours between the 2023-01-01 and the 2023-05-25 in Eastern Denmark.</span>
</div>

Except for early March, and a short period in late May, one can observe that variations of the day-ahead prices match closely variations of the carbon intensity. Fig. A.4 further supports this. A clear trend is visible from the scatter; an increase in carbon intensity in Eastern Denmark will generally also correspond to an increase in the day-ahead price (no causality can nevertheless be inferred from these plots).
