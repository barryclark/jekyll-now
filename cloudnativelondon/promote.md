---
layout: page
title: Promote
description: "Request to share your events and offers at Cloud Native London."
---

You are welcome to share relevant events and offers with the Cloud Native London group. They will appear in blog posts ([examples](/cloudnativelondon/product-images/promote.png)) and be emailed to the ~5000 group members.

To help cover running costs, we ask for a donation of £200 (no VAT), payable by debit/credit card.

<!-- Load Stripe.js on your website. -->
<script src="https://js.stripe.com/v3"></script>

{% if jekyll.environment == "production" %}
{% include stripe-donate.html %}
{% else %}
{% include stripe-donate-test.html %}
{% endif %}

Once received, we will follow up to confirm your offer.
