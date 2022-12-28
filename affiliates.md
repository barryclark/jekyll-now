---
layout: page
title: Affiliates
permalink: /affiliates/
---
<table>
{% for affiliate in site.data.affiliates %}
 <tr>
  <td width="20%" style="text-align: center;">
   <img src="{{affiliate.logo}}" alt="{{affiliate.name}}">
  </td>
  <td>
    <a href="{{affiliate.url}}">{{affiliate.name}}</a><br>{{affiliate.description}}
  </td>
 </tr>
{% endfor %}
</table>
