---
layout: projects
title: American Greetings Intern Hack Day
permalink: /projects/ag-hackday/
---

{::options auto_ids="false" /}

# American Greetings Intern Hack Day

<span class="large-cap">T</span>owards the end of my summer at American Greetings, a hack day was held for the interns within the AG Interactive division. Ryan Dewey, Matthew Tsang, and myself teamed up with one main goal: to create something that would benefit the company. We had plenty of ideas including introducing more of a social aspect within the company intranet via Linkedin integration, but it wasn't really a fun idea.

American Greetings has at least four lines or brands of greeting cards. Outside of the lounge/break room there was a monitor that displayed different metrics in hard number form for each card brand. We thought it was a great idea but not executed properly. If the idea is to offer information-at-a-glance for people in passing, the data shouldn't look like the fine print of your housing lease. From there we decided to take our own spin at data visualization.

D3 (Data Driven Documents) is a JavaScript library used to represent data using DOM manipulation. This was cool but not hackday material. We wanted to do something our intelligent coworkers haven't seen before.

<figure>
  <img src="/images/d3.jpg" alt="Example D3 templates">
</figure>

<p class="caption">Example D3 templates</p>

It didn't have to be overly complex. We wanted to create something usable and something useful for the developers.

In our research we discovered the WebGL Globe created by the Google Data Arts and found it perfect. There couldn't possibly be a more applicable use of this globe than to display data about card sales per brand throughout the world. The globe can be used to display these tower-like lines of data. The taller the line the higher the magnitude. For example, the justWink brand of cards sees greater sales in the northeast region of the US, California, and the midwest (shown below).

<figure>
  <img src="/images/jw-hackday.png" alt="justWink E-cards Sent">
</figure>

The data for Jacquie Lawson, AG's highest selling e-card brand can be seen much more clearly due to the high magnitude.

<figure>
  <img src="/images/jl-hackday.png" alt="Jacquie Lawson E-cards Sent">
</figure>

Ryan was the database intern at AG and had access to the Google Analytics dashboard for all this information. Using Google's Data Export API we wrote a little Java to take the data from Google Analytics and output it in CSV format. From there we wrote a script to convert the CSV format to JSON for the globe to properly interpret the data. Piecing all this together took a lot longer than expected. Our goal was to find a way to automate this process on a daily or maybe even weekly basis but time did not cooperate.

Once the hack day was completed the senior devs approached the three of us asking to document every step of the process so that they could pick up where we left off. We were later told that this project is actually being used by American Greetings and that the globe is live in action on that same monitor.

Winning felt great, but creating a product that others use and find helpful, as crude as it was, was an even greater feeling.
