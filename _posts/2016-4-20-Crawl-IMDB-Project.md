---
layout: post
title: Crawl IMDB Most Popular Titles Over the Years
---

I am learning scraping content on the web. There are a few open source web scraping tools like Scapy, Selenium, BeautifulSoap, Google Web Scraper etc. A guide to [web scraping tools](http://www.garethjames.net/a-guide-to-web-scrapping-tools/) gave nice comparasion between Web Scrapers. I am learning Python therefore I choose to use Scrapy, 100% written in Python and has a lot of built-in functionality.

#### Installation

I followed Scrapy Developer Document - [Installation Guide](http://doc.scrapy.org/en/master/intro/install.html) for Installing Scrapy. Checked for Prerequisties, installed Scrapy by run this: <<pip install scrapy >>.

Once installed, [this tutorial](http://doc.scrapy.org/en/master/intro/tutorial.html) to get myself familiar with Scrapy Framework. I got my first Scrapy project working by following the tutorial. So far so good, I was ready to scrape more interesting content from the web. I had several project ideas in mind . Trying not to against the terms of use of some web sites, I narrowed it down to a few. Finally I decided to do something interesting and I like very much which was scraping popular titles from IMDB over the Years (start from 1874).

#### Create IMDB Project

Run this command line to create scrapy project.

```sh
scrapy startproject ImdbProject
```

**Item Class:** Open *items.py* within *ImdbProject* directory. Edit this file by defining item for your scraped items. 

  ```sh
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
  ```
  
**Spider**:  *Spider* is a class that you define how Scrapy scrape and parse information from a domain
These attributes must be defined in *Spider*:

  - *name*: The *Spider* identifier. Must be unique
  - *start_urls*: A list of URLs where *Scrapy* starts crawling data from. The first page of scraping must be included in this list.
  - *parse()*: This method will be called with downloaded |respond| object of each item in *start_urls*
  
This is the code of this project. 

  ```sh
  from scrapy.spiders import CrawlSpider, Rule
  from ImdbProject.items import ImdbprojectItem
  from scrapy.selector import Selector
  from scrapy.linkextractors import LinkExtractor
  from lxml import html

  class ImdbSpider(CrawlSpider):
    name = "ImdbAllMovies"
    allowed_domains = ["imdb.com"]
  
    start_urls = ["http://www.imdb.com/search/title?year=%d,%d&title_type=feature&sort=moviemeter,asc" %(n,n) for n in  
    range(1874, 2027)]
  
    rules = Rule(LinkExtractor(allow=(), 
    restrict_xpaths=('//div[@id="right"]/span[@class="pagination"]/a')),callback='parse_items',follow=True),
  
  def parse_items(self, response):
    hxs = Selector(response)
    items = []
    item = ImdbprojectItem()
    results = hxs.select('//td[@class="title"]')
  
    for result in results:
      item['title'] = result.select('a/text()').extract()
      item['year'] = result.select('span[@class="year_type"]/text()').extract()
      user_rating_value = result.select('div[@class="user_rating"]/div[@class="rating 
      rating-list"]/span[@class="rating-rating"]/span[@class="value"]/text()').extract()
      item['user_rating'] = user_rating_value
      credit = result.select('span[@class="credit"]').xpath('a[contains(@href,"name")]/text()').extract()
      item['credit'] = credit
      item['outline'] = result.select('span[@class="outline"]/text()').extract()
      yield item
  ```







