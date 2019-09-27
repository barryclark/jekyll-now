---
layout: page
title: Promote
description: "Request to share your events and offers at Cloud Native London."
---

You are welcome to share relevant events and offers with the Cloud Native London group. They will appear in blog posts ([examples](http://localhost:4000/cloudnativelondon/product-images/promote.png)) and be emailed to the ~4000 group members.

To help cover running costs, we ask for a donation of £100.

{% if jekyll.environment == "production" %}
{% include stripe-donate.html %}
{% else %}
{% include stripe-donate-test.html %}
{% endif %}

Once received, we will follow up to confirm.
