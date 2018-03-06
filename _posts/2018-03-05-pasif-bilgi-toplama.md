---
+layout: post
+title: "Pasif Bilgi Toplama (Açık Kaynak İstihbaratı)"
+excerpt: "Pasif bilgi toplama hakkında kısa bir özet."
---


**Kaynaklar:**

[erdemoflaz.com/pasif-bilgi-toplama](https://erdemoflaz.com/pasif-bilgi-toplama/)

[canyoupwn.me](https://canyoupwn.me)

[wikipedia.org](https://www.wikipedia.org/)


---
## Açık Kaynak İstihbaratı Nedir (OSINT)?

- Diğer bir adıyla **Open-Source Intelligence**; dış dünyaya erişimi açık kaynakların kullanımıyla, çıkarlar doğrultusunda, hedefe yönelik bilgi toplanmasıdır. Herkes internet üzerinde bir iz bırakır. Bu bırakılan izlerin toplanıp birleştirilmesi / takip edilmesi ile önemli bilgiler elde edilebilir.

- Örneğin benim ismimi, google ya da başka bir arama motoru üzerinde aratacak olursanız, benim kullandığım sosyal medya hesaplarımın bir çoğuna, fotoğraflarıma, yaşıma, e-mail adresime, belki çok daha kişisel bilgilerime erişim sağlayabilirsiniz.

	[google.com/search?q=Bora+Tanrikulu](https://www.google.com/search?q=Bora+Tanrikulu)

	[duckduckgo.com/?q=Bora+Tanrikulu](https://duckduckgo.com/?q=Bora+Tanrikulu)

	Örneğin DuckDuckGo arama motoru üzerinde **Bora Tanrıkulu** şeklinde arama yaptığınızda aşağıdaki gibi bir sonuç elde edersiniz.

	![duckduckgo-search](/images/pasif-bilgi-toplama/1.png)

- Açık kaynak istihbaratının önemi TSK tarafından hazırlanmış [Türkiye ve Açık Kaynak İstihbaratı](https://www.academia.edu/9832312/A%C3%A7%C4%B1k_Kaynak_%C4%B0stihbarat%C4%B1) metni içerisinde bulunan "Çağımızda ülkeler istihbarat ihtiyaçlarını %80-90 oranında açık kaynaklardan elde etmektedir" cümlesi ile daha rahat anlaşılabilir.

	![TSK-OSINT](/images/pasif-bilgi-toplama/2.png)

## Hedefe Ait IP Tespiti

- IP hakkında bilgi sahibi olmak için [ipsorgu.com](http://www.ipsorgu.com/) gibi siteler kullanılabilir
	
	![ipsorgu](/images/pasif-bilgi-toplama/4.png)

	ya da **nslookup** gibi araçlar kullanılabilir

	![nslookup](/images/pasif-bilgi-toplama/3.png)

## Hedefe Ait Subdomain'lerin Tespiti

- Google arama motoru üzerinde **site:\*.pau.edu.tr** şeklinde arama yaptığınızda [pau.edu.tr](http://www.pau.edu.tr/) adresinin subdomain'lerini görebilirsiniz.
	
	subdomain tespiti için [netcraft.com](https://www.netcraft.com/) kullanılabilir.

	![pau.edu.tr](/images/pasif-bilgi-toplama/5.png)

## Hedefe Ait İçeriklerin Tespiti

- Google arama motoru üzerinde **site:\*.pau.edu.tr ext:pdf** şeklinde arama yaptığınızda aşağıdaki gibi pdf'leri görebilirsiniz.

	![pdf-pau.edu.tr](/images/pasif-bilgi-toplama/7.png)

## theHarvester ile Bilgi Toplanması

- theHarvester farklı açık kaynaklardan; e-mail adresleri, subdomain isimleri, virtual host'ları, açık portları vb. tespit edebilen bir tool'dur.
	
	![theHarvester](/images/pasif-bilgi-toplama/15.png)

	![theHarvester-pauedutr](/images/pasif-bilgi-toplama/16.png)

## CloudFlare Bypass(atlamak) Etmek

- [Cloudflare](https://www.cloudflare.com) bir içerik dağıtım ağı servisidir yani sitenizin verilerini dünya çapında dağıtılmış sunucularda saklar ve sitelerin ip adreslerini saklar.
	
	Araştırılması yapılacak sitenin CloudFlare arkasın olup olmadığı anlamak için [builtwith.com](https://builtwith.com/wikipedia.org) kullanılabilir. Örneğin [canyoupwn.me](https://canyoupwn.me) sitesi CloudFlare arkasındadır.

	![builtwith-canyoupenme](/images/pasif-bilgi-toplama/23.png)

	Bu saklanmış IP'leri bulamak için bazı yöntemler vardır.

	Sitenin IP adresini bulmak için **ping** kullanılabilir. Bu yöntem ile sitenin CloudFlare'e kayıtlı olan IP adresini görmüş oluruz. Ama sitenin tüm alt domain'leri CloudFlare arkasına alınmamış olabilir.

	Buradaki mantığımız, sitenin tüm alt domainlerinin IP'leri ile CloudFlare'e kayıtlı olan IP'yi karşılaştırmak. Bulunan bu farklı ip adresi sitenin gerçek ip adresi olur.

	![nmap-dns-brute](/images/pasif-bilgi-toplama/22.png)

## Google Advanced Search

- Önceki başlıklarda da kullandığımız durumlara bakılacak olursa, **Google Advanced Search** güçlü bir silahtır. Bu silahın kullanımını bilmek, bir çok önemli bilgiye erişim sağlamaya olanak sağlar.
	
	Operatorler: (defcon-2005)

	![google-advanced-search](/images/pasif-bilgi-toplama/6.png)

	**site:** adres çubuğumuzda bulunan “https://canyoupwn.me” kısım.
    
    **inurl:** adres çubuğumuzda bulunan “canyoupwn.me” kısım
    
    **intitle:** sekmemizin başlığı “canyoupwn.me-for…”
    
    **intext:** resimdeki web sayfamızın sol alt köşesinde bulunan kısım “ TR | Nmap Cheat Sheet ”
    
    **intitle:** Aradığımız sayfanın başlığını bulacaktır.
    
    **inurl:** Aradığımız sayfanın url’ni bulacaktır.
    
    **Url:** İnternet’te bir kaynağa (belge veya resim gibi) rastgelen, standart bir formata uygun bir karakter dizgisidir.
    
    **filetype:** Aradığımız belirli dosyaları bulacaktır.
    
    **allintext:** Aradığımız tüm text dosyalarını bulacaktır.
    
    **link:** Aradığımız link’e ait sayfaları bulacaktır
    
    **inanchor:** Google aradığımız içerik bilgisi ile bağlantılı, içeriklere sahip bağlantılar ile aramamızı kısıtlayacaktır.
    
    **numrange:** Google aradığımız numara veya numara aralıklarını bulacaktır.
    
    **daterange:** Aradığımız tarih veya tarih aralıklarını bulacaktır.
    
    **author:** Aradığımız yazara ait bilgileri bulacaktır.
    
    **groups:** Google aradığımız bir topluluk ismini google groups da bulunan makaleler ve benzer isimdeki topluluk içerikleri ile sınırlandıracaktır.
    
    **insubject:** Google, konuyla belirttiğimiz terimleri içeren içerikler(makale vb.) ile sınırlar.
    
    **msgid:** (message id yani Türkçe adı ile mesaj kimliği) Her e-postanın bir kimliği(id) vardır.Google da bu kimlik ile arama yaptığımızda bu e-posta ile bağlantılı bilgiler ile aramamız sınırlanacaktır.
    
    **define:** Aradığımız girdi ile ilgili bilgi bulacaktır.
    
    **maps:** Aradığımız lokasyon ile ilgili bilgi bulacaktır.
    
    **book:** Aradığımız kitap ile ilgili bilgi bulacaktır.
    
    **info:** Google girdiğimiz url ile ilgili web sayfası hakkında bilgiler ile aramayı sınırlayacaktır.
    
    **related:** Google girdiğimiz url ile belirttiğimiz web sayfası ile benzer web sayfaları ile aramayı sınırlandıracaktır.


## Lokasyon Tespiti

- [wikipedia.org](https://www.wikipedia.org/) domain'i [ipfingerprints.com](http://www.ipfingerprints.com/) adresinde aratırsak aşağıdaki gibi bir sonuç elde ederiz.
	
	[ipfingerprints.com](http://www.ipfingerprints.com/) yerine başka muadil sistemler de tercih sebebi olabilir

	![location-wikipedia](/images/pasif-bilgi-toplama/8.png)

## WHOIS Kaydı İncelemesi

- [WHOIS](https://www.whois.net/) kullanılarak domain'ler hakkında bilgi sahibi olunabilir.
	
	Örneğin aşağıdaki gibi bir arama ile, [wikipedia.org](https://www.wikipedia.org/) hakkında bilgi edinilir.

	![wikipedia.org-1](/images/pasif-bilgi-toplama/9.png)

	![wikipedia.org-2](/images/pasif-bilgi-toplama/10.png)

## Shodan Arama Motoru ile Araştırma

- Shodan ile internete bağlı cihazlar tespit edilebilir.
	
	Örneğin aşağıdaki gibi bir arama ile 22 portu (default ssh) ile internete bağlı cihazlar tespit edilebilir.

	![shodan-22](/images/pasif-bilgi-toplama/11.png)

## Zoomeye Arama Motoru ile Araştırma

- Shodan ile benzer şekilde, Zoomeye ile de internete bağlı cihazlar üzerinde belli filtreleme yaparak sonuca ulaşılabilir.

	Örneğin **os:linux** şeklideki bir arama ile aşağıdaki gibi bir sonuç elde edilir.

	![zoomeye-os-linux](/images/pasif-bilgi-toplama/12.png)

	Daha detaylı aramaların nasıl yapıldığını öğrenmek için [zoomeye.org/help](https://www.zoomeye.org/help)

	![zoomeye-help](/images/pasif-bilgi-toplama/13.png)

## Archive.org ile Zamanda Geriye Gitmek

- [archive.org](https://archive.org/index.php) geçmişten  günümüze kadar sitelerin o anki görünümünü kayıt altına alan bir web sitesidir.  Bu size, bir web sitesinin daha önceden yapılan hataların düzeltilmemiş yanlarının günümüze kadar gelmesi durumlarını incelemenize yarar.

	Örneğin facebook’un 10 yıl önceki görünümüne aşağıdaki gibi erişebilirsiniz.

	![facebook-timemachine-10](/images/pasif-bilgi-toplama/14.png)

## Sosyal Medya Hesaplarının Analizi

- [pipl.com](https://pipl.com/), insanların sosyal medya hesaplarını, fotoğraflarını, telefon numaralarını, lokasyonlarını aramayı sağlayan bir arama motorudur.

	Sosyal medya siteleri; insanların bilgilerini sosyal medya siteleri üzerinde tutarsızca paylaştığı günümüz dünyasında, insanlar hakkında bilgi toplamak için çok uygun bir ortamdır.

	![pipl-boratanrikulu](/images/pasif-bilgi-toplama/17.png)

## E-Mail Adres Analizi

- [haveibeenpwned.com](https://haveibeenpwned.com/) sitesi ile, araştırmasını yaptığımız e-mail'in daha önce siber saldırılardan etkilenip etkilenmediğini araştırabiliriz.
	
	![pwnedmails](/images/pasif-bilgi-toplama/18.png)

## Alexa ile Site Analizi

- [alexa.com](https://www.alexa.com/siteinfo) ile sitelerin dereceleri(rank), trafik kaynaklarını, istatistikleri incelenebilir.
	
	![alexa-wikipedia](/images/pasif-bilgi-toplama/19.png)

## CV İncelenmesi

- [secretcv.com](https://www.secretcv.com/) oldukça büyük bir CV verisine sahiptir. Eğer aradığınız kişi bu veriler içinde birisi ise CV'sine kolaylıkla ulaşabilirsiniz.

## GitHub Commit'leri

- [GitHub](https://github.com) commit'lerinin incelenmesiyle, geliştiriciler tarafından gözden kaçmış / göz ardı edilmiş bilgilere erişilebilir, önemli bilgiler elde edilebilir.

	![github-commit](/images/pasif-bilgi-toplama/20.png)

## Pastebin

- [pastebin.com](https://pastebin.com/) hızlı olarak genellikle uzun textlerin gönderildiği bir web sitesidir. İnsanların dikkatsizce **public** olarak gönderme yaptığından dolayı, bir çok önemli verinin bulnabileceği bir sitedir.

	![pastebin](/images/pasif-bilgi-toplama/21.png)