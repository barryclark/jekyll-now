---
layout: null
title: "RSS Feed"
permalink: /feed.xml
---
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="{{ site.url }}{{ site.baseurl }}/assets/xslt/rss.xslt" ?>
<?xml-stylesheet type="text/css" href="{{ site.url }}{{ site.baseurl }}/assets/css/rss.css" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>{{ site.title | xml_escape }}</title>
		<description>{{ site.description | xml_escape }}</description>
		<link>{{ site.url }}{{ site.baseurl }}/</link>
		<atom:link href="{{ site.url }}{{ site.baseurl }}{{ page.url }}" rel="self" type="application/rss+xml" />
		{% for post in site.posts limit:10 %}
			<item>
				<title>{{ post.title | xml_escape }}</title>
				<link>{{ site.url }}{{ site.baseurl }}{{ post.url }}</link>
				<pubDate>{{ post.date | date: "%a, %d %b %Y %H:%M:%S %z" }}</pubDate>
				<description>{{ post.content | xml_escape }}</description>
				<guid isPermaLink="true">{{ site.url }}{{ site.baseurl }}{{ post.url }}</guid>
			</item>
		{% endfor %}
	</channel>
</rss>
