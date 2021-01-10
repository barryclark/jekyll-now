---
layout: default
title: Πως αγοράζω, πουλάω, ξοδεύω και δεχόμαι Bitcoin στην Ελλάδα
---

![](/images/Bitcoin_4_year_cycle.jpeg)

Ελάτε στην επόμενη συνάντησή μας στην [Αθήνα](https://www.meetup.com/BlockchainGreece-0/), στη Θεσσαλονίκη [#1](https://www.meetup.com/BlockchainGreece-1/) [#2](https://www.meetup.com/Greek-Cryptocurrency-community/), στη [Λευκωσία και τη Λεμεσό](https://www.meetup.com/Decentralized-Cyprus-Meetups/) ή στην [Πάφο](https://www.meetup.com/Paphos-Bitcoin-Cryptocurrency-Meetup). Γραφτείτε στο [Slack](https://bitcoingreece.herokuapp.com) (online chat) μας. Διαβάστε το [BitcoinTalk](https://bitcointalk.org/gr) forum.

- [Ποιες εταιρείες και επαγγελματίες δέχονται Bitcoin στην Ελλάδα;](#merchant-table)
- [Ποιες γνωστές εταιρείες του εξωτερικού δέχονται Bitcoin;](#bluechips)
- [Ποιες εισηγμένες σε χρηματιστήριο εταιρείες έχουν μετατρέψει τα αποθεματικά τους σε Bitcoin;](#treasuries)
- [Πώς μπορώ να αγοράσω ή να εξαργυρώσω Bitcoin στην Ελλάδα;](#buybitcoin)
- [Μπορώ να αγοράσω ή να εξαργυρώσω Bitcoin μέσω Revolut και Paypal;](#revolutpaypal)
- [Που μπορώ να μάθω περισσότερα για το Bitcoin;](#bitcoin.org)
- [Ποια βιβλία να διαβάσω για το Bitcoin;](#books)
- [Σε τι διαφέρει το Bitcoin από μετρητά, από χρήματα στην τράπεζα, από το χρυσό;](#compare)
- [Ποια είναι κάποια μοντέλα αποτίμησης του Bitcoin;](#valuation)
- [Πως μπορώ να αποκτήσω ένα πορτοφόλι Bitcoin;](#wallet)
- [Αναζητώ ένα πορτοφόλι Bitcoin που να λειτουργεί στα Ελληνικά](#greekwallet)
- [Τι χρειάζομαι για να δέχομαι πληρωμές σε κατάστημα;](#paymentsinperson)
- [Είναι απαραίτητο να διαθέτω πορτοφόλι Bitcoin για να δέχομαι πληρωμές σε Bitcoin; Μπορώ να μετατρέπω τα Bitcoin σε Ευρώ αυτόματα;](#processors)
- [Μπορώ να φορτίζω μια χρεωστική κάρτα σε Ευρώ με Bitcoin;](#prepaidcard)
- [Τι έξοδα έχει μια πληρωμή σε Bitcoin;](#fees)
- [Πως μπορώ να στείλω μια πληρωμή Bitcoin με χαμηλά έξοδα & χαμηλή προτεραιότητα ή με υψηλά έξοδα & υψηλή προτεραιότητα;](#customfees)
- [Μπορεί ο πληρωτής να ακυρώσει την πληρωμή που έκανε με Bitcoin;](#reversal)
- [Μπορώ να κάνω μια αγοραπωλησία για Bitcoin με κάποιον που δεν γνωρίζω ή δεν εμπιστεύομαι;](#mediationplatforms)
- [Ποια είναι η τρέχουσα ισοτιμία του Bitcoin σε Ευρώ;](#exchangerate)
- [Μπορώ να αγοράσω ή να στείλω μέρος ενός Bitcoin;](#satoshis)
- [Διάβασα ότι στην Ευρωπαϊκή Ένωση οι συναλλαγές με Bitcoin εξαιρούνται από το ΦΠΑ, είναι αλήθεια;](#VAT)
- [Ποιος εποπτεύει τα κρυπτονομίσματα στην Ελλάδα;](#regulator)
- [Πως μπορώ να δω μια πληρωμή με Bitcoin από κοντά;](#demo)
- [Πως μπορώ να δεχτώ έμβασμα σε τράπεζα της Ευρωζώνης και να μετατρέψω τα Ευρώ σε Bitcoin;](#sepatobitcoin)
- [Πως θα διαφημίσω ότι δέχομαι Bitcoin ως τρόπο πληρωμής;](#promote)
- [Ποια άλλα κρυπτονομίσματα υπάρχουν πέρα από το Bitcoin;](#cryptocurrencies)
- [Τι πρέπει να προσέχω όταν αγοράζω ή επενδύω σε κρυπτονομίσματα;](#scams)
- [Έχω οικιακό τιμολόγιο €0,10/KWh της ΔΕΗ, μπορώ να κάνω mining κρυπτονομισμάτων;](#electricitycost)
- [Τα κρυπτονομίσματά μου ανέβηκαν πολύ, πώς μπορώ να βοηθήσω τον τόπο μου και τους συνανθρώπους μου;](#philanthropy)
- [Ποια projects σχετικά με κρυπτονομίσματα και blockchain υπάρχουν στην Ελλάδα και στην Κύπρο;](#projects)

### <a name="merchant-table"></a>Ποιές εταιρείες και επαγγελματίες δέχονται Bitcoin στην Ελλάδα;

[Αναζήτηση σε χάρτη](https://coinmap.org/#/world/38.81403111/24.63134766/6). Ενημερωθείτε για νέες καταχωρήσεις στον χάρτη [εδώ](https://twitter.com/hashtag/coinmap_gr?f=tweets&vertical=default&src=hash).

![](/images/Coinmap.png)

<table>
{% for company in site.data.data %}
<tr>
		{% if company.url %}
		<td><a href="{{company.url}}" rel="nofollow">{{company.company_gr}}</a></td>
		{% else %}
		<td>{{company.company_gr}}</td>
		{% endif %}
		<td>{{company.category_gr}}</td>
		<td>{{company.location_gr}}</td>
</tr>
{% endfor %}
</table>

### <a name="bluechips"></a> Ποιες γνωστές εταιρείες του εξωτερικού δέχονται Bitcoin;

Ενδεικτικά:

- [Microsoft](https://commerce.microsoft.com/PaymentHub/Help/Right?helppagename=CSV_BitcoinHowTo.htm), για πελάτες στην Αμερική
- [Expedia](http://www.expedia.com/Checkout/BitcoinTermsAndConditions) και στην Ελλάδα
- [Περιοδικό Fortune](https://subscription.timeinc.com/storefront/site/fo-20for1999ccar1214bc.html)
- [Wikipedia](https://wikimediafoundation.org/wiki/Ways_to_Give#bitcoin), για δωρεές
- [UNICEF](https://www.unicef.org/press-releases/unicef-launches-cryptocurrency-fund)

### <a name="treasuries"></a>Ποιες εισηγμένες σε χρηματιστήριο εταιρείες έχουν μετατρέψει τα αποθεματικά τους σε Bitcoin;

Τον Ιανουάριο του 2021, 15 [εισηγμένες σε χρηματιστήριο εταιρείες είχαν μετατρέψει €1,1δις των αποθεματικών τους σε Bitcoin](https://bitcointreasuries.org).

### <a name="buybitcoin"></a>Πώς μπορώ να αγοράσω ή να εξαργυρώσω Bitcoin στην Ελλάδα;

- Στα 60+ Bitcoin ATM που εμφανίζει ο χάρτης της [Coin ATM Radar](https://coinatmradar.com/country/83/bitcoin-atm-greece/). Τα περισσότερα από αυτά ανήκουν στην [Bcash Greece](https://bcash.eu/gr/) ([δείτε τα βίντεο με οδηγίες χρήσης](https://www.youtube.com/channel/UCo4WSs5gFgp9RgvR2f-1okg/videos)) και στην [iQ CashNow](https://www.iqcashnow.com/?lang=el).

- Σε οποιοδήποτε ανταλλακτήριο Bitcoin διεθνώς, μέσω τραπεζικού εμβάσματος. Αυτή η μέθοδος έχει και τα χαμηλότερα κόστη, εφόσον το έμβασμα γίνει με τη μέθοδο SEPA (ενδεικτικό κόστος μεταφοράς: €1). Παραδείγματα ανταλλακτηρίων που δέχονται εμβάσματα με SEPA είναι [Kraken](https://www.kraken.com), [Coinbase](https://www.coinbase.com/) και [BitStamp](https://www.bitstamp.net).
- Σε ανταλλακτήρια που δέχονται πιστωτικές ή χρεωστικές κάρτες.
- Από κάποιον ιδιώτη στην Ελλάδα που θα τον εντοπίσετε στο [Localbitcoins](https://localbitcoins.com/), στο [BitcoinTalk forum](https://bitcointalk.org/index.php?board=136.0), στο [HodlHodl](https://hodlhodl.com), στο [Bisq](https://bisq.network) ή στο [Paxful](https://paxful.com). Με αυτούς μπορείτε να ανταλλάξετε Ευρώ με όποιον τρόπο θέλετε π.χ. χέρι-με-χέρι, Paypal, Western Union, Πειραιώς Λεφτά Στο Λεπτό, τραπεζική μεταφορά κλπ.
- Από το ανταλλακτήριο [BCash](https://bcash.gr/) με κατάθεση σε Ελληνική τράπεζα μέχρι €5000 την ημέρα με προμήθεια 9%.

### <a name="revolutpaypal"></a>Μπορώ να αγοράσω ή να εξαργυρώσω Bitcoin μέσω Revolut και Paypal;

- Μπορείτε να κάνετε συναλλαγές στα περισσότερα ανταλλακτήρια κάνοντας SEPA transfers από/προς τη Revolut.
- Επειδή οι συναλλαγές μέσω Paypal είναι εύκολα αντιστρέψιμες, δεν θα βρείτε εύκολα κάποιον να σας πουλήσει Bitcoin μέσω Paypal.
- Η Revolut και η Paypal πουλάνε «Bitcoin» στους χρήστες τους (η Paypal όχι στην Ελλάδα ακόμη), αλλά είναι εικονικό, δεν μπορείτε να το στείλετε έξω από το σύστημά τους ή να το περάσετε στην πραγματική κατοχή σας. Είναι χρήσιμο μόνο σε κάποιον που επιθυμεί να στοιχηματίσει στην τιμή του Bitcoin.

### <a name="bitcoin.org"></a>Που μπορώ να μάθω περισσότερα για το Bitcoin;

Η επίσημη σελίδα ενημέρωσης για το Bitcoin είναι το [bitcoin.org](https://bitcoin.org). Η σελίδα [Bitcoin Resources του Jameson Lopp](https://lopp.net/bitcoin.html) είναι επίσης πολύ χρήσιμη. Στα Ελληνικά υπάρχει και το [learnbitcoin.gr](https://learnbitcoin.gr).

### <a name="books"></a>Ποια βιβλία να διαβάσω για το Bitcoin;

- Μικρό, εισαγωγικό, μη-τεχνικό βιβλίο: [The Little Bitcoin Book](https://littlebitcoinbook.com)
- Μικρό, εισαγωγικό, μη-τεχνικό βιβλίο: [21 Lessons: What I've Learned from Falling Down the Bitcoin Rabbit Hole](https://21lessons.com) ([στα Ελληνικά](https://niclick.org/blog/21-mathimata-philosofia/))
- Μη-τεχνικό βιβλίο για την ιστορία του Bitcoin: [Digital Gold](https://www.harpercollins.com/9780062572066/digital-gold/)
- Μη-τεχνικά βιβλία για τη χρησιμότητα του Bitcoin: [The Internet of Money](https://theinternetofmoney.info)
- Μη-τεχνικό βιβλίο για τη χρησιμότητα του Bitcoin ως εναλλακτική του Δολαρίου και του χρυσού: [The Bitcoin Standard: The Decentralized Alternative to Central Banking](https://saifedean.com/thebitcoinstandard/)
- Τεχνικό βιβλίο για το Bitcoin: [Mastering Bitcoin](https://bitcoinbook.info)
- Τεχνικό βιβλίο για το Bitcoin: [Programming Bitcoin](https://programmingbitcoin.com)
- Τεχνικό βιβλίο για το Bitcoin: [Bitcoin Programming](https://kkarasavvas.com/assets/bitcoin-textbook.pdf)
- [Άλλα βιβλία](https://www.lopp.net/bitcoin-information/books.html)

### <a name="compare"></a>Σε τι διαφέρει το Bitcoin από μετρητά, από καταθέσεις στην τράπεζα, από το χρυσό και τις πιστωτικές κάρτες;

![](/images/Bitcoin_emission.jpeg)

- Μπορείτε να στείλετε Bitcoin σε κάποιον μέσω του Internet.
- Δεν μπορεί να σας εμποδίσει κάποιος να στείλετε Bitcoin οπουδήποτε στον κόσμο.
- Μπορείτε να στείλετε υποδιαίρεση του Bitcoin.
- Δεν μπορεί κάποιος να κατασχέσει/κουρέψει τα Bitcoin σας χωρίς την άδειά σας.
- Κάθε μεταφορά Bitcoin κοστίζει σήμερα €0,10 ανεξάρτητα από τον αριθμό Bitcoin που στέλνετε.
- Δεν χρειάζετε να δώσετε τα στοιχεία σας σε κανέναν για να φτιάξετε ένα πορτοφόλι Bitcoin.
- Για να λάβετε ή να στείλετε μια πληρωμή Bitcoin δεν χρειάζεται να μοιραστείτε τα προσωπικά σας στοιχεία.
- Μια συναλλαγή Bitcoin συνήθως ολοκληρώνεται μέσα σε 10 λεπτά.
- Μια μεταφορά Bitcoin δεν μπορεί να ακυρωθεί χωρίς την άδεια του αποστολέα.
- Τα Bitcoin δεν [τυπώνονται ακατάσχετα](https://en.wikipedia.org/wiki/Quantitative_easing) όπως συμβαίνει με τα εθνικά νομίσματα.
- Όλες οι συναλλαγές Bitcoin γίνονται δημόσια και είναι ορατές στο Internet. Όμως δεν καταγράφεται η ταυτότητα του αποστολέα και του παραλήπτη.
- Τα Bitcoin πρέπει να τα προστατεύουμε από κλοπή και από καταστροφή του μέσου που είναι αποθηκευμένα, όπως και τα μετρητά.
- Το Bitcoin, όπως τα μετρητά και ο χρυσός, και σε αντίθεση με τις τραπεζικές καταθέσεις, δεν έχει counterparty (αντισυμβαλλόμενο) από τον οποίο εξαρτώμαστε. Το Bitcoin θεωρείται [base money](https://cryptovoices.com/basemoney).

### <a name="valuation"></a>Ποια είναι κάποια μοντέλα αποτίμησης του Bitcoin;

![](/images/Bitcoin_Stock-To-Flow_S2F_model.png)

- Το [μοντέλο αποτίμησης του Bitcoin Stock-to-Flow](https://100trillionusd.github.io/#one), διαθέσιμο και στα Ελληνικά.
- Οι [εκθέσεις αποτίμησης του Bitcoin των Greyscale, Paul Tudor Jones, MicroStrategy, Fidelity και VanEck](https://github.com/100trillionUSD/bitcoin).

### <a name="wallet"></a>Πως μπορώ να αποκτήσω ένα πορτοφόλι Bitcoin;

Μια λίστα με πορτοφόλια Bitcoin είναι αναρτημένη στο [bitcoin.org](https://bitcoin.org/en/choose-your-wallet). Εδώ μπορείτε να δείτε ένα [βίντεο](https://www.youtube.com/watch?v=9qgqPvc6kgM) για το πως φτιάχνετε ένα πορτοφόλι CoPay. Άλλη λίστα με [έμπιστα πορτοφόλια Bitcoin](https://www.lopp.net/bitcoin-information/recommended-wallets.html).

Προσοχή: ποτέ δεν ψάχνουμε στο Google ή στο Gooble Play ή στο Apple AppStore για "Bitcoin wallet" γιατί θα πέσουμε σε ψεύτικα πορτοφόλια που θα μας κλέψουν τα Bitcoin.

### <a name="greekwallet"></a>Αναζητώ ένα πορτοφόλι Bitcoin που να λειτουργεί στα Ελληνικά

Δοκιμάστε τα:

- [Coinomi](https://coinomi.com), τρέχει σε Android και iOS.
- [Electrum](https://electrum.org) τρέχει σε Windows, Mac, Linux, Android.

### <a name="paymentsinperson"></a> Τι χρειάζομαι για να δέχομαι πληρωμές σε κατάστημα;

Εσείς και ο πελάτης που μπαίνει στο κατάστημα χρειάζεστε από ένα smartphone ή ένα tablet ή έναν υπολογιστή με σύνδεση στο Internet και ένα πορτοφόλι Bitcoin. Ο πελάτης με το smartphone ή το tablet θα σκανάρει το QR code που θα δημιουργήσει το δικό σας πορτοφόλι. Η υπόλοιπη συναλλαγή θα γίνει μέσω Internet.

### <a name="processors"></a> Είναι απαραίτητο να διαθέτω πορτοφόλι Bitcoin για να δέχομαι πληρωμές σε Bitcoin; Μπορώ να μετατρέπω τα Bitcoin σε Ευρώ αυτόματα;

Μπορείτε να χρησιμοποιήσετε έναν πάροχο πληρωμών που θα δέχεται Bitcoin για εσάς και θα σας αποδίδει Ευρώ. Τέτοιοι πάροχοι είναι:

- [Bitpay](https://bitpay.com)
- [Coinbase](https://www.coinbase.com/merchants)
- [Braintree](https://www.braintreepayments.com)

### <a name="prepaidcard"></a> Μπορώ να φορτίζω μια χρεωστική κάρτα σε Ευρώ με Bitcoin;

Μπορείτε να βγάλετε μια επαναφορτιζόμενη προπληρωμένη χρεωστική κάρτα σε Ευρώ. Ένας κατάλογος με τέτοιες κάρτες είναι [εδώ](https://www.cryptocompare.com/wallets/#/cards).

Μπορείτε να χρησιμοποιείτε τις κάρτες αυτές για αγορές και αναλήψεις μετρητών στην Ελλάδα και στο εξωτερικό.

### <a name="fees"></a> Τι έξοδα έχει μια πληρωμή σε Bitcoin;

Για τον παραλήπτη, τίποτα, εκτός αν κάνει χρήση κάποιου πάροχου πληρωμών. Στον αποστολέα κοστίζει περίπου €1 ανεξαρτήτως του ποσού.

### <a name="customfees"></a> Πως μπορώ να στείλω μια πληρωμή Bitcoin με χαμηλά έξοδα & χαμηλή προτεραιότητα ή με υψηλά έξοδα & υψηλή προτεραιότητα;

Όλες οι πληρωμές Bitcoin είναι ορατές στο δίκτυο αμέσως. Δείτε την εξαίρεση για υπηρεσίες όπως το Coinbase πιο κάτω. Τα έξοδα της συναλλαγής επηρεάζουν το πόσο γρήγορα θα επιβεβαιωθεί (confirm) η συναλλαγή σε ένα block.

Όλα τα πορτοφόλια Bitcoin σας επιτρέπουν να επιλέξετε τα έξοδα της συναλλαγής. Χαμηλά έξοδα σημαίνουν χαμηλή προτεραιότητα για τη συναλλαγή (να επιβεβαιωθεί σε μερικές ώρες). Υψηλά έξοδα σημαίνουν υψηλή προτεραιότητα για τη συναλλαγή (να επιβεβαιωθεί στα επόμενα λεπτά). Τα έξοδα μετρώνται σε Satoshis per byte (1 Satoshi ισούται με 1/100.000.000 του Bitcoin). Το μέγεθος της συναλλαγής σας εξαρτάται από πολλούς παράγοντες και κατά μέσο όρο είναι 226 bytes. Συχνά τα πορτοφόλια προτείνουν πολύ υψηλά έξοδα συναλλαγών και μπορεί να θέλουμε να επέμβουμε χειροκίνητα (μερικά πορτοφόλια που μας επιτρέπουν να εισάγουμε χειροκίνητα τα έξοδα σε Satoshis per byte είναι το CoPay και το Electrum). Επισκεφτείτε τις σελίδες [https://bitcoinfees.earn.com](https://bitcoinfees.earn.com) και [https://core.jochen-hoenicke.de/queue/#1w](https://core.jochen-hoenicke.de/queue/#1w) για να υπολογίσετε μόνοι σας μια τιμή σε Satoshis per byte.

Ένας τρόπος ώστε οι πληρωμές σας να έχουν μικρότερο μέγεθος και άρα μικρότερα έξοδα, είναι να γίνονται από διευθύνσεις τύπου SegWit. Ένα παράδειγμα πορτοφολιού που υποστηρίζει τέτοιες διευθύνσεις είναι το Electrum. Μια διεύθυνση τύπου SegWit ξεκινά από 3 αντί για 1. Αν θέλετε οι δικές σας πληρωμές να έχουν χαμηλά έξοδα, φροντίστε να δέχεστε Bitcoin σε τέτοιες διευθύνσεις.

Υπηρεσίες που προσφέρουν online λογαριασμούς Bitcoin, όπως η Coinbase, δεν θεωρούνται πορτοφόλια. Πρώτον, οι διευθύνσεις και τα κλειδιά Bitcoin ανήκουν σε αυτούς και όχι σε εσάς. Δεύτερον, δεν σας επιτρέπουν να επιλέξετε τα έξοδα και την προτεραιότητα των συναλλαγών σας. Τρίτον, δεν στέλνουν απαραίτητα τις πληρωμές σας στο δίκτυο αμέσως. Για να μειώσουν τα κόστη τους περιμένουν να μαζευτούν πληρωμές διαφόρων πελατών και τις κάνουν ως μέρος της ίδιας συναλλαγής.

### <a name="reversal"></a> Μπορεί ο πληρωτής να ακυρώσει την πληρωμή που έκανε με Bitcoin;

Αυτό είναι δυνατόν με πληρωμές με πιστωτικές/χρεωστικές κάρτες και Paypal, αλλά είναι αδύνατον με Bitcoin. Μόνο ο παραλήπτης της πληρωμής μπορεί να επιστρέψει τα Bitcoin, εαν το επιθυμεί.

### <a name="mediationplatforms"></a> Μπορώ να κάνω μια αγοραπωλησία για Bitcoin με κάποιον που δεν γνωρίζω ή δεν εμπιστεύομαι;

Με το [OpenBazaar](https://www.openbazaar.org) και το [Bitrated](https://www.bitrated.com) μπορείτε να κάνετε οποιαδήποτε συναλλαγή χρησιμοποιώντας έναν διαιτητή (mediator ή trust agent) ο οποίος σε περίπτωση διαφωνίας αγοραστή και πωλητή θα στείλει τα Bitcoin στον έναν ή στον άλλον αφού ζητήσει να δει αποδεικτικά στοιχεία, έναντι αμοιβής. Δεν μπορεί να κρατήσει τα Bitcoin για τον εαυτό του ή να τα στείλει σε κάποιον τρίτο. Το OpenBazaar είναι μια αγορά προϊόντων και υπηρεσιών (στην οποία μπορείτε να εκθέτετε μόνιμα) και απαιτεί τα μέρη να τρέξουν ένα πρόγραμμα στον υπολογιστή τους ενώ το Bitrated είναι μια ιστοσελίδα χωρίς αγορά. Μπορείτε και εσείς να προσφέρετε υπηρεσίες διαιτησίας έναντι αμοιβής.

### <a name="exchangerate"></a>Ποια είναι η τρέχουσα ισοτιμία του Bitcoin σε Ευρώ;

Μπορείτε να τη δείτε στη σελίδα της [Google](https://www.google.com/finance?q=BTCEUR).

### <a name="satoshis"></a>Μπορώ να αγοράσω ή να στείλω μέρος ενός Bitcoin;

Ναι, ένα Bitcoin αποτελείται από 100 εκατομμύρια satoshis.

### <a name="VAT"></a> Διάβασα ότι στην Ευρωπαϊκή Ένωση οι συναλλαγές με Bitcoin εξαιρούνται από το ΦΠΑ, είναι αλήθεια;

Όχι, οι συναλλαγές που γίνονται σε Bitcoin υπάγονται σε ΦΠΑ όπως και οι συναλλαγές που γίνονται σε Ευρώ.

Αυτό που αποφάσισε το Ευρωπαϊκό Δικαστήριο στις 22 Οκτωβρίου 2015 είναι ότι [η αγορά και πώληση Bitcoin έναντι άλλων νομισμάτων δεν υπάγεται σε ΦΠΑ](http://curia.europa.eu/jcms/upload/docs/application/pdf/2015-10/cp150128en.pdf), όπως για παράδειγμα δεν υπάγεται σε ΦΠΑ η αγορά και πώληση Ευρώ έναντι Δολαρίων Αμερικής.

### <a name="regulator"></a>Ποιος εποπτεύει τα κρυπτονομίσματα στην Ελλάδα;

Αυτή τη στιγμή στην Ελλάδα τα κρυπτονομίσματα εποπτεύονται μόνο από την σκοπιά του Ξεπλύματος Μαύρου Χρήματος (AML - Anti Money Laundering) σύμφωνα με το νόμο [4557/2018](https://www.taxheaven.gr/law/4557/2018) (το κείμενο του νόμου είναι πλήρως ενημερωμένο), όπως μεταβλήθηκε από το νόμο [4734/2020](https://www.taxheaven.gr/law/4734/2020). Ο τελευταίος είναι γνωστός και ως η [Οδηγία AMLD5 της Ευρωπαϊκής Ένωσης](https://www.sygna.io/blog/what-is-amld5-anti-money-laundering-directive-five-a-guide/). Εποπτευόμενοι στην Ελλάδα είναι τα ανταλλακτήρια με έδρα στην Ελλάδα, που δεν είναι περισσότερα από 1-2, και τα Bitcoin ATM. Επόπτης είναι η [Επιτροπή Κεφαλαιαγοράς](http://www.hcmc.gr).

### <a name="demo"></a> Πως μπορώ να δω μια πληρωμή με Bitcoin από κοντά;

Στο [Cardia Cafe](https://www.facebook.com/cardia.cafe/) στην Αθήνα, αφού επικοινωνήσετε με την ιστοσελίδα του πρώτα. 

Ελάτε σε κάποια [συνάντησή μας στην Αθήνα](https://www.meetup.com/BlockchainGreece-0/) ή στη [Θεσσαλονίκη](https://www.meetup.com/BlockchainGreece-1/). Γράψτε στο [Ελληνικό τμήμα του Bitcoin Talk](https://bitcointalk.org/gr). Γραφτείτε στο [Slack](http://bitcoingreece.herokuapp.com) (online chat) μας. Δείτε αυτό το [βίντεο](https://www.youtube.com/watch?v=9qgqPvc6kgM) για το πως φτιάχνετε ένα πορτοφόλι και στέλνετε και λαμβάνετε Bitcoin.

### <a name="sepatobitcoin"></a> Πως μπορώ να δεχτώ έμβασμα σε τράπεζα της Ευρωζώνης και να μετατρέψω τα Ευρώ σε Bitcoin;

Μπορείτε να χρησιμοποιήσετε:

- Η [Bitwala](https://bitwala.com) προσφέρει λογαριασμούς Ευρώ με δικό σας IBAN και πορτοφόλια Bitcoin.

### <a name="promote"></a>  Πως θα διαφημίσω ότι δέχομαι Bitcoin ως τρόπο πληρωμής;

- Προσθέστε τον εαυτό σας στον [χάρτη του Coinmap](https://coinmap.org/#/world/38.81403111/24.63134766/6).
- Προσθέστε κάποια σχετική [εικόνα](https://en.bitcoin.it/wiki/Promotional_graphics) (π.χ. Bitcoin Accepted Here) στο κατάστημά σας και στην ιστοσελίδα σας.
- Στείλε μας email (αναγράφεται στο τέλος της σελίδας) ώστε να σας προσθέσουμε στη σελίδα αυτή. Ή κάνετε ένα Pull Request στο GitHub!

### <a name="cryptocurrencies"></a>Ποια άλλα κρυπτονομίσματα υπάρχουν πέρα από το Bitcoin;

Αυτή είναι μια [λίστα με κρυπτονομίσματα](http://www.coincap.io).

### <a name="scams"></a>Τι πρέπει να προσέχω όταν αγοράζω ή επενδύω σε κρυπτονομίσματα;

- ΜΗΝ στέλνετε Bitcoin σε απατεώνες που [σας εκβιάζουν γράφοντας σε email ότι σας έχουν βιντεοσκοπήσει](http://www.hellenicpolice.gr/index.php?option=ozo_content&lang=&perform=view&id=92368&Itemid=2394&lang=). Συχνά μάλιστα παραθέτουν [κωδικούς σας που έχουν διαρρεύσει στο διαδίκτυο](https://haveibeenpwned.com).
- Ένα κρυπτονόμισμα που δεν εμφανίζεται [στη λίστα αυτή](https://coinmarketcap.com) μπορεί να είναι ύποπτο.
- Όταν εξετάζετε ένα κρυπτονόμισμα, δείτε το [γράφημα της τιμής του](https://coinmarketcap.com) σε βάθος χρόνου σε σχέση με το Bitcoin. Μπορεί σε όρους Δολαρίου ή Ευρώ να πηγαίνει καλά αλλά σε όρους Bitcoin να πηγαίνει στο μηδέν.
- Ένα κρυπτονόμισμα που παρουσιάζει τον εαυτό του ως επενδυτική ευκαιρία είναι σίγουρα ύποπτο.
- Ένα κρυπτονόμισμα ή επενδυτικό σχήμα που υπόσχεται εξωπραγματικές αποδόσεις, όπως να διπλασιάσει τα χρήματά σας σε 2 μήνες, είναι απάτη.
- Ένα κρυπτονόμισμα που μπορείτε να το αγοράσετε για €1 σήμερα και «εγγυημένα» θα μπορέσετε να το πουλήσετε ή να το ανταλλάξετε για €10 αργότερα είναι σίγουρα απάτη.
- Ένα κρυπτονόμισμα ή επενδυτικό σχήμα που σας ανταμείβει για να εγγράφετε άλλους σε αυτό με ποσοστά, είναι απάτη.
- Πολλές από τις «επενδυτικές ευκαιρίες» σε cloud mining είναι απάτες. Σκεφτείτε, αν κάποιοι έχουν εξοπλισμό που μπορεί να κάνει επικερδές mining σε κρυπτονομίσματα, γιατί να τον νοικιάσουν σε εσάς;
- Ένα ανταλλακτήριο που πουλάει ένα κρυπτονόμισμα σε πολύ χαμηλή τιμή (π.χ. πουλάει Bitcoin στη μισή τιμή σε σχέση με άλλα ανταλλακτήρια) είναι απάτη.
- Αν σας παίρνουν τηλέφωνο για να σας μιλήσουν για επενδύσεις είναι απάτη.
- Μερικές γνωστές απάτες που έχουν εμφανιστεί στην Ελλάδα: [UCA](https://www.youtube.com/watch?v=utyqmJFwM7M), [OneCoin/OneLife](https://www.kathimerini.gr/1055057/interactive/epikairothta/ereynes/sta-ixnh-ths-vasilissas-twn-kryptonomismatwn), Yellow Trading Coin (YTC), S-coin/Coinspace, BitClub, Cryptonex/Bitcoin Revolution. Μπορείτε να διαβάσετε περισσότερα στα Ελληνικά στο [Scamcoin Detector](http://scamdetectorgr.blogspot.gr/).
- Μερικά άρθρα που περιγράφουν απάτες με κρυπτονομίσματα: [https://blog.xapo.com/beware-of-extraordinary-claims/](https://blog.xapo.com/beware-of-extraordinary-claims/), [http://www.badbitcoin.org/](http://www.badbitcoin.org/), [https://www.weusecoins.com/bitcoin-scams-how-stay-safe/](https://www.weusecoins.com/bitcoin-scams-how-stay-safe/), [https://www.coingecko.com/buzz/complete-guide-to-bitcoin-scams](https://www.coingecko.com/buzz/complete-guide-to-bitcoin-scams). Βίντεο που περιγράφει πως δουλεύουν τα πυραμιδικά σχήματα Πόνζι: [https://www.youtube.com/watch?v=VXRkfqw67GE](https://www.youtube.com/watch?v=VXRkfqw67GE).

### <a name="electricitycost"></a>Έχω οικιακό τιμολόγιο €0,10/KWh της ΔΕΗ, μπορώ να κάνω mining κρυπτονομισμάτων;

[Το οικιακό τιμολόγιο της ΔΕΗ](https://bitcoinx.gr/ποιό-είναι-το-κόστος-της-κιλοβατώρας/) για κατανάλωση 2000-3000KWh ανά τετράμηνο, μετά όλους τους φόρους και τις προσαυξήσεις, είναι €0,2189375/KWh.

### <a name="philanthropy"></a>Τα κρυπτονομίσματά μου ανέβηκαν πολύ, πώς μπορώ να βοηθήσω τον τόπο μου και τους συνανθρώπους μου;

- Χρηματοδοτήστε υποτροφίες ή εκπαιδευτικά ιδρύματα
- Χρηματοδοτήστε νεοφυείς επιχειρήσεις ή funds που επενδύουν σε νεοφυείς επιχειρήσεις ή οργανισμούς που προωθούν την επιχειρηματικότητα
- Χρηματοδοτήστε τις τέχνες, τον πολιτισμό και την προστασία της φύσης
- Χρηματοδοτήστε νοσοκομεία και οργανισμούς συμπαράστασης ατόμων με ασθένειες και ειδικές ανάγκες
- Χρηματοδοτήστε την ιατρική έρευνα
- Χρηματοδοτήστε οργανισμούς αρωγής αστέγων και ατόμων που αντιμετωπίζουν προβλήματα επιβίωσης
- Χρηματοδοτήστε την άμυνα της χώρας

### <a name="projects"></a>Ποια projects σχετικά με κρυπτονομίσματα και blockchain υπάρχουν στην Ελλάδα και στην Κύπρο;

- Bitcoin nodes που τρέχουν στην [Ελλάδα](https://bitnodes.earn.com/nodes/?q=Greece) και στην [Κύπρο](https://bitnodes.earn.com/nodes/?q=Cyprus)
- Το [Coinomi multicurrency wallet](https://coinomi.com)
- Το [University of Nicosia δωρεάν MOOC Introduction to Digital Currencies και το MSc in Digital Currency](https://digitalcurrency.unic.ac.cy)
- Η [Synaphea](https://synaphea.com) Enterprise Blockchain Solutions
- Η [norbloc](https://norbloc.com)
- Η [TaxExperts](https://www.taxexperts.gr) ασχολείται με θέματα φορολογίας κρυπτονομισμάτων
- Το [stampd](https://stampd.io)
- Το [BitforTip](https://www.bitfortip.com)
- Το [CoinLib](https://coinlib.io)
- Το [BlockHero](https://blockhero.ai) portfolio tracker
- Ένα από τα τρία ερευνητικά κέντρα της [IOHK](https://iohk.io/team/) βρίσκεται στην Αθήνα
- Η [Bcash Greece](https://bcash.gr) φτιάχνει Bitcoin ATMs
- Η συμβουλευτική [SignedBlock](https://signedblock.com)
- Η [mytracknet](https://www.mytracknet.com)
- Η [BLOCK.CO](https://block.co)
- Η [Retraced](https://retraced.co/) αναπτύσσει το προϊόν της στην Κύπρο
- Ο Μη-Κερδοσκοπικός Οργανισμός [Hellenic Blockchain Hub](http://blockchain.org.gr)
- Ο Μη-Κερδοσκοπικός Οργανισμός [Cyprus Blockchain Technologies](http://cybt.eu)

Τελευταία ενημέρωση: 2021-01-10

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

