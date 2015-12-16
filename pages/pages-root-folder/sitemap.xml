---
permalink: /sitemap.xml
title: 'Site map for robots'
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
{% comment %}
	See http://www.sitemaps.org/protocol.html for argument meanings and values.
	Gem jekyll-sitemap only lists urls with no control over priority and changefreq, hence using a custom one.
	
	Add your custom collections like this:
		{% include sitemap_collection.xml links=site.projects name="Projects" priority=0.7 changefreq='monthly' %}
{% endcomment %}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{% include sitemap_collection.xml links=site.pages name="Pages" priority=0.3 changefreq='monthly' %}
{% include sitemap_collection.xml links=site.posts name="Posts" priority=0.5 changefreq='monthly' %}
</urlset>
