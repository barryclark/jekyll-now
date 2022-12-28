---
layout: page
title: Members
permalink: /members/
---
<table>
{% for member in site.data.members %}
 <tr>
  <td>
    ![{{member.name}}]({{member.logo}})
  </td>
  <td>
    ### [{{member.name}}]({{member.url}})
    {{member.description}}
  <td>
 </tr>
{% endfor %}
</table>
