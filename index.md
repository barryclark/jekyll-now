---
layout: default
---

- [Ποιές εταιρείες και επαγγελματίες δέχονται Bitcoin στην Ελλάδα;](#merchant-table)
- [Που μπορώ να μάθω περισσότερα για το Bitcoin;](#bitcoin.org)
- [Πως μπορώ να αποκτήσω ένα πορτοφόλι Bitcoin;](#wallet)
- [Αναζητώ ένα πορτοφόλι Bitcoin που να λειτουργεί στα Ελληνικά](#greekwallet)
- [Τι χρειάζομαι για να δέχομαι πληρωμές σε κατάστημα;](#paymentsinperson)
- [Είναι απαραίτητο να διαθέτω πορτοφόλι Bitcoin για να δέχομαι πληρωμές σε Bitcoin;](#processors)
- [Τι έξοδα έχει μια πληρωμή σε Bitcoin;](#fees)
- [Ποια είναι η τρέχουσα ισοτιμία του Bitcoin σε Ευρώ;](#exchangerate)
- [Διάβασα ότι στην Ευρωπαϊκή Ένωση οι συναλλαγές με Bitcoin εξαιρούνται από το ΦΠΑ, είναι αλήθεια;](#VAT)
- [Πως μπορώ να δω μια πληρωμή με Bitcoin από κοντά;](#demo)

### <a name="merchant-table"></a>Ποιές εταιρείες και επαγγελματίες δέχονται Bitcoin στην Ελλάδα;

[Αναζήτηση σε χάρτη](https://coinmap.org/#/world/38.81403111/24.63134766/6)

<table>
{% for company in site.data.data %}
  <tr text-align: center;>
		{% if company.url %}
		<td text-align: center;><a href="{{company.url}}" rel="nofollow">{{company.company_gr}}</a></td>
		{% else %}
		<td text-align: center;>{{company.company_gr}}</td>
		{% endif %}
		<td text-align: center;>{{company.category_gr}}</td>
		<td text-align: center;>{{company.location_gr}}</td>
  </tr>
{% endfor %}
</table>

### <a name="bitcoin.org"></a>Που μπορώ να μάθω περισσότερα για το Bitcoin;

Η επίσημη σελίδα ενημέρωσης για το Bitcoin είναι το [bitcoin.org](https://bitcoin.org).

### <a name="wallet"></a>Πως μπορώ να αποκτήσω ένα πορτοφόλι Bitcoin;

Μια λίστα με πορτοφόλια Bitcoin είναι αναρτημένη στο [bitcoin.org](https://bitcoin.org/en/choose-your-wallet), [εδώ](http://bitcoinx.io/wallets/) και [εδώ](https://en.bitcoin.it/wiki/Software). 

### <a name="greekwallet"></a> Αναζητώ ένα πορτοφόλι Bitcoin που να λειτουργεί στα Ελληνικά

Δοκιμάστε τα:

- [Bitcoin Core](https://bitcoin.org/en/download), τρέχει σε Windows, Mac, Linux. Είναι full client (πρέπει να κατεβάσετε τα 48GB του Blockchain).
- [Coinomi](https://coinomi.com), τρέχει σε Android. Είναι thin client.
- [Blockchain.info](https://blockchain.info), web site.
- [Electrum](https://electrum.org) τρέχει σε Windows, Mac, Linux, Android. Είναι thin client.
- [MultiBit HD](https://multibit.org) τρέχει σε Windows, Mac, Linux. Είναι thin client.

### <a name="paymentsinperson"></a> Τι χρειάζομαι για να δέχομαι πληρωμές σε κατάστημα;

Εσείς και ο πελάτης που μπαίνει στο κατάστημα χρειάζεστε από ένα smartphone ή ένα tablet ή έναν υπολογιστή με σύνδεση στο Internet και ένα πορτοφόλι Bitcoin. Ο πελάτης με το smartphone ή το tablet θα σκανάρει το QR code που θα δημιουργήσει το δικό σας πορτοφόλι. Η υπόλοιπη συναλλαγή θα γίνει μέσω Internet.

### <a name="processors"></a> Είναι απαραίτητο να διαθέτω πορτοφόλι Bitcoin για να δέχομαι πληρωμές σε Bitcoin;

Όχι, μπορείτε να χρησιμοποιήσετε έναν πάροχο πληρωμών που θα δέχεται Bitcoin για εσάς και θα σας αποδίδει Ευρώ. Τέτοιοι πάροχοι είναι:

- [Bitpay](https://bitpay.com)
- [Coinbase](https://www.coinbase.com/merchants)
- [Braintree](https://www.braintreepayments.com)

### <a name="fees"></a> Τι έξοδα έχει μια πληρωμή σε Bitcoin;

Για τον παραλήπτη, τίποτα, εκτός αν κάνει χρήση κάποιου πάροχου πληρωμών. Στον αποστολέα κοστίζει περίπου €0,03 (3 λεπτά του Ευρώ) ανεξαρτήτως του ποσού.

### <a name="exchangerate"></a> Ποια είναι η τρέχουσα ισοτιμία του Bitcoin σε Ευρώ;

Μπορείτε να τη δείτε στη σελίδα της [Google](https://www.google.com/finance?q=BTCEUR).

### <a name="VAT"></a> Διάβασα ότι στην Ευρωπαϊκή Ένωση οι συναλλαγές με Bitcoin εξαιρούνται από το ΦΠΑ, είναι αλήθεια;

Όχι, οι συναλλαγές που γίνονται σε Bitcoin υπάγονται σε ΦΠΑ όπως και οι συναλλαγές που γίνονται σε Ευρώ.

Αυτό που αποφάσισε το Ευρωπαϊκό Δικαστήριο στις 22 Οκτωβρίου 2015 είναι ότι [η αγορά και πώληση Bitcoin έναντι άλλων νομισμάτων δεν υπάγεται σε ΦΠΑ](http://curia.europa.eu/jcms/upload/docs/application/pdf/2015-10/cp150128en.pdf), όπως για παράδειγμα δεν υπάγεται σε ΦΠΑ η αγορά και πώληση Ευρώ έναντι Δολαρίων Αμερικής.

### <a name="demo"></a> Πως μπορώ να δω μια πληρωμή με Bitcoin από κοντά;

Επισκευτείτε κάποιο από τα καταστήματα του πίνακα. Ελάτε σε κάποια [συνάντησή μας στην Αθήνα](http://www.meetup.com/BlockchainGreece/). Γράψτε στο [Ελληνικό τμήμα του Bitcoin Talk](https://bitcointalk.org/index.php?board=120.0). 


Τελευταία ενημέρωση: 2015-12-01

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
