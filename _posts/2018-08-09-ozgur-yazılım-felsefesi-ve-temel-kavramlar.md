---
layout: post
title: "Özgür Yazılım Felsefesi ve Temel Kavramlar"
subtitle: "Özgür yazılım felsefesine giriş yazısıdır."
---
***Yazan: [hasantezcan](https://github.com/hasantezcan)***
---

## Yazılımın özgürlüğü kavramı

### **Özgür Yazılım Nedir ?**

- “Özgür yazılım” bir özgürlük meselesidir, fiyat değil.
Bu slogan ingilizcede *free* sözcüğünün hem ücretsiz hem de özgür manasına gelmesinden ortaya çıkıyor.
```
To understand the concept, you should think of “free” as in “free speech,” not as in “free beer”
```

- Özgür yazılım insanları öğrenmeye, öğrendiklerini öğretmeye, kısıtlı ömrümüzde kazandığımız bilgileri gelecek nesillere bilgi birikimi olrak bırakmaya, bir defa yapılmış bir şeyin yapımı için gereken tekniği tekrar tekrar bulunmasına gerek bırakmamamya teşvik eder.

  Kısacası Özgür Yazılım **tüm insanlığa** hizmet eder, yanlızca bir grup insanın **cebine** değil.

### **Bir Yazılım Nasıl Özgür Yazılım Olur?**

Bir yazılımın özgür olması için yerine getirmesi gereken 4 kriter vardır.

0. **Çalıştırılabilirlik:** Bir yazılım istendiği şekilde ve doğrultuda çalıştırılabilir.

1. **Değiştirilebilirlik:** Herhangi bir yazlım istendiği amaç doğrultusunuda değiştirilebilir. İstediğimiz şekilde ekleme çıkarma yapılabilinir.*(Yazılımın kaynak koduna erişim (open source) bunun için bir önşarttır.)*

2. **Dağıtılabilirlik:**  Yazılım herhangi biri tarafından tekrardan dağıtılabilir, toplulukla bunu paylaşabilir.

3. **Değiştirip Dağıtılabilirlik:** Bir yazılımı istediğimiz gibi çalıştırıp, değiştirdiğimiz gibi o yazılımı istediğimiz doğrultuda değiştirip ve geliştirip bu haliyle yeniden dağıtabiliriz.

Tüm bu şartları yerine getirebilen her yazılım **özgürdür.**

### **Özgür Yazılımın Açık Kaynak'dan Farkı ?**

    "Özgürlük tamamen politik bir kavramdır."

    "Açık kaynak ise tamamen teknk bir kavramdır."

Tüm özgür yazılımlar açık kaynak kodludur. Fakat açık kaynak kodlu her yazılım özgür değildir.

Mesela buna örnek Libre Office Özgür bir yazılımdır ve ayrıca açık kaynak kodludur.
Öte yandan açık kaynak olup özgür olmayan programlar da  vardır.

Burda aslında işin içine lisanlar girmeye başlıyor. İlerleyen kısımlarda bunlarada değineceğim.

Özgür olmayan yazılımlara da **özel mülk yazılım** adı verilir.

### **Yazılım lisansları:**

Her yazılımıın bir lisansı vardır. Lisanslar yazılımları hukuki açıdan güvenceye alırlar.

Yazılımların özgür olup olmadığını gösteren de yine lisanslarıdır.

Bir çok lisans vardır Bunlar özgür yazılım lisanları da olabilir özel mülk lisanları da olabilir.

Özgür Yazılım Lisanslarına örnekler:

1. **GPL (General Public Licence) - Genel Kamu Lisansı:**

  GNU GPL lisans anlaşması, 1983 yılında Richard Stallman tarafından geliştirilmiş, çok akıllıca detaylarla bağlayıcılığı bulunan, teşvik edici, gerek kullanıcı gerekse üretici tarafa büyük olanaklar sağlayan bir lisans türüdür.

  GPL'in en çok üzerinde durduğu konu yazılımların kaynak kodu ile birlikte dağıtılmasının gerekliliğidir. Üretici firma yazılımını ikili dosya şeklinde (binary) dağıtsa bile kaynak kodunu herkes tarafından erişilebilir bir yere bırakmak zorundadır.

  Bu lisansın güncel sürümü (GPL s3), Özgür Yazılım Vakfı tarafından 29 Haziran 2007'de yayınlandı

  GPL ile lisanslanmış bir yazılım ömrünün sonuna kadar GPL ile kalmalıdır.

  Ayrıca bu lisansın adını bir yerlere yazarken dikkatli olun çünkü çokca "GPL lisansı"" yazmanız muhtemel. General Public Licence Lisansı pekde doğru olmuyor :D...

2. **MIT Lisansı**

  MIT Lisansı, 1988 yılında Massachusetts Teknoloji Enstitüsü tarafından hazırlanmış, en yaygın kullanılan özgür yazılım lisanslarından biridir.

3. **WTFPL (Do What The Fuck You Want To Public License)**

  Bu lisansın tek şartı istediğin her şeyi yapabilmenizdir. :D

**Bunların dışında Tescilli Yazılım Lisansları(Proprietary software licenses) da vardır.**

![Software_Categories_expanded](/images/ozgur-yazılım-felsefesi-ve-temel-kavramlar/Software_Categories_expanded.svg)


### **Bir yazılımım var ve buna GPL almak istiyorum. Nereye başvuracağım?**

- Lisans denince akla programımızın noter gibi bir yerden tastik edilmesi gerekmez mi gibi bir fikrin gelmesi gayet normal fakat GPL böyle bi şey değil.
Gitlabda ya da githubda paylaşmış olduğunuz kodun yanına bir **LICENSE.md** oluşturun ve içine hangi özgür lisans ile lisanslamak isterseniz onun dökümanını kopyalayın. Ve bu kadar, artık yazılımınız ***lisanslı bir yazılım.***


### **Özgür Yazılım mı? Özel Mülk Yazılım mı?**

- Bu fark tamamen bir güvence meselesi. Eğer kulandığınız yazılımları özgür yazılımlardan seçerseniz; kimin kim olduğu belli koca bir toplluğa güvenmiş olursunuz. fakat özel mülk yazılım kullanımında kullanığınız yazılımların parasını vererek de kulansanız sizin verilerinizin güvenliği o markanını insafına kalıyor hiç bilmediğiniz bir kapının arkasındaki hiç tanınadığınız mühendislere güvenmiş oluyorsunuz. Tabiki bu her özel mülk sizin verilerinize kötü davranıcak demek değil. Ama özel mülkiyet anlayışında işler şeffas olmadığı için bunu hiç bir şekilde bilemiyoruz. Güvenmek ya da güvenmemek tamamen sizin elinizde.


### **Özgür Yazılımlardan nasıl para kazanılır? Özgür Yazılım Satılabilir mi?**

- Özgür yazılımlar her nekadar ücretsizmişler gibi görünseler de yazılımlarınözgürlüğü gereği satılması da serbestdir. Yani bir özgür yazılım ***benim fiyatım 300$*** diyerek piyasaya çıkabilir fakat değiştirilip dağıtılması da serbest olduğu için bir başka B kişisi bu yazılımın sadece adını değiştirip ***"buyurun ben bedeva sunuyorum"*** diyebilir. Yani para kazanmak mümkün olsa da yazılımı ücretsiz kulanmak seçeneği hep mevcut. Hal böyle  olunca çoğunluk yazılımını ücretsiz olarak sunuyor.

  Eee Paraya ne oldu ?!... Parayı da bu yazılımın yanında sunduğu destekle kazanıyorlar. Bu destek kimi zaman bir eğtim gibi kimi zaman da bütün bir sistemin yönetimini yazılım sahiplerine vererek oluyor.

### **Özgür Yazılım Çalınabilir mi?**

- Evet.

  Ama nasıl olur? İstediğimiz gibi kullanamıyor muyduk? Bu çalmak sayılır mı?

  İstediğiniz gibi kulanmakta her zaman özgürsünüz fakat şöyle bir durum var eğer bir projede bir başka özgür yazılımdan yararlanmış onu kendi kod bünyenize katmışsanız sizin de oluştuduğunuz yazılımı başka bir kişi alıp direk olarak kendi projesinde kulanabilir, kullanabilmeli. Yani siz bu son projenizi Özel Mülk bir yazılım olarak kulanamazsınız. Bunu yapmanız takdirinde bir özgür yazılımı çalmış olursunuz.

- Peki bunu nerden bulacaklar ben yazılımımı açık kaynak olarak paylaşmayacağım.

  Tek uyanık siz değilsiniz.. :D Çaldığınız yazılımın içinde geliştiricisi tarafından muhtemelen gizlenmiş denetleme yöntemleri var. Herhangi bir şüphe dahilinde sizin programınıza önceden çıktısı bilinen değerler verilerek sizin bu yazılımı çalıntı yollarla kodlanığınız açığa çıkacaktır.

### **GNU ve Richard Stallman**

- Özgür yazılımın **ilk adımını** Richard Stallman atmıştır ve özgür yazılımın bugünlere gelmesinde kilt rolü oynayan kişi olmuştur.

  Linux'un yaratıcısı olan **Linus Torvalds**, *"Yanlızca eğlenmek için"* isimli kitabında, **Richard Matthew Stallman'dan, (kısaca RMS)** özgür yazılımın *tanrısı* olarak bahseder.

  İlk defa yazılımların özgür olması gerektiğini ortaya koymuş ve bunu eyleme dökmüştür.
Herkesin kapalı kaynak kod yazdığı ve açık kaynak kod yazmaya bir idailistlikten ziyade ahmaklık olarak bakıldığı vakitlerde özgür yazılım fikrini insanlara anlatıyor ve insanlara bu fikri aşılamaya çalışıyordu.

  Free Software Foundation (FSF) isimli özgür yazılım derneğini kurmuş ve **GNU Projesini başlatmıştır.**

  **GNU Manifestosu(Bildirisi)** o zamana kadar söylenenlerden çok farklı şeylerden bahsediyordu. Richard Stallman, önce GNU'nun ne olduğunu açıklayan bir giriş yaptı. GNU'nun açılımı nedir sorusuna **(What is GNU?)**; GNU, Unix değildir **(GNU's Not Unix!)** diye basit bir cevap verdi.

  İngilizce bir kelime olan GNU, **öküz başlı antilop demektir.** GNU'nun logosu da, bu Afrika antilobundan gelmektedir. Richard Stallman'sa, GNU'yu rekürsif (yinelemeli - tekrarlamalı) şekilde, **GNU's Not Unix!** şeklinde açıklamıştır.

![Richard-Stallman](/images/ozgur-yazılım-felsefesi-ve-temel-kavramlar/Richard-Stallman.jpg)

- GNU projesi, Unix'e benzer ama Unix olmayan açık kaynak bir işletim sistemi geliştirme amacındaydı. Buna göre, Unix programlarını çalıştırmakla beraber daha fazlasını yapacak bir sistem oluşturulacaktı. Proje çok kısa sürede, açık kaynak dağıtılan yüzlerce programı içerir hâle geldi. Zaman içinde bu rakam binlerce projeye ulaştı. **GNU/Linux'de** bu projelerden biridir.

- Richard Stallman, özgür yazılım çalışmalarına daha rahat devam edebilmek için MIT'deki görevinden istifa etti. Kendini sadece açık kaynak kodlu çalışmalara verdi.

- Şu an hâlâ FSF'nin başkanı olarak görev yapmaktadır. Herhangi bir yerden aldığı bir maaşı yoktur. Kendi adına evi, arabası ve hatta cep telefonu da bulunmamaktadır. Geçimini, yaptığı konuşmalar ve aldığı ödüllerle sağlamaktadır.

Richard Stallman'ın kişisel sitesi : [http://www.stallman.org](http://www.stallman.org)


### **Linux Dağıtımları**

- Dağıtım kavramı, özgür yazılım felsefesinin çok alternatifli dünyasının bir sonucu olarak ortaya çıkmış, Linux'a özgü bir terimdir.

  Yaygınlıkları ve GNU/Linux dünyasına katkılarıyla öne çıkan bazı dağıtımlar vardır: Debian, Ubuntu, Red Hat, Fedora, Linux Mint, openSUSE bunlardan birkaçıdır.

  Dağıtımlar kullanım amaçlarına göre şekillenir ve bu yönde geliştirilirler.

  Örneğin siber güvenlik alanıyla ilgilenen kullanıcıların "parrot" ya da "Kali Linux" dağıtımlarını tercih etmesinin en temel sebebi budur.

  ![linux-distros](/images/ozgur-yazılım-felsefesi-ve-temel-kavramlar/linux-distros.png)

  Siz de ilgi alanınıza göre şekillenmiş bir dağıtımı ya da gündelik yaşam için hazırlanmış bir daüıtımı bilgisayarınıza kurarak kullanabilirsiniz.

  Ayrıca bazı dağıtımlar ücretli olabilir "RHEL" dağıtımı ücretli bir dağıtımdır ve şirketlere servis sağladığı için şirketler bu dağıtımı REDHAT şirketinin destek hizmeti ile birlikte satın alırlar. Fakat bu dağıtımda özgür yazılım olduğundan "CentOs" dağıtımı birebir "RHEL" dağıtımını alıp sadece ismini ve logosunu değiştirip ücretsiz şekilde dağıtmıştır. Ama buna rağmen hizmet çok önemli bir faktör olduğundan şirketler RHEL'i tercih etmekdedirler.


###  **İşletim Sistemi ve Çekirdek**


|KERNEL| OPERATING SYSTEM|
|------|----------------|
|LINUX | GNU            |
|DARVIN| MACOS          |



### **Özgür yazılım hareketinin yazılım dışındaki etkileri...**

1. Wikipedia'yı ortaya çıkartmıştır. - özgür bilgi
2. Raspberry pi - özgür donanım tasarımı
  >>özgür donanım değil çünkü donanım tekildir ve paylaşılamaz


3. Free beer :D
4. Creative Commons
5. Özgür kitaplar
6. Free software free society

![wikipedia](/images/ozgur-yazılım-felsefesi-ve-temel-kavramlar/wikipedia.jpg)

### **Özgür yazılım bir gerekliliktir! ve Özgür yazılımı niçin tercih etmeliyiz?**

- Çünkü sizin haklarınızı engellemez. Hukiki kurnazlıklarala hazırlanmış yasal dayatmalarla, sizleri 24 saat izleyip, özel hayatınıza müdahele etmez. Arka planda ne olduğunu bilirsiniz. Sizden gizli bir şeyler yapıp, sizin özel bilgilerinizi çalmaz. Çünkü herşey şeffaftır.

- Kullanıcının/geliştiricinin haklarını ve mahremiyetini korur, yardımlaşmaya ve gelişime destek olur.

- Özgür yazılımı dilediğiniz gibi paylaşabilirsiniz. Dilediğiniz değişikliği yapıp, kendinize uygun şekle de sokmanız mümkündür.

- Özgür yazılım felsefesi, uygulamaların kullanıcılarına ve diğer geliştiricilere esneklik sağlar. Yazılıma müdahele etme şansınız mevcuttur, ekle/çıkar/değiştir yapabilirsiniz.

- Bilgi birikiminin artmasını sağlar

- Paket depoları bakımından oldukca zengın, kolay kullanılabilir olmasıyla birlikte kullanıcının istekleri doğrultusunda hareket eder.

- Üretkenliği arttırır
- Sizi bir şeyler geliştrimeden önce tonlarca para ödemeye zorlamaz. Tüm çalışma ortamınızı ücretsiz bir şekilde size sunar.


---
**> Kaynakça**

- ***Özgür Yazılım Yaz Kampı eğitmeni - [Dora Uzunsoy](https://twitter.com/dorauzunsoy)***

- ***Özgür Yazılım Felsefesine Giriş - [Çağatay Cebi](http://www.cagataycebi.com/free_articles/freedom/freedom_brief.html)***

- ***Özgür yazılım bir gerekliliktir! - [arguman.org](http://tr.arguman.org/ozgur-yazilim-bir-gerekliliktir?view=list)***

- ***Özgür Yazılım Tanım - [gnu.org](https://www.gnu.org/philosophy/free-sw.tr.html)***
