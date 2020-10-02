---
layout: page
title: Promote
description: "Request to share your events and offers at Cloud Native London."
---

You are welcome to share relevant events and offers with the Cloud Native London group. They will appear in blog posts and be emailed to the ~5000 group members.

To help cover running costs, we ask for a donation of £200 (no VAT), payable by debit/credit card.

<!-- Load Stripe.js on your website. -->
<script src="https://js.stripe.com/v3"></script>

{% if jekyll.environment == "production" %}
{% include stripe-donate.html %}
{% else %}
{% include stripe-donate-test.html %}
{% endif %}

Once received, we will follow up on your content to share. Here are past examples:

> [**Helm Summit**](https://events.linuxfoundation.org/events/helm-summit-2019/) is taking place in Amsterdam, Netherlands on September 11-12. Use HELM19B20 for a 20% discount off the ticket price.

> ESPC19, Europe’s largest Microsoft Technologies Conference, is taking place in Prague from 2–5 December. [**Azure @ ESPC19**](http://bit.ly/AzureESPC19) is dedicated to all things Azure, including containers, AKS and DevOps.
1. Enter the [online entry competition](http://bit.ly/AzureESPC19Comp) by Wednesday 28th August 2019 to win one of three 3-day tickets.
2. Early Bird Pricing is currently available. Use ESPC19Azure for an additional €200 discount on any [3 or 4 day tickets](http://bit.ly/ESPC19Tickets)
