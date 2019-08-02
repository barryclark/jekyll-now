---
layout: projects
title: Tracker for ArcGIS
permalink: /tracker
---

{::options auto_ids="false" /}

<div class="container__back">
    <a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/></svg> home
    </a>
</div>

<h1 class="tracker">
    Tracker for ArcGIS
    <span class="header-description">Android app</span>
</h1>

<section>
    <p>A simple, battery-efficient location tracking app that gives users the ability to share their current and previous locations while going about their work.</p>
    <p><a target="_blank" href="https://www.justinvelgos.com/">Justin Velgos</a> (iOS), <a target="_blank" href="https://twitter.com/thebluedog">Erich Rainville</a> (Web), and I (Android), along with a team of developers, product engineers, a project manager, and stakeholders worked together to design and develop Tracker.</p>
    <div class="container__adjacent-links">
        <a class="chip read-more" target="_blank" href="https://www.esri.com/arcgis-blog/products/tracker/announcements/tracker-for-arcgis-v19-1-0-released/">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 14.25H3.75V3.75H9V2.25H3.75C2.9175 2.25 2.25 2.925 2.25 3.75V14.25C2.25 15.075 2.9175 15.75 3.75 15.75H14.25C15.075 15.75 15.75 15.075 15.75 14.25V9H14.25V14.25ZM10.5 2.25V3.75H13.1925L5.82 11.1225L6.8775 12.18L14.25 4.8075V7.5H15.75V2.25H10.5Z" fill="#39C3D9"/></svg> Read more about the latest release
        </a>
        <a class="badge" target="_blank" href="https://play.google.com/store/apps/details?id=com.esri.tracker"><img src="/images/google-play-badge.svg" alt="Google Play Badge"></a>
        <a class="badge" target="_blank" href="https://apps.apple.com/us/app/tracker-for-arcgis/id1351373822"><img src="/images/apple-app-store-badge.svg" alt="Apple App Store Badge"></a>
    </div>
    <div class="container__image">
        <a target="_blank" href="https://photos.app.goo.gl/Du3g4C1MnPt6n8zm7"><img src="/images/tracker.png" alt="Tracker Screens"></a>
    </div>
    <div>
        <div class="container__iframe">
            <iframe src="https://www.youtube.com/embed/dZXp0LHO1O8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <p class="caption"><em>Tracker being introduced during the plenary at Esri’s 2018 User Conference in San Diego (mobile app demo begins around 1:32).</em></p>
    </div>
</section>

<section markdown="1">
## Goals
Explorer set a baseline precedent for how our field apps should look and feel. Workforce's usability needs to hit that bar and continue to increase it. We want to improve the information hierarchy so long lists are less daunting and easier to parse. Lastly, we want to spend some time in the field improving our understanding of how people complete their work.
</section>

<section markdown="1">
## Challenges
At face value, Tracker is a simple product that solves a simple problem. Though, as software development goes, nothing is ever as easy as it seems.

* **Battery optimization.** Tracker needs to be able to run in the foreground and background all day with minimal battery impact.
* **Privacy and transparency.** Being tracked is inherently weird and can be somewhat concerning, at least initially. How might we empower the user to feel confident about when Tracker is running, when it's not, and when it will next?
* **Tracker isn't where work happens.** Our users might have other apps or tools for this purpose. How might we design an experience for minimal use?
</section>

***

<section markdown="1">
## Schedule
To optimize our app for minimal use, we created a simple schedule for users to specify when they'd like tracking their location to automatically start and stop.

<div class="container__image">
    <img src="/images/tracker_schedule_1.png" alt="Tracker Schedule">
</div>

Our first iteration of this design is most useful for shift workers, i.e., those that need to be regularly tracked. We'll be paying especially close attention to customer feedback in this area.

This feature helps solve all three challenges mentioned above. First, displaying a map with tracks that are constantly being drawn and a location that's constantly being updated can significantly affect battery consumption. With the schedule automatically turning tracking on and off, the user doesn't have to keep the app in the foreground or ever manually open it.

Second, we utilize notifications when the tracking status changes. When the schedule turns tracking on and off, we display system notifications confirming the change. While tracking, a persistent notification (that can't be dismissed) is shown to let the user know they're currently being tracked. Additionally, even with a schedule set, if the user needs to manually turn tracking on or off, they can at any time from within the app. The app will let the user know the next time tracking will turn on or off.

<div class="container__image">
    <img src="/images/tracker_schedule_2.png" alt="Tracker Schedule">
</div>

Finally, the schedule enables a sort of "set it and forget it" mentality. Sure, users can open the app at any time to see where they've been within the last 72 hours and where they currently are, but they might not. For most scenarios we've heard, they've got more pressing things to do.
</section>

<section markdown="1">
## Track Visualization
How should tracks look when overlaid on the map? Should they be points or lines? What color should they be? How might we account for tracks that overlap? How might we convey directionality, activity (walking, driving, stationary, etc.), and other additional information that we get from a single track point?

These are some of the questions we asked ourselves when thinking about how tracks should be shown in both the mobile and web apps. This posed quite a challenge because ideally, the solution we arrive at should work for all major tracking scenarios: search and rescue, site planning, surveying, damage assessment, and more.

Early on, we discovered that directionality and overlapping tracks are impossible to present in an intelligible and visually appealing way when the tracks are visualized as a series of points or breadcrumbs. It was clear to us that a user's tracks should be displayed as lines.

<div class="container__image">
    <img src="/images/tracker_track_viz_1.png" alt="Early Tracker designs">
    <p class="caption"><em>Early track designs utilizing points over lines and a color ramp to indicate elapsed time.</em></p>
</div>

When thinking about directionality and activity, we looked around for examples in other mapping apps. After a bit of trial and error, we decided to superimpose arrows on the track lines every certain amount of meters/feet—depending on the user's speed and activity. These arrows are only be visible when zoomed in to a point where they'd be easy to discern and not distracting or confusing, in the event of overlapping tracks.

<div class="container__image">
    <img src="/images/tracker_track_viz_2.png" alt="Tracker Schedule">
    <p class="caption"><em>Current track designs utilizing lines over points and directional arrows when zoomed in.</em></p>
</div>

There were a ton of considerations when selecting a color for the tracks. We thought about which color would look best across the light and dark theme basemaps the mobile app supports. The Tracker brand color was a bit too vibrant to use on a map. We referenced popular navigation apps—Google Maps, Apple Maps, and a few others. Blue lines seemed to be associated with directions and navigation, allowing us to harness that existing mental model. We decided to play with opacity and saturation instead of alternate colors to convey activity. On the web side, the tracks of hundreds (and potentially thousands) of users could be shown simultaneously, on the same map. The web app would have to represent the tracks of different users with different colors. We didn't want to give the use of different colors a different meaning on the mobile app side.
</section>

***

<section markdown="1">
## Outcome and Retrospective
We've heard interesting use cases from customers and themes from customers that I can't wait to explore: back office-to-mobile app communication, geofencing, panic/emergencies, indoor tracking, and more.

This is an evolving design with evolving requirements and use cases, and we'll be looking to assess customer feedback where possible.
</section>