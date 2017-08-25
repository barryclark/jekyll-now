---
layout: page
title: Segnala
permalink: /aiuto/
---

<div class="segnala">
<p>Se hai una necessità o vuoi comunicare aggiornamenti, ci sono numerosi modi di contattarci: </p>
        <li>
          <a href="https://terremotocentroitalia.herokuapp.com/segnalazioni/" title="Form di segnalazione">
            <span class="fa-stack fa-lg">
              <i class="fa fa-circle fa-stack-2x"></i>
              <i class="fa fa-external-link fa-stack-1x fa-inverse"></i>
            </span>&nbsp;&nbsp;Form
          </a>per inviare una segnalazione da monitorare ai nostri sistemi.
        </li>
        {% if site.author.facebook and site.footer-links-active.facebook %}
          <li>
            <a href="https://www.facebook.com/{{ site.author.facebook }}" title="Facebook">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Facebook
            </a>da usare per informazioni generiche
          </li>
          {% endif %}
          <li>
            <a href="http://telegram.me/terremotocentroitalia_bot" title="Bot Telegram">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-paper-plane fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;BOT Telegram
            </a>per segnalazioni da smartphone
          </li>
           <li>
            <a href="/2016-08-26-usare-waze/" title="Waze">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-car fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Waze
            </a>per tutto ciò che riguarda la viabilità
          </li>
           <li>
            <a href="https://www.flickr.com/groups/3003557@N20/" title="Flickr">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-flickr fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Gruppo Flickr
            </a>per caricare foto e media
          </li>
          <li>
            <a itemprop="sameAs" href="mailto:terremotocentroita+rimozione@gmail.com" title="Email">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-envelope fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Email
            </a>per segnalare contenuti da rimuovere
          </li>

<p>Tutto ciò che ci mandi sarà gestito dal nostro team, che provvederà alla pubblicazione sul sito appena possibile. Ricordati che usando i nostri canali accetti auomaticamente di sottoscrivere l'<a href="http://terremotocentroitalia.info/legal_segnalazioni/">informativa legale</a> per segnalare informazioni a questo progetto.</p>

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
