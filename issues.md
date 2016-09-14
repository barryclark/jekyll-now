---
layout: page
title: Issues
permalink: /issues/
---

{% for member in site.data.issuesjson %}
<div class="row">
<div class="col-md-4">{{member.title}}</div>
<div class="col-md-4">{{member.labels}}</div>
<div class="col-md-4">{{member.data}}</div>
</div>
{% endfor %}

