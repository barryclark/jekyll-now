---
layout: page
title: Members
permalink: /members/
---
The GWN currently consists of {{site.data.members.size}} member wikis. You can find out more about our members below. If you have a wiki that is interested in joining, please [get in touch]({{site.baseurl}}/join)!

<table>
{% for member in site.data.members %}
 <tr>
  <td width="20%" style="text-align: center;">
   <img src="{{member.logo}}" alt="{{member.name}}">
  </td>
  <td>
    <a href="{{member.url}}">{{member.name}}</a>{% if member.age %} ({{member.age}}) {% endif%}<br>{{member.description}}
    {% if member.bluesky or member.discord or member.tumblr or member.twitter or member.instagram or member.facebook %}
        <br>
    {% endif %}
    
    {% if member.bluesky %} 
        <a title="Bluesky" href="https://bsky.app/profile/{{ member.bluesky }}"><i class="discord-icon bluesky"></i></a>
    {% endif %}
    
    {% if member.discord %} 
        <a title="Discord" href="https://discord.com/invite/{{ member.discord }}"><i class="discord-icon discord"></i></a>
    {% endif %}
    
    {% if member.facebook %} 
        <a title="Facebook" href="https://facebook.com/{{ member.facebook }}"><i class="discord-icon facebook"></i></a>
    {% endif %}
    
    {% if member.instagram %} 
        <a title="Instagram" href="https://instagram.com/{{ member.instagram }}"><i class="discord-icon instagram"></i></a>
    {% endif %}
    
    {% if member.tumblr %} 
        <a title="Tumblr" href="https://{{ member.tumblr }}.tumblr.com"><i class="discord-icon tumblr"></i></a>
    {% endif %}
    
    {% if member.twitter %} 
        <a title="X (formerly Twitter)" href="https://x.com/{{ member.twitter }}"><i class="discord-icon twitter"></i></a>
    {% endif %}
  </td>
 </tr>
{% endfor %}
</table>
