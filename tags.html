---
layout: page
title: 'Tag Index'
---

{% assign date_format = site.date_format | default: "%B %-d, %Y" %}

{%- capture site_tags -%}
    {%- for tag in site.tags -%}
        {{- tag | first -}}{%- unless forloop.last -%},{%- endunless -%}
    {%- endfor -%}
{%- endcapture -%}
{%- assign tags_list = site_tags | split:',' | sort -%}

{%- for tag in tags_list -%}
    <a href="#{{- tag -}}" class="btn btn-primary tag-btn"><i class="fas fa-tag" aria-hidden="true"></i>&nbsp;{{- tag -}}&nbsp;({{site.tags[tag].size}})</a>
{%- endfor -%}

<div id="full-tags-list">
{%- for tag in tags_list -%}
    <h2 id="{{- tag -}}" class="linked-section">
        <i class="fas fa-tag" aria-hidden="true"></i>
        &nbsp;{{- tag -}}&nbsp;({{site.tags[tag].size}})
    </h2>
    <div class="post-list">
        {%- for post in site.tags[tag] -%}
            <div class="tag-entry">
                <a href="{{ post.url | relative_url }}">{{- post.title -}}</a>
                <div class="entry-date">
                    <time datetime="{{- post.date | date_to_xmlschema -}}">{{- post.date | date: date_format -}}</time>
                </div>
            </div>
        {%- endfor -%}
    </div>
{%- endfor -%}
</div>
