---
layout: page
title: Members
permalink: /members/
---
<table>
{% for member in site.data.members %}
 <tr>
  <td width="20%" style="text-align: center;">
   <img src="{{member.logo}}" alt="{{member.name}}">
  </td>
  <td>
    <a href="{{member.url}}">{{member.name}}</a><br>{{member.description}}
  </td>
 </tr>
{% endfor %}
</table>
