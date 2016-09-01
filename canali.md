---
layout: page
title: Canali di comunicazione
permalink: /canali/
---

<div class="canali">
Ecco i nostri account ufficiali:<br /><br />
 {% if site.author.facebook and site.footer-links-active.facebook %}
          <li>
            <a href="https://www.facebook.com/{{ site.author.facebook }}" title="Facebook">
              <span class="fa-stack fa-lg">
                <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Gruppo Facebook
            </a>
          </li>
          {% endif %}
         {% if site.author.github and site.footer-links-active.github %}
          <li>
            <a href="https://github.com/{{ site.author.github }}" title="GitHub">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-github fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Repository GitHub
            </a>
          </li>
          {% endif %}
          {% if site.author.twitter and site.footer-links-active.twitter %}
          <li>
            <a href="https://twitter.com/{{ site.author.twitter }}" title="Twitter">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Pagina Twitter
            </a>
          </li>
          {% endif %}
           {% if site.author.instagram and site.footer-links-active.instagram %}
          <li>
            <a href="https://www.instagram.com/{{ site.author.instagram }}" title="Instagram">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-instagram fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Pagina Instagram
            </a>
          </li>
          {% endif %}
          {% if site.author.telegram and site.footer-links-active.telegram %}
          <li>
            <a href="{{ site.author.telegram }}" title="telegram">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-paper-plane fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Canale Telegram
            </a>
          </li>
          {% endif %}
          <li>
            <a href="http://telegram.me/terremotocentroitalia_bot" title="Bot Telegram">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-paper-plane fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;BOT Telegram
            </a>
          </li>
          {% if site.author.medium and site.footer-links-active.medium %}
          <li>
            <a itemprop="sameAs" href="{{ site.author.medium }}" title="medium">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-medium fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Canale Medium
            </a>
          </li>
          {% endif %}
           {% if site.footer-links-active.rss %}
		  <li>
			<a href="{{ '/feed.xml' | prepend: site.baseurl }}" title="RSS">
			  <span class="fa-stack fa-lg">
				<i class="fa fa-circle fa-stack-2x"></i>
				<i class="fa fa-rss fa-stack-1x fa-inverse"></i>
			  </span>&nbsp;&nbsp;Feed RSS
			</a>
		  </li>
          {% endif %}
           <li>
            <a href="https://www.flickr.com/photos/144881851@N07/" title="Flickr">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-flickr fa-stack-1x fa-inverse"></i>
              </span>&nbsp;&nbsp;Gruppo Flickr
            </a>
          </li>
</div>
