---
layout: page
title: Canali di comunicazione
permalink: /canali/
---

<div class="segnala">
<p>Se hai una necessità o vuoi comunicare aggiornamenti, ci sono numerosi modi di contattarci: </p>
         {% if site.author.facebook and site.footer-links-active.facebook %}
          <li>
            <a href="https://www.facebook.com/{{ site.author.facebook }}" title="Facebook">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Gruppo Facebook
            </a><span>da usare per comunicare con noi su Facebook</span>
          </li>
         {% endif %}
         {% if site.author.facebook and site.footer-links-active.androidapp %}
          <li>
            <a href="https://play.google.com/store/apps/details?id=eh.terremotocentroitalia" title="Android App">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-android fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;App Android
            </a><span>consulta i contenuti da app android</span>
          </li>
         {% endif %}
         {% if site.author.github and site.footer-links-active.github %}
          <li>
            <a href="https://github.com/{{ site.author.github }}" title="GitHub">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-github fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Repository GitHub
            </a><span>per collaborare agli sviluppi</span>
          </li>
          {% endif %}
          {% if site.author.twitter and site.footer-links-active.twitter %}
          <li>
            <a href="https://twitter.com/{{ site.author.twitter }}" title="Twitter">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Pagina Twitter
            </a><span>da usare per comunicare con noi su Twitter</span>
          </li>
          {% endif %}
           {% if site.author.instagram and site.footer-links-active.instagram %}
          <li>
            <a href="https://www.instagram.com/{{ site.author.instagram }}" title="Instagram">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-instagram fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Pagina Instagram
            </a><span>per vedere le foto su Instagram</span>
          </li>
          {% endif %}
          {% if site.author.telegram and site.footer-links-active.telegram %}
          <li>
            <a href="{{ site.author.telegram }}" title="telegram">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-paper-plane fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Canale Telegram
            </a><span>per restare aggiornato con le nostre notizie</span>
          </li>
          {% endif %}
          <li>
            <a href="http://telegram.me/terremotocentroitalia_bot" title="Bot Telegram">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-paper-plane fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;BOT Telegram
            </a><span>per inviare segnalazioni con smartphone dal "campo"</span>
          </li>
          {% if site.author.medium and site.footer-links-active.medium %}
          <li>
            <a itemprop="sameAs" href="{{ site.author.medium }}" title="medium">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-medium fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Canale Medium
            </a><span>per leggere le nostre storie</span>
          </li>
          {% endif %}
           {% if site.footer-links-active.rss %}
		  <li>
			<a href="{{ '/feed.xml' | prepend: site.baseurl }}" title="RSS">
			  <span class="fa-stack fa-lg">
				<i class="fa fa-circle fa-stack-2x"></i>
				<i class="fa fa-rss fa-stack-1x fa-inverse"></i>
			  </span>&nbsp;&nbsp;Feed RSS
			</a><span>per rimanere aggiornato sui nostri post</span>
		  </li>
          {% endif %}
           <li>
            <a href="https://www.flickr.com/photos/144881851@N07/" title="Flickr">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-flickr fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Gruppo Flickr
            </a><span>per caricare foto e media</span>
          </li>
              <li>
            <a href="/2016-08-26-usare-waze/" title="Waze">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-car fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Waze
            </a>per informazioni su tutto ciò che riguarda la viabilità
          </li>
                 <li>
            <a itemprop="sameAs" href="mailto:terremotocentroita+rimozione@gmail.com" title="Email">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-envelope fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Email
            </a>per segnalare contenuti da rimuovere o scriverci
          </li>
          <li>
            <a itemprop="sameAs" href="{{ site.author.archiveorg }}" title="archive.org">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-archive fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Archive.org
            </a>archivio dati
          </li>
	         <li>
            <a href="https://telegram.me/joinchat/BgW6eEBsI3rLKsJk9L7FJg" title="Bot Telegram">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-paper-plane fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Gruppo Telegram
            </a><span>per coordinarci internamente</span>
          </li>
          <p>Tutto ciò che ci invii sarà gestito dal nostro team, che potrà provvedere alla pubblicazione delle informazioni sul sito appena possibile. Ricordati che usando i nostri canali accetti automaticamente di sottoscrivere l'<a href="http://terremotocentroitalia.info/legal_segnalazioni/">informativa legale</a> per le informazioni di questo progetto.</p>
</div>
