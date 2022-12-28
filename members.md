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
    <a href="{{member.url}}">{{member.name}}</a><br>{{member.description}}{% if member.discord %}<br><a title="Discord" href="{{ member.discord }}"><i class="discord-icon discord"></i></a>{% endif %}
  </td>
 </tr>
{% endfor %}
</table>
