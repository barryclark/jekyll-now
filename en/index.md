---
layout: default_en
---

Come to one of our meetups in [Athens](http://www.meetup.com/BlockchainGreece-0/) or [Thessaloniki](http://www.meetup.com/BlockchainGreece-1/). Join our [Slack](http://bitcoingreece.herokuapp.com) (online chat).

- [Which companies, stores and professionals accept Bitcoin in Greece?](#merchant-table)
- [How can I buy Bitcoin in Greece?](#buybitcoin)

### <a name="merchant-table"></a>Which companies, stores and professionals accept Bitcoin in Greece?

[Map search](https://coinmap.org/#/world/38.81403111/24.63134766/6). New map entries show up [here](https://twitter.com/hashtag/coinmap_gr?f=tweets&vertical=default&src=hash).

<table>
{% for company in site.data.data %}
  <tr text-align: center;>
		{% if company.url %}
		<td text-align: center;><a href="{{company.url}}" rel="nofollow">{{company.company_en}}</a></td>
		{% else %}
		<td text-align: center;>{{company.company_en}}</td>
		{% endif %}
		<td text-align: center;>{{company.category_en}}</td>
		<td text-align: center;>{{company.location_en}}</td>
  </tr>
{% endfor %}
</table>

### <a name="buybitcoin"></a>How can I buy Bitcoin in Greece?

- At the [BitcoinsGreece](https://bitcoinsgreece.com/) Bitcoin ATM at the Orizontes bookshop, Thiveou Ioannou 20, Aharnes 13671, Attica at the outskits of Athens.
- At the [BCash](https://bcash.gr/) Bitcoin ATM at Dimitrakopoulou 84, Athens, near the Syggrou-Fix Metro station. Watch this [video](https://www.youtube.com/watch?v=WsVAE-4xP9A) on how to buy Bitcoin from this ATM. They charge 7% over the [Kraken](https://www.kraken.com) exchange rate.
- At any Bitcoin exchange in the world, via a bank transfer. Due to the capital controls in Greece, as of October 2016 you can wire up to €1000 abroad per month with no prior approval or paperwork. This method incurs the lowest fees, assuming you send the amount using a SEPA transfer (a Greek bank can charge as low as €1 for a SEPA transfer). Some exchanges that accept SEPA transfers are [Kraken](https://www.kraken.com), [Coinbase](https://www.coinbase.com/) and [BitStamp](https://www.bitstamp.net).
- At a Bitcoin exchange that accepts debit or credit cards. An exchange that accepts Greek cards is [Coinbase](https://www.coinbase.com/) and charges 3.99%. Another exchange is [Circle](https://www.circle.com/). Some Greek banks do not allow their cards to be used at some Bitcoin exchanges.
- <strike>At the [BTCGreece](https://www.btcgreece.com) exchange that accepts transfers at their Greek bank accounts.</strike>
- From a private Bitcoin trader you can find on [Localbitcoins](https://localbitcoins.com/) or at [BuyBitcoin.gr](https://www.facebook.com/BuyBitcoin.gr). You can exchange Euros with them using any method you want, e.g. in person, via Paypal, Western Union, Piraeus Bank Instant Cash (Lefta Sto Lepto), bank transfer etc.
- From the [Chip-Chap](https://chip-chap.com/) Bitcoin exchange that accepts cash at the EasyPay Piraeus Bank machines or via a deposit at their Piraeus Bank account. They charge 5% over the [Kraken](https://www.kraken.com) exchange rate at the time of purchase, that can be a few hours after your deposit. Here are some sample instructions:

	Use use the Chip-Chap Android app or we visit [https://web.chip-chap.com](https://web.chip-chap.com/) and select EasyPay. At this time the iOS app does not support EasyPay.

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

Last update: 2016-11-29

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
