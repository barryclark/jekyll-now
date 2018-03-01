---
layout: post
title: "Rotor Machine - Enigma Machine"
excerpt: "Rotor makineleri ve Enigma rotor makinesinin özellikleri, çalışma prensibi"
date: 2017-06-20 04:00:00
comments: true
categories: [Kriptoloji]
tags: [Enigma, Rotor, Machine, Tu]
---

**<font color="red" size="5"> Rotor Machine (Rotasyonel Şifreleme Makinesi)</font>**

Sezar şifrelemesinden sonra popüler olmuş bir şifreleme yöntemidir. Mantık birkaç rotorun bir araya getirilmesiyle birlikte şifrelemenin dinamik olarak değiştirilebilmesidir. Örnek olarak ilk harfler bir şifreleme çeşidi, ikinci harfler başka bir şifreleme çeşidi, üçüncü harfler ise başka bir şifreleme çeşidiyle şifrelenebilir. Bu makinelerin en popüler örneği Almanya’nın II. Dünya Savaşı sırasında kullandığı “Enigma Makinesi” dir.

<img src="{{ site.url }}/img/rotor-enigma/rotor.jpg" alt="{{ page.title }}">

>Rotor makinesi

**<font color="red" size="5"> Enigma Machine (Enigma Makinesi)</font>**

İlk olarak Birinci Dünya Savaşının sonlarında Alman Mühendis Arthur Scherbius tarafından keşfedilmiştir. Üretilen bu model ve varyasyonları 1920’lerin başlarında ticari amaçlı kullanılmış, ardından en dikkat çekeni II. Dünya Savaşı sırasında Nazi Almanya’sı tarafından gizli mesajların şifrelenmesi ve tekrar çözülmesi amacı ile kullanılan bir şifre makinesidir. Daha açık bir ifade ile Rotor makineleri ailesi ile ilişkili bir Elektro-Mekanik aygıttır. Birçok değişik türü vardır. Alman ordusunun kullandığı en çok Wehrmacht Enigma modeliydi.

<img src="{{ site.url }}/img/rotor-enigma/Enigma_alphabet.jpg" alt="{{ page.title }}">

Enigma makinesi fonksiyonel olarak üç bölümden oluşur.

1.	Rotor
2.	Reflektör
3.	Fiş paneli

**<font color="#2c3e50" size="3">Rotor</font>**

Kronometrede olduğu gibi en düşük değerlikli yani en sağdaki rotor İngiliz alfabesine göre 26 harfte bir (1/26) oranında dönüş gerçekleştirir. Bu rotorun 1 tam turunu tamamlamasından sonra daha yüksek değerlikli rotor 1/26 oranında dönmeye başlar.

<img src="{{ site.url }}/img/rotor-enigma/Enigma_rotor_set.png" alt="{{ page.title }}">

Makine böylece 26<SUP>3</SUP> farklı şifreleme yapabilmektedir. Gözden kaçırılmaması gereken bir konu rotorların çıkarılıp yerlerinin değiştirebileceğidir. Bu da şifreleme de 3! kadar yani 6 kat bir güçlendirme söz konusudur.

**<font color="#2c3e50" size="3">Reflektör</font>**

Şifreleme boyunca konumu sabit kalır. Şifrelerin birbirinin simetriği olması amacını güder.

<img src="{{ site.url }}/img/rotor-enigma/yansıtıcı.jpg" alt="{{ page.title }}">

Örneğin rotorlar herhangi bir klm konumundayken şifrelenmiş B harfi D çıktısını üretirken rotorlar yine klm konumundayken şifrelenmiş D harfi B çıktısını üretir.

**<font color="#2c3e50" size="3">Fiş Paneli</font>**

En basit şekilde klavyeden girilen metni rotorlar vasıtasıyla şifrelemeye sokmadan önce en ilkel şifreleme yöntemlerinden olan Substitution Cipher’a (Yerine Koyma Şifrelemesi) sokma işlemidir.

<img src="{{ site.url }}/img/rotor-enigma/enigma_mantık.jpg" alt="{{ page.title }}">

Bu karmaşık mekanizma yüzünden Enigma şifrelerini kırabilmek için aşağıdaki verilere sahip olmak gerekmektedir:

**<font color="#2980b9" size="3">Makinanın mantıksal yapısı (sabit)</font>**

- Klavye ile mekanizma arasındaki kablolama
- Her rotorun kablolama yapısı
- Rotordaki sıra belirleyen çentiklerin adeti ve yerleri
- Rotor sonlarındaki yansıtıcının kablolaması

**<font color="#2980b9" size="3">İç ayarlar (seyrek değişir)</font>**

- Kullanımda olan rotorlar ve rotor konumları
- Rotorun içindeki alfabenin konumu

**<font color="#2980b9" size="3">Dış ayarlar (değişken)</font>**

- Ön pano bağlantıları
- Mesajın başındaki rotor konumları

**<font color="#212121" size="2">Kaynaklar</font>**

<p><font size="2">
1. Rotor Makinesi<a href="https://tr.wikipedia.org/wiki/Rotor_makinesi">   https://tr.wikipedia.org/wiki/Rotor_makinesi</a>
</font></p>
<p><font size="2">
2. Enigma Makinesi<a href="https://tr.wikipedia.org/wiki/Enigma_makinesi">   https://tr.wikipedia.org/wiki/Enigma_makinesi</a>
</font></p>
<p><font size="2">
3. Enigma Makinesi<a href="http://bilgisayarkavramlari.sadievrenseker.com/2009/12/02/enigma-makinesi-enigma-machine/">    http://bilgisayarkavramlari.sadievrenseker.com/2009/12/02/enigma-makinesi-enigma-machine/</a>
</font></p>

***İYİ GÜNLER***
