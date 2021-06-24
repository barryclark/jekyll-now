# Austin Bluetooth Travel Time Mapping

## Outputs

This script creates a table (2019-2021 PMs v2.csv) of performance measures for the average weekday (Tuesday, Wednesday, Thursday) PM peak hour (4:30 to 5:30) for Austin's bluetooth segments for three years: 2019, 2020, and 2021. 

***

## Performance Measures Definitions

### Congestion

The Federal Highway Administration defines congestion as peak hour speeds being lower than 60% of free-flow speed. Free-flow speed is determined as the average speed that occurs at midnight to 3AM.

### Reliability

The reliability is calculated using Buffer Time Index (BTI) which is based on the difference between the 95th percentile travel time and the average travel time. A larger BTI means a larger variation in travel times and less reliability. BTI >= 1.5 is unreliable, 1.25 to 1.5 is moderately reliable, and < 1.25 is considered reliable. 

***

## Required Downloads

[Individual traffic matches.](https://data.austintexas.gov/Transportation-and-Mobility/Bluetooth-Travel-Sensors-Individual-Traffic-Match-/x44q-icha)

***

## Visualization

[The interactive map is available here.](http://modalshift.co/maps/bluetooth_map.html) This was created with Mapbox GL JS and the geoJSON and html is located in the [maps folder](https://github.com/Charlie-Henry/ModalShift/blob/master/maps/bluetooth_map.html)
