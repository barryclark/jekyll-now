---
layout: projects
title: Forecaster iOS App
permalink: /projects/forecaster/
---

{::options auto_ids="false" /}

# Forecaster (iOS)

<span class="large-cap">F</span>orecaster is for everyone that wants just enough information about the current weather. No fluff necessary. The competition features bloated apps with loads of extra content and heavy animations that eat away at your battery life. Forecaster is for users who just want a quick glance at the weather anywhere in the world.

<figure>
  <img src="/images/weather_city.jpg" alt="Weather anywhere you want it">
</figure>

The project guidelines were broad. I am a fan of super simple, minimalistic experiences that just work. I perused the default apps on my loaner 5th Gen iPod Touch and the Apple App store and set out to make a simpler, more effective version of one of those apps. Being somewhat familiar with the RESTful API [Dark Sky Forecast](https://developer.forecast.io) I decided to make a simple weather app.

Lots of top rated weather apps apps sport features such as real-time dopplers, video weather feeds, bookmarking locations, animations, etc. To create something simple and functional that also fills a void in my life, I started with this list of features:

* Geolocation
* Use third party api, Dark Sky Forecast
* Variety of display options (current weather, hourly, 5-day, and 10-day)
* Will pull location-based images from the flickr api
* Provide option to enter location vs using geolocation
* Send notification each morning of brief weather summary
* Content and Storytelling
* Unit conversion
* Swiping (other gestures) to reveal different displays

Based on my limited knowledge and time I ended up distilling down that features list:

* Displays useful information from api: precipitation probability, humidity, current temperature, status summary, and weather icon that matches the current conditions
* Primary form of pulling data is via location services. User gets the option to search for weather by zip code. This uses the reverse geocoding aspect of MapKit to get address details from coordinates and vice versa.
* Double tap the screen to convert units between degrees Celsius and Fahrenheit
* Background image automatically refreshes based on time of day (image for dusk, day, and evening/night).
* Icons change to reflect current weather conditions on refresh

<figure>
  <img class="img-third" src="/images/weather_1.png" alt="Weather App Screen 1">
  <img class="img-third" src="/images/weather_2.png" alt="Weather App Screen 2">
  <img class="img-third" src="/images/weather_3.png" alt="Weather App Screen 3">
</figure>
