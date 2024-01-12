---
layout: default_en
title: How to buy, sell, spend and accept Bitcoin in Greece
---

![](/images/Bitcoin_4_year_cycle.jpeg)

Come to one of our meetups in [Athens](https://www.meetup.com/BlockchainGreece-0/)([+social](https://www.meetup.com/athens-bitcoin-meetup-group/),[+BitDevs](https://bitdevs-athens.com)), Thessaloniki [#1](https://www.meetup.com/BlockchainGreece-1/) [#2](https://www.meetup.com/Greek-Cryptocurrency-community/), [Nicosia](https://www.meetup.com/nicosia-bitcoin/), [Limassol](https://www.meetup.com/bitcoin-meet-up-sponsored-by-portfolium/) or [Paphos](https://www.meetup.com/Paphos-Bitcoin-Cryptocurrency-Meetup). Join our [Discord online chat](https://discord.gg/9J9dQVhG3v).

- [Which companies, stores and professionals accept Bitcoin in Greece?](#merchant-table)
- [How can I buy Bitcoin in Greece?](#buybitcoin)
- [Do Greek and Cypriot banks impose restrictions?](#localbanks)
- [Who regulates cryptocurrency in Greece?](#regulator)
- [What cryptocurrency and blockchain projects are there in Greece and Cyprus?](#projects)

### <a name="merchant-table"></a>Which companies, stores and professionals accept Bitcoin in Greece?

[Map search](https://coinmap.org/#/world/38.81403111/24.63134766/6). New map entries show up [here](https://twitter.com/hashtag/coinmap_gr?f=tweets&vertical=default&src=hash).

![](/images/Coinmap.png)

<table>
{% for company in site.data.data %}
  <tr>
		{% if company.url %}
		<td><a href="{{company.url}}" rel="nofollow">{{company.company_en}}</a></td>
		{% else %}
		<td>{{company.company_en}}</td>
		{% endif %}
		<td>{{company.category_en}}</td>
		<td>{{company.location_en}}</td>
  </tr>
{% endfor %}
</table>

### <a name="buybitcoin"></a>How can I buy Bitcoin in Greece?

- At the 60+ Bitcoin ATMs listed on [Coin ATM Radar](https://coinatmradar.com/country/83/bitcoin-atm-greece/). Most of those Bitcoin ATMs belong to [Bcash Greece](https://bcash.eu/) ([see videos with instructions on how to use their ATMs](https://www.youtube.com/channel/UCo4WSs5gFgp9RgvR2f-1okg/videos)), to [Kurant](https://www.kurant.at/) and to [Bitcoinmat](https://bitcoinmat.sk/).
- At any Bitcoin exchange in the world, via a bank transfer. This method incurs the lowest fees, assuming you send the amount using a SEPA transfer (a Greek bank can charge as low as €1 for a SEPA transfer). Some exchanges that accept SEPA transfers are [Kraken](https://www.kraken.com), [Coinbase](https://www.coinbase.com/) and [BitStamp](https://www.bitstamp.net).
- At a Bitcoin exchange that accepts debit or credit cards.
- From a private Bitcoin trader you can find on [Localbitcoins](https://localbitcoins.com/), at the [BitcoinTalk forum](https://bitcointalk.org/index.php?board=136.0), on [HodlHodl](https://hodlhodl.com), on [Bisq](https://bisq.network) or on [Paxful](https://paxful.com). You can exchange Euros with them using any method you want, e.g. in person, via Paypal, Western Union, Piraeus Bank Instant Cash (Lefta Sto Lepto), bank transfer etc.
- From the [BCash](https://bcash.gr/en/exchange/) Bitcoin exchange via deposit at a Greek bank. They sell up to €1000 of Bitcoin per person per day and charge a 10% fee.

### <a name="localbanks"></a>Do Greek and Cypriot banks impose restrictions?

In Greece, the National Bank of Greece have this statement on their e-banking site saying they apply "enhanced due diligence" on transactions to/from cryptocurrency exchanges and that your transactions may be denied.

![](/images/NBG-Crypto-AML.jpeg)

In Cyprus, all banks deny transactions to/from cryptocurrency exchanges.

Bank of Cyprus in their [Group Customer Acceptance Policy](https://www.bankofcyprus.com/contentassets/a43a89acae0049fab0e35591379bf9e7/group-customer-acceptance-policy.pdf) forbid transactions with cryptocurrency exchanges and also do not accept exchanges as customers.

Hellenic Bank in their [Basic Terms & Conditions of Use of Hellenic Bank Services](https://www.hellenicbank.com/portalserver/content/api/contentstream-id/ba122ca0-b615-4054-878e-cf272e6e3254/8d980d50-1d0f-4e09-aece-c60b7a30b542/Terms/OP%28CD%29123%20EN_12_20.pdf) forbid transactions with cryptocurrency exchanges.

These restrictions exist because banks are afraid of the AML fines they face in case customers launder money via transactions with cryptocurrency exchanges, while examining each of those transactions is costly to the banks.

### <a name="regulator"></a>Who regulates cryptocurrency in Greece?

Cryptocurrency in Greece is currently only regulated from an AML (Anti Money Laundering) point of view, according to law [4557/2018](https://www.taxheaven.gr/law/4557/2018) (the linked law text is fully up-to-date), as modified by law [4734/2020](https://www.taxheaven.gr/law/4734/2020). The latter is known as the [European Union's AMLD5 Directive](https://www.sygna.io/blog/what-is-amld5-anti-money-laundering-directive-five-a-guide/). The regulator is the [Hellenic Capital Markets Commission](http://www.hcmc.gr/el_GR/web/portal/mlaundering1) that maintains a Registry of regulated exchanges (4 of them) and custodians (none).

### <a name="projects"></a>What cryptocurrency and blockchain projects are there in Greece and Cyprus?

- Bitcoin nodes running in [Greece](https://bitnodes.earn.com/nodes/?q=Greece) and [Cyprus](https://bitnodes.earn.com/nodes/?q=Cyprus)
- The [Coinomi multicurrency wallet](https://coinomi.com)
- The [University of Nicosia free Introduction to Digital Currencies MOOC  and the MSc in Digital Currency](https://digitalcurrency.unic.ac.cy)
- [norbloc](https://norbloc.com)
- The [Oceanus Foundation](http://www.oceanus.tech)
- [TaxExperts](https://www.taxexperts.gr) offers cryptocurrency taxation advice
- [stampd](https://stampd.io)
- [BitforTip](https://www.bitfortip.com)
- <strike>CoinLib</strike>
- The [BlockHero](https://blockhero.ai) portfolio tracker
- One of [IOHK](https://iohk.io/team/)'s three research centres is in Athens
- [Bcash Greece](https://bcash.gr) makes Bitcoin ATMs
- [SignedBlock](https://signedblock.com)
- [mytracknet](https://www.mytracknet.com)
- [BLOCK.CO](https://block.co)
- [Retraced](https://retraced.co/) develop their product in Cyprus
- The [Hellenic Blockchain Hub](http://blockchain.org.gr) non-profit organization
- The [Cyprus Blockchain Technologies](http://cybt.eu) non-profit organization

Last update: 2024-01-12

<!-- <div class="posts">
  {% for post in site.posts %}
    <article class="post">

      <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

      <div class="entry">
        {{ post.excerpt }}
      </div>

      <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
    </article>
  {% endfor %}
</div> -->

