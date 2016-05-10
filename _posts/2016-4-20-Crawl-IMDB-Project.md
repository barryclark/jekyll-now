---
layout: post
title: Crawl IMDB Most Popular Titles Over the Years
---

I am learning scraping content on the web. There are a few open source web scraping tools like Scapy, Selenium, BeautifulSoap, Google Web Scraper etc. A guide to [web scraping tools](http://www.garethjames.net/a-guide-to-web-scrapping-tools/) gave nice comparasion between Web Scrapers. I am learning Python therefore I choose to use Scrapy, 100% written in Python and has a lot of built-in functionality.

#### Installation

I followed Scrapy Developer Document - [Installation Guide](http://doc.scrapy.org/en/master/intro/install.html) for Installing Scrapy. Checked for Prerequisties, installed Scrapy by run this: <<pip install scrapy >>.

Once installed, [this tutorial](http://doc.scrapy.org/en/master/intro/tutorial.html) to get myself familiar with Scrapy Framework. I got my first Scrapy project working by following the tutorial. So far so good, I was ready to scrape more interesting content from the web. I had several project ideas in mind . Trying not to against the terms of use of some web sites, I narrowed it down to a few. Finally I decided to do something interesting and I like very much which was scraping popular titles from IMDB over the Years (start from 1874).

#### Create IMDB Project

<ol>
<li>Run this command line to create scrapy project.</li>
  ---
    scrapy startproject ImdbProject
  ---

<li>Open items.py within ImdbProject directory. Edit this file by defining item for your scraped items. 
</li>
  ---
    class ImdbprojectItem(scrapy.Item):
      picture_title = scrapy.Field()
      genre = scrapy.Field()
      TotalNumByGenre = scrapy.Field()
      title = scrapy.Field()
      year = scrapy.Field()
      user_rating = scrapy.Field()
      outline = scrapy.Field()
      credit = scrapy.Field()
      title_image= scrapy.Field()
      pass
  ---
  
 <li>The Spider 
 
 </li>
</ol>






