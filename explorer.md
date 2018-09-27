---
layout: projects
title: Explorer for ArcGIS
permalink: /explorer
---

{::options auto_ids="false" /}

<div class="container__back">
    <a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/></svg> home
    </a>
</div>

<h1 class="explorer">
    Explorer for ArcGIS
    <span class="header-description">Android app</span>
</h1>

<section>
    <p>Explorer is a native app for Android and iOS. It's the modern digital version of a map book by making your maps interactive, searchable, and available for offline use.</p>
    <p><a target="_blank" href="https://www.justinvelgos.com/">Justin Velgos</a> (iOS) (iOS) and I (Android) worked with a team of developers, product engineers, managers, and stakeholders to redesign and develop Explorer.</p>
</section>

<section>
    <h2>Goals</h2>
    <p>The goals of the redesign were to add highly requested functionality (offline maps, sharing markup, etc) and improve the visual design and usability of the app.</p>
</section>

<section>
    <h2>Challenges</h2>
    <p>This was my first project at Esri. Getting up to speed with our enormous platform, ArcGIS, was daunting. Understanding the way things worked on a technical level took a long time.</p>
    <p>Second, time. Because the iOS version of the app was already a year of development ahead of Android, we had a compressed timeline to ship. I struggled to fit divergent thinking into my process for each feature or design issue.</p>
</section>

## Process
Each design issue started with discovery and definition: identifying the problem we’re trying to solve, the significance of the feature, who it’s for, the scenario/context in which the user would run into the problem, how we know we’ve solved the problem, and more. I spent a majority of my time working with stakeholders and product engineers to answer these questions. Then I jumped into Sketch to tackle the UI. (I understand the benefits of working at low fidelity, but for several reasons, I actually iterate faster at a higher fidelity.) When the interactions needed refining or further explanation, I created prototypes in Principle or After Effects.

***

<section>
    <div class="container__iframe">
        <iframe src="https://www.youtube.com/embed/3mwbnYaVX4c?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
    <p class="caption"><em>See how <a target="_blank" href="https://www.jdirving.com/">J.D. Irving</a> uses Explorer, along with a few other Esri products to enhance their work. This demo was given during the plenary at Esri’s 2018 User Conference in San Diego. (Explorer makes its appearance around 5:35.)</em></p>
</section>

<section>
    <h2>Offline</h2>
    <p>Imagine you’re a forester whose job it is to classify species and assess forest health. Assessing and maintaining the health of a forest requires you to have a lot of information at your disposal. The information needs to be easy to access, up-to-date, and always available. Being a forester, it’s natural to be in areas of low or no connectivity. Thanks to mobile map packages, Explorer allows you to take all the information you need offline so that you can continue to work with confidence.</p>
</section>

<div class="container__image">
    <a target="_blank" href="https://photos.app.goo.gl/ycuNKoXiWF5C2SxR7"><img src="/images/explorer_offline.png" alt="Explorer Offline Screens"></a>
</div>

<section>
    <h2>Searching for features and viewing details</h2>
    <p>It’s not uncommon for some maps to contain thousands of features in a concentrated area. We see often see this with municipal and utility users. Let’s say you’ve got a bunch of hydrants you regularly maintain. In this case, you need to find a particular one and you don’t remember where it is, but you do have some sort of identifier (i.e., an asset ID). You can enter that asset ID into the search field, see where it is, and get all the details about it (attributes, imagery, attachments, and related records).</p>
</section>

<div class="container__image">
    <a target="_blank" href="https://photos.app.goo.gl/ycuNKoXiWF5C2SxR7"><img src="/images/explorer_search.png" alt="Explorer Search Screens"></a>
</div>

<section>
    <h2>Find assets in the field with Compass mode</h2>
    <p>Sometimes assets out in the field are hard to locate either because they’re physically blocked, or it’s just hard to orient yourself (looking at you, NYC). Compass mode solves those problems by drawing a straight line from your location to the selected asset. The map moves with you while providing your current bearing and distance to the asset.</p>
</section>

<div class="container__image">
    <a target="_blank" href="https://photos.app.goo.gl/ycuNKoXiWF5C2SxR7"><img src="/images/explorer_compass.png" alt="Explorer Compass Screens"></a>
</div>

<section>
    <h2>Make and communicate notes with Markup</h2>
    <p>While working, you need to make a note of an area that needs re-inspection. You can mark up the target area by sketching, placing markers, adding arrows, notes, and labels. Then, share the markup with whoever needs to see the note in a variety of ways.</p>
</section>

<div class="container__image m32">
    <a target="_blank" href="https://photos.app.goo.gl/ycuNKoXiWF5C2SxR7"><img src="/images/explorer_markup.png" alt="Explorer Markup Screens"></a>
</div>

***

## Outcome and retrospective
Most of what I was working on was already implemented or designed for iOS. Arriving at the best solution while trying to keep Android consistent with iOS was surprisingly difficult.

Towards the latter half of our development effort, I started working on Workforce and a few other R&D projects. The constant deadlines, multiple projects, and learning to work with different team dynamics have helped me grow and improve at this craft.

Explorer 18.1 for Android shipped May 10th, 2018. We have a lot of work to do to improve Explorer Android, but I’m proud of the work we’ve done, and continue to do.


<div class="container__adjacent-links">
    <a class="chip read-more" target="_blank" href="https://www.esri.com/arcgis-blog/products/explorer/field-mobility/whats-new-in-explorer-for-arcgis-may-2018/">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 14.25H3.75V3.75H9V2.25H3.75C2.9175 2.25 2.25 2.925 2.25 3.75V14.25C2.25 15.075 2.9175 15.75 3.75 15.75H14.25C15.075 15.75 15.75 15.075 15.75 14.25V9H14.25V14.25ZM10.5 2.25V3.75H13.1925L5.82 11.1225L6.8775 12.18L14.25 4.8075V7.5H15.75V2.25H10.5Z" fill="#85CA85"/></svg> Read more about the latest release
    </a>
    <a class="badge" target="_blank" href="https://play.google.com/store/apps/details?id=com.esri.explorer"><img src="/images/google-play-badge.svg" alt="Google Play Badge"></a>
    <a class="badge" target="_blank" href="https://itunes.apple.com/us/app/explorer-for-arcgis/id860708788"><img src="/images/apple-app-store-badge.svg" alt="Apple App Store Badge"></a>
</div>