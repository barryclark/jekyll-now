---
layout: page
title: Canali di comunicazione
permalink: /canali/
---
<div>
Ecco i nostri account ufficiali: <br />
 {% if site.author.facebook and site.footer-links-active.facebook %}
          <li>
            <a itemprop="sameAs" href="https://www.facebook.com/{{ site.author.facebook }}" title="Facebook">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </li>
          {% endif %}
         {% if site.author.github and site.footer-links-active.github %}
          <li>
            <a itemprop="sameAs" href="https://github.com/{{ site.author.github }}" title="GitHub">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-github fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </li>
          {% endif %}
          {% if site.author.twitter and site.footer-links-active.twitter %}
          <li>
            <a itemprop="sameAs" href="https://twitter.com/{{ site.author.twitter }}" title="Twitter">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </li>
          {% endif %}
           {% if site.author.instagram and site.footer-links-active.instagram %}
          <li>
            <a itemprop="sameAs" href="https://www.instagram.com/{{ site.author.instagram }}" title="Instagram">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-instagram fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </li>
          {% endif %}
          {% if site.author.telegram and site.footer-links-active.telegram %}
          <li>
            <a itemprop="sameAs" href="{{ site.author.telegram }}" title="telegram">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-paper-plane fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </li>
          {% endif %}
          {% if site.author.telegram and site.footer-links-active.telegram %}
          <li>
            <a itemprop="sameAs" href="{{ site.author.telegram }}" title="telegram">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-paper-plane fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </li>
          {% endif %}
          {% if site.author.medium and site.footer-links-active.medium %}
          <li>
            <a itemprop="sameAs" href="{{ site.author.medium }}" title="medium">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-medium fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </li>
          {% endif %}
           {% if site.footer-links-active.rss %}
		  <li>
			<a href="{{ '/feed.xml' | prepend: site.baseurl }}" title="RSS">
			  <span class="fa-stack fa-lg">
				<i class="fa fa-circle fa-stack-2x"></i>
				<i class="fa fa-rss fa-stack-1x fa-inverse"></i>
			  </span>
			</a>
		  </li>
          {% endif %}
</div>


