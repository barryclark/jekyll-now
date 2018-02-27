---
layout: default_en
title: How to buy, sell, spend and accept Bitcoin in Greece
---

Come to one of our meetups in [Athens](https://www.meetup.com/BlockchainGreece-0/) or [Thessaloniki](https://www.meetup.com/BlockchainGreece-1/). Join our [Slack](https://bitcoingreece.herokuapp.com) (online chat).

- [Which companies, stores and professionals accept Bitcoin in Greece?](#merchant-table)
- [How can I buy Bitcoin in Greece?](#buybitcoin)
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

- At the Bitcoin ATM (only Euro -> Bitcoin) at the Orizontes bookshop, Thiveou Ioannou 20, Aharnes 13671, Attica at the outskits of Athens. They charge 7% over the [Kraken](https://www.kraken.com) exchange rate.
- At the [BCash](https://bcash.gr/) Bitcoin ATM (buy & sell) at Dimitrakopoulou 84, Athens, near the Syggrou-Fix Metro station. There is an ATM at Kalokairinou 64 at Heraklion, Crete that sells Bitcoin. You can also buy Bitcoin with a voucher at the Aegean gas station at Thivon avenue & Krinis Str, Athens 18233. At the [Bitcoin ATM at Anageniseos 7, Thessaloniki](http://thesscash.gr/en/). Watch this [video](https://www.youtube.com/watch?v=WsVAE-4xP9A) on how to buy Bitcoin from the BCash ATM. They charge 7% over the [Kraken](https://www.kraken.com) exchange rate.
- At the Bitcoin ATM run by [GroupBTC Greece](https://www.groupbtc.com/el) at Kosta Varnali 2-4, Ermeion 3 shopping centre, Dourou Square, Halandri 15233. It is located next to the Grigoris Mikrogevmata shop.  Charges a fee of 7% over [BitcoinAverage](https://bitcoinaverage.com) for Euro -> Bitcoin and 4% for Bitcoin -> Euro.
- At any Bitcoin exchange in the world, via a bank transfer. Due to the capital controls in Greece, as of November 2017 you can wire up to €1000 abroad per month with no prior approval or paperwork. This method incurs the lowest fees, assuming you send the amount using a SEPA transfer (a Greek bank can charge as low as €1 for a SEPA transfer). Some exchanges that accept SEPA transfers are [Kraken](https://www.kraken.com), [Coinbase](https://www.coinbase.com/) and [BitStamp](https://www.bitstamp.net).
- At a Bitcoin exchange that accepts debit or credit cards. <strike>An exchange that accepts Greek cards is Coinbase and charges 3.99%. Coinbase only accepts cards enabled for 3D Secure that allows secure online transactions. For Visa cards this mechanism is known as Verified by Visa and for MasterCard cards this is known as MasterCard SecureCode. Debit cards by Eurobank and Alpha Bank were successfully used on Coinbase recently (in 2017). Piraeus Bank no longer supports 3D Secure for their cards.</strike>
- <strike>At the [BTCGreece](https://www.btcgreece.com) exchange that accepts transfers at their Greek bank accounts.</strike>
- From a private Bitcoin trader you can find on [Localbitcoins](https://localbitcoins.com/) or at the[BitcoinTalk forum](https://bitcointalk.org/index.php?board=136.0). You can exchange Euros with them using any method you want, e.g. in person, via Paypal, Western Union, Piraeus Bank Instant Cash (Lefta Sto Lepto), bank transfer etc.
- From the [BCash](https://bcash.gr/) Bitcoin exchange via deposit at a Greek bank. They sell up to €5000 of Bitcoin per person per day and charge a 9% fee.
- <strike>From the Chip-Chap Bitcoin exchange that accepts cash at the EasyPay Piraeus Bank machines or via a deposit at their Piraeus Bank account. They charge 5% over the Kraken exchange rate at the time of purchase, that can be a few hours after your deposit. Here are some sample instructions:</strike>

	Use use the Chip-Chap Android app or we visit [https://web.chip-chap.com](https://web.chip-chap.com/) and select EasyPay. At this time the iOS app does not support EasyPay. Alternatively we can access the same service via [https://trade.holytransaction.com](https://trade.holytransaction.com).

	![](/images/Page 1.png)

	We enter our Bitcoin address that we want to receive the Bitcoin at. We should have generated this address in our existing Bitcoin wallet already (for a list of wallets consult [https://bitcoin.org/en/choose-your-wallet](https://bitcoin.org/en/choose-your-wallet)). On Chip-Chap we create an account with an email and password. Chip-Chap will use this address to email us a receipt and the reference code we must use in our bank deposit. Chip-Chap asks us to select a deposit amount between €10 and €500.

	![](/images/Page 2.png)

	At the next screen Chip-Chap tells us that we can now proceed to deposit the Euro amount at a Piraeus Bank account with a reference code that is unique to this transaction. We can deposit cash at an EasyPay Piraeus Bank machine or transfer the money from another bank, including from banks in Greece:

	![](/images/Page 3.png)

	If we want to transfer the money from a Bank, we convert this bank account number to an IBAN format:

	![](/images/Page 4.png)

	![](/images/Page 5.png)

	Here is what the transfer looks like from another Greek Bank:

	![](/images/Page 6.png)

	A few hours after we deposit the money we will receive Bitcoin in our wallet:

	![](/images/Page 7.jpg)

	Sample receipt from Chip-Chap:

	![](/images/Page 8.png)
	

### <a name="projects"></a> What cryptocurrency and blockchain projects are there in Greece and Cyprus?

- The [Coinomi multicurrency wallet](https://coinomi.com)
- The [University of Nicosia free Introduction to Digital Currencies MOOC  and the MSc in Digital Currency](https://digitalcurrency.unic.ac.cy)
- [Synaphea](https://synaphea.com) Enterprise Blockchain Solutions
- [norbloc](https://norbloc.com)
- The [Oceanus Foundation](http://www.oceanus.tech)
- [TaxExperts](https://www.taxexperts.gr) offers cryptocurrency taxation advice
- [stampd](https://stampd.io)
- [BitforTip](https://www.bitfortip.com)
- [CoinLib](https://coinlib.io)

Last update: 2018-02-27

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
