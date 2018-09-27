---
layout: projects
title: Klask Standings
permalink: /klask
---

{::options auto_ids="false" /}

<div class="container__back">
    <a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/></svg> home
    </a>
</div>

<h1 class="klask">
    Klask Standings
    <span class="header-description">Progressive web app</span>
</h1>

<section>
    <p>Klask is a table-top game akin to air hockey that we play in the office at Esri. The goal is simple: hit the ball in the opponent’s goal using a piece on the table controlled by magnets under the table.</p>
</section>

<div class="container__image">
    <img src="/images/klask_tabletop.jpg" alt="Klask Tabletop">
</div>

<section>
    <p>We play a lot of Klask in the office and had no way to keep track of our wins and losses. We needed the ability to report games and keep track of player statistics over time. Justin Velgos and Joel Whitney designed and developed an iOS app. This was a great start, but not particularly convenient for everyone. A (very small) number of us are Android users. Additionally, it can be faster to report a game on your computer, which is nearby since we're at work. Aaron Pulver and I wanted to experiment with Progressive Web Apps for fun.</p>
</section>

<section>
    <h2>The solution</h2>
    <p>We built a PWA using EmberJS, Ember Paper (Material Design  components via Ember), and Firebase to host the app and store data. Our web developers use EmberJS, so this was a good opportunity to understand their development environment.</p>
    <ul>
        <span>Aaron and I tackled the basic functionality and UI first</span>
        <li>sign in</li>
        <li>leaderboard standings (home screen after signing in)</li>
        <li>submitting/reporting the outcome of a game</li>
    </ul>
</section>

<div class="container__image">
    <a target="_blank" href="https://photos.app.goo.gl/Du5JDBxHSNdb3GkB8"><img src="/images/klask1.png" alt="Klask Screens, Round 1"></a>
</div>

<section>
    <ul>
        <span>At this point we were happy because we achieved our MVP. We were having fun building something unrelated to work, so we kept going and worked on</span>
        <li>viewing a user's profile</li>
        <li>removing a game</li>
        <li>viewing different statistics on the standings screen</li>
        <li>viewing a game's timestamp</li>
    </ul>
</section>

<div class="container__image">
    <a target="_blank" href="https://photos.app.goo.gl/Du5JDBxHSNdb3GkB8"><img src="/images/klask2.png" alt="Klask Screens, Round 2"></a>
</div>

Aaron wired up the more complex, data-related functionality: keeping track of games, storing user info, calculating standings. I was responsible for design and implementing most of the front end.

The game board and packaging use a font that looks handwritten.. by a child. It's silly and indicative of the game's younger target audience. (Oddly enough, this Danish game is very popular in pubs.) Justin and I wanted to keep that same fun, lighthearted experience when using the app. We achieved this by using a silly font we'd never get to use at work and a vibrant color palette.

There’s still a lot more to do!

<a class="chip read-more" target="_blank" href="https://github.com/apulverizer/klask-app">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 14.25H3.75V3.75H9V2.25H3.75C2.9175 2.25 2.25 2.925 2.25 3.75V14.25C2.25 15.075 2.9175 15.75 3.75 15.75H14.25C15.075 15.75 15.75 15.075 15.75 14.25V9H14.25V14.25ZM10.5 2.25V3.75H13.1925L5.82 11.1225L6.8775 12.18L14.25 4.8075V7.5H15.75V2.25H10.5Z" fill="#A575D7"/></svg> Check out the repo
</a>