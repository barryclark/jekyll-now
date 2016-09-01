---
layout: page
title: Segnala
permalink: /aiuto/
---
<div class="segnala">
Se hai una necessità o vuoi comunicare aggiornamenti, ci sono numerosi modi di contattarci: <br /> <br />
 {% if site.author.facebook and site.footer-links-active.facebook %}
          <li>
            <a href="https://www.facebook.com/{{ site.author.facebook }}" title="Facebook">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Facebook
            </a> <br /> Da usare per informazioni generiche
          </li>
          {% endif %}
          <li>
            <a href="http://telegram.me/terremotocentroitalia_bot" title="Bot Telegram">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-paper-plane fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;BOT Telegram
            </a>Per segnalazioni da smartphone
          </li>
           <li>
            <a href="/2016-08-26-usare-waze/" title="Waze">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-car fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Waze, per tutto ciò che riguarda la viabilità
            </a>
          </li>
           <li>
            <a href="https://www.flickr.com/groups/3003557@N20/" title="Flickr">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-flickr fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Gruppo Flickr, per caricare foto e media
            </a>
          </li>
          <li>
            <a itemprop="sameAs" href="mailto:terremotocentroita+rimozione@gmail.com" title="Email">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-envelope fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Email per segnalare contenuti da rimuovere
            </a>
          </li><br /> <br />
          
Tutto ciò che ci mandi sarà gestito dal nostro team, che provvederà alla pubblicazione sul sito appena possibile.

</div>
<div class="posts">
  {% for post in site.posts %}
    {% if post.categories contains 'aiuto' %}
      <article class="post">
        <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Leggi Tutto</a>
      </article>
    {% endif %}
  {% endfor %}
</div>
