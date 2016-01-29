---
layout: default
title: Work - Forecaster iOS App - Class Project
permalink: /work/forecaster/
---
<section class="card">

  <h1>Forecaster (iOS)</h1>

  <p class="readable">Forecaster is for everyone that wants just enough information about the current weather. No fluff necessary. The competition features bloated apps with loads of extra content and heavy animations that eat away at your battery life. Forecaster is for users who just want a quick glance at the weather anywhere in the world.</p>

  <figure>
    <img src="/images/weather_city.jpg" alt="Weather anywhere you want it">
  </figure>

  <p class="readable">The project guidelines were broad. I am a fan of super simple, minimalistic experiences that just work. I perused the default apps on my loaner 5th Gen iPod Touch and the Apple App store and set out to make a simpler, more effective version of one of those apps. Being somewhat familiar with the RESTful API <a href="https://developer.forecast.io">Dark Sky Forecast</a> I decided to make a simple weather app.</p>

  <p class="readable">Lots of top rated weather apps apps sport features such as real-time dopplers, video weather feeds, bookmarking locations, animations, etc. To create something simple and functional that also fills a void in my life, I started with this list of features:</p>

  <ul class="readable">
    <li>Geolocation</li>
    <li>Use third party api, Dark Sky Forecast</li>
    <li>Variety of display options (current weather, hourly, 5-day, and 10-day)</li>
    <li>Will pull location-based images from the flickr api</li>
    <li>Provide option to enter location vs using geolocation</li>
    <li>Send notification each morning of brief weather summary</li>
    <li>Content and Storytelling</li>
    <li>Unit conversion</li>
    <li>Swiping (other gestures) to reveal different displays</li>
  </ul>

  <p class="readable">Based on my limited knowledge and time I ended up distilling down that features list:</p>

  <ul class="readable">
    <li>Displays useful information from api: precipitation probability, humidity, current temperature, status summary, and weather icon that matches the current conditions</li>
    <li>Primary form of pulling data is via location services. User gets the option to search for weather by zip code. This uses the reverse geocoding aspect of MapKit to get address details from coordinates and vice versa.</li>
    <li>Double tap the screen to convert units between degrees Celsius and Fahrenheit</li>
    <li>Background image automatically refreshes based on time of day (image for dusk, day, and evening/night).</li>
    <li>Icons change to reflect current weather conditions on refresh</li>
  </ul>

  <figure>
    <img class="img-third" src="/images/weather_1.png" alt="Weather App Screen 1">
    <img class="img-third" src="/images/weather_2.png" alt="Weather App Screen 2">
    <img class="img-third" src="/images/weather_3.png" alt="Weather App Screen 3">
  </figure>

</section>

<section class="change-case clearfix">
<div id="prev">
  <div class="case-wrapper">
    <div class="prev-wrapper clearfix">
      <a href="/work/ag-hackday" title="Previous Project">
        <p>AG Intern Hack Day</p>
        <p class="change-case-txt">Previous Project</p>
      </a>
    </div>
  </div>
</div>

  <div id="push"></div>

	<div id="next">
		<div class="case-wrapper">
			<div class="next-wrapper clearfix">
        <a href="/work/globalthinking">
          <p>GT Site Refresh</p>
					<p class="change-case-txt">Next Project</p>
				</a>
			</div>
		</div>
	</div>
</section>

<div class="to-top-container elevator">
  <div class="to-top-btn">
    <img src="/images/cd-top-arrow.svg" alt="" />
  </div>
</div>
