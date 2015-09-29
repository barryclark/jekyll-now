---
layout: default
title: Work - American Greetings Intern Hack Day
permalink: /work/ag-hackday/
---
<section class="card">

  <h1>American Greetings Intern Hack Day</h1>

  <p class="readable">Towards the end of my summer at American Greetings, a hack day was held for the interns within the AG Interactive division. Ryan Dewey, Matthew Tsang, and myself teamed up with one main goal: to create something that would benefit the company. We had plenty of ideas including introducing more of a social aspect within the company intranet via Linkedin integration, but it wasn't really a fun idea.</p>

  <p class="readable">American Greetings has at least four lines or brands of greeting cards. Outside of the lounge/break room there was a monitor that displayed different metrics in hard number form for each card brand. We thought it was a great idea but not executed properly. If the idea is to offer information-at-a-glance for people in passing, the data shouldn't look like the fine print of your housing lease. From there we decided to take our own spin at data visualization.</p>

  <p class="readable">D3 (Data Driven Documents) is a JavaScript library used to represent data using DOM manipulation. This was cool but not hackday material. We wanted to do something our intelligent coworkers haven't seen before.</p>

  <figure>
    <img src="/images/d3.jpg" alt="Example D3 templates">
  </figure>

  <p class="caption">Example D3 templates</p>

  <p class="readable">It didn't have to be overly complex. We wanted to create something usable and something useful for the developers.</p>

  <p class="readable">In our research we discovered the WebGL Globe created by the Google Data Arts and found it perfect. There couldn't possibly be a more applicable use of this globe than to display data about card sales per brand throughout the world. The globe can be used to display these tower-like lines of data. The taller the line the higher the magnitude. For example, the justWink brand of cards sees greater sales in the northeast region of the US, California, and the midwest (shown below).</p>

  <figure>
    <img src="/images/jw-hackday.png" alt="justWink E-cards Sent">
  </figure>

  <p class="readable">The data for Jacquie Lawson, AG's highest selling e-card brand can be seen much more clearly due to the high magnitude.</p>

  <figure>
    <img src="/images/jl-hackday.png" alt="Jacquie Lawson E-cards Sent">
  </figure>

  <p class="readable">Ryan was the database intern at AG and had access to the Google Analytics dashboard for all this information. Using Google's Data Export API we wrote a little Java to take the data from Google Analytics and output it in CSV format. From there we wrote a script to convert the CSV format to JSON for the globe to properly interpret the data. Piecing all this together took a lot longer than expected. Our goal was to find a way to automate this process on a daily or maybe even weekly basis but time did not cooperate.</p>

  <p class="readable">Once the hack day was completed the senior devs approached the three of us asking to document every step of the process so that they could pick up where we left off. We were later told that this project is actually being used by American Greetings and that the globe is live in action on that same monitor.</p>

  <p class="readable">Winning felt great, but creating a product that others use and find helpful, as crude as it was, was an even greater feeling.</p>

</section>

<section class="change-case clearfix">
<div id="prev">
  <div class="case-wrapper">
    <div class="prev-wrapper clearfix">
      <a href="/work/motleyfool" title="Previous Project">
        <p>Motley Fool Refer-A-Friend</p>
        <p class="change-case-txt">Previous Project</p>
      </a>
    </div>
  </div>
</div>

  <div id="push"></div>

	<div id="next">
		<div class="case-wrapper">
			<div class="next-wrapper clearfix">
				<a href="/work/spaceshooters" title="Next Project">
					<p>Space Shooters</p>
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
