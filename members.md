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
    <a href="{{member.url}}">{{member.name}}</a><br>{{member.description}}{% if member.discord or member.twitter %}<br>{% endif %}{% if member.discord %} <a title="Discord" href="{{ member.discord }}"><i class="discord-icon discord"></i></a>{% endif %}{% if member.twitter %} <a title="Twitter" href="https://twitter.com/{{ member.twitter }}"><i class="discord-icon twitter"></i></a>{% endif %}
  </td>
 </tr>
{% endfor %}
</table>
