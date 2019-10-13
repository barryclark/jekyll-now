---
layout: post
title: "PauSiber Vulnourblog WRITEUP"
tags: [writeup]
subtitle: "PauSiber Vulnourblog WRITEUP"
---

***Hazırlayan: [Alp Eren Işık](https://twitter.com/isik_erenalp)***

***

[PauSiber](https://pausiber.xyz) tarafından hazırlanan **Vulnerable Blog Application** için öncelikli olarak ekip arkadaşlarıma teşekkür ederim. İçerisinde [OWASP](https://www.owasp.org) tarafından kabul görmüş popüler web zafiyetleri yer almaktadır. Dilerseniz yazıyı okumadan önce [BURAYA](https://github.com/PauSiber/vulnourblog) tıklayarak sizlerde bu zafiyetli web uygulamasını kurcalayabilirsiniz.

***

# `Reflected XSS`
Search kısmında **Reflected XSS** olabileceğini düşündüğümden kontrol etmeye karar verdim.


![xss](/images/vulnourblog/reflected-xss-1.png)


Öncelikli olarak sayfa kaynağını görüntüleyerek XSS arayacağımız input kısmında herhangi bir kontrol olup olmadığına bakacağım.


![xss](/images/vulnourblog/reflected-xss-2.png)

Gördüğünüz gibi gönderdiğimiz değer **s_result.php**'ye gidiyor. Sayfamız açık kaynak kodlu olduğu için daha hızlı sonuç alacağımı düşünerek s_result.php'nin kaynak koduna bakmaya karar verdim.

![xss](/images/vulnourblog/reflected-xss-3.png)

Kaynak kodda gördüğüm **searchPageDom($_GET["key"])** dikkatimi çekti. **s_result.php** içerisinde böyle bir özellik olmadığı için **header.php**'ye bakmaya karar verdim ve dikkatimi **settings.php ile functions.php** çekti. Aradığım fonksiyonun **functions.php**'de olma olasılığı yüksek olduğundan hemen **functions.php**'nin kaynak koduna bakmaya başladım.

![xss](/images/vulnourblog/reflected-xss-4.png)

Ve sonuç olarak engellenmiş olan kelimeleri bulduk. Artık buna göre payloadımızı hazırlayabiliriz.

    <object data=data:text/html;base64,PHN2Zy9vbmxvYWQ9YWxlcnQoMik+></object>   

![xss](/images/vulnourblog/reflected-xss-5.png)

![xss](/images/vulnourblog/base64.png)


# `Stored XSS`

Hazır XSS ile başlamışken bir de yazıların altında bulunan yorum bölümünde **Stored XSS** var mı diye kontrol edelim.

![xss](/images/vulnourblog/stored-xss-1.png)

Form yapısında kontrol var mı diye kontrol ediyorum. İlk başta **id="comment"** dikkatimi çekiyor. Daha sonra kaynak kodun altında yer alan **js/post.js** dosyası dikkatimi çekiyor ve kontrol işlemini yapan özelliğin bu dosyada olduğunu düşünerek açıp incelemeye karar veriyorum.

![xss](/images/vulnourblog/stored-xss-2.png)

Ve bingo! Gördüğünüz gibi bir blacklist oluşturulmuş. Artık hangi ifadelerin engelli olduğunu bildiğimize göre uygun payloadımızı hazırlayabiliriz.

    <object data=data:text/html;base64,PHN2Zy9vbmxvYWQ9YWxlcnQoIlBhdVNpYmVyIik+></object>   

![xss](/images/vulnourblog/stored-xss-3.png)

![xss](/images/vulnourblog/stored-xss-4.png)


# `SQL Injection`
Kategorilere ait yazıların listelendiği bölümde **sql injection** olabileceğini düşünerek bi tırnak attım ve sayfa gitti :). Devamında **order by** ile 7 adet kolonumuz olduğunu öğreniyoruz.

![sql_injection](/images/vulnourblog/sqli-1.png)

Daha sonra **union select 1,2,3,4,5,6,7** yazarak ekrana hangi sayıları bastığını göreceğiz.

![sql_injection](/images/vulnourblog/sqli-2.png)

Gördüğünüz gibi 3 ve 4'ü ekrana bastı. Artık sorgumuzda 3. veya 4. kolonun olduğu kısımları kullanarak ilgili dataları çekebiliriz.

![sql_injection](/images/vulnourblog/sqli-3.png)

Öncelikli olarak veritabanı adını öğrendik. Daha sonra tablo isimlerini çekeceğiz. Burada **table_schema=database()** yerine **table_schema="cypwn_vulnourblog"** da yazabilirsiniz.

    http://localhost/vulnourblog/category.php?id=3 union select 1,2,table_name,4,5,6,7 from information_schema.tables where table_schema="cypwn_vulnourblog"

![sql_injection](/images/vulnourblog/sqli-4.png)

Şimdi tablo isimlerini öğrendiğimize göre ilgili tablonun kolon isimlerini öğrenebiliriz. Burada bizim için önemli olan **user** tablosudur.

    http://localhost/vulnourblog/category.php?id=3 union select 1,2,column_name,4,5,6,7 from information_schema.columns where table_name="users"

![sql_injection](/images/vulnourblog/sqli-5.png)

Şimdi bizim için önemli olan **username** ve **password** bilgilerini çekeceğiz.

    http://localhost/vulnourblog/category.php?id=3 union select 1,2,group_concat(username,0x3a,password),4,5,6,7 from users

![sql_injection](/images/vulnourblog/sqli-6.png)

Evet gördüğünüz gibi admin bilgilerini çekmiş olduk. **http://localhost/vulnourblog/admin/login/** adresine giderek giriş yapabilirsiniz.

Kaynak Kod :

![sql_injection](/images/vulnourblog/sqli-7.png)

 Ayrıca sizlere yardımcı olması açısından ufak ipuçlarını da kaynak kodlarda görebilirsiniz :)

 Bunun dışında **post.php**'de de **sql injection** zafiyeti bulunmaktadır.

![sql_injection](/images/vulnourblog/sqli-8.png)


    http://localhost/vulnourblog/post.php?id=3 or true


![sql_injection](/images/vulnourblog/sqli-9.png)


    http://localhost/vulnourblog/post.php?id=3 union select 1,2,3,group_concat(username,0x3a,password),5,6 from users


![sql_injection](/images/vulnourblog/sqli-10.png)


Kaynak Kod :


![sql_injection](/images/vulnourblog/sqli-11.png)


Son olarak admin panelinde yer alan yorum silme bölümünde de **sql injection** zafiyeti bulunmaktadır.

Kaynak Kod :


![sql_injection](/images/vulnourblog/sqli-12.png)


# `Admin Login`

Öncelikli olarak **sql injection** zafiyetinde görmüş olduğumuz gibi adminin **kullanıcı adı ve parolasının** tahmin edilmesi çok kolay. Bu yüzden basit bir brute force saldırısı ile admin paneline giriş yapabiliriz.

Diğer yolu ise öncelikli olarak tarayıcımıza cookie yönetimi yapabileceğimiz bir eklenti kurmaktan geçiyor. Daha sonra **http://localhost/vulnourblog/admin/login/** adresine gidip bu eklentimiz ile cookie değerimizi kontrol ediyoruz.  **isadmin** yazısını ve bize atamış olduğu cookie değerini **cfcd208495d565ef66e7dff9f98764da** olarak göreceksiniz. Bu değeri **MD5** ile decrypt(şifre çözme) ederseniz değerin 0 geldiğini göreceksiniz. O halde **Md5(1) = c4ca4238a0b923820dcc509a6f75849b** değerini cookie değeri olarak almayı deneyelim :).

![cookie](/images/vulnourblog/cookie.jpg)

Daha sonra **http://localhost/vulnourblog/admin/** URL'ine gittiğimizde admin olarak giriş yapmış olacağız.

![cookie](/images/vulnourblog/admin.png)

Kaynak Kod :

![cookie](/images/vulnourblog/cookie-3.png)


![cookie](/images/vulnourblog/cookie-2.png)


# `File Upload`

Admin panelinde yazı ekleme bölümünde **File Upload** zafiyeti var. Yaklaşık 1,5 sene önce bu siteyle ilk uğraştığım zamanlarda içeriye güzel bir shell atıp veritabanındaki bütün verileri silmiştim. Ancak şuan bazı teknik aksaklıklardan dolayı bu kısmı gösteremiyeceğim. Zafiyetli kod aşşağıda yer almaktadır. Temel mantığı **DVWA File Upload – Medium Level** ile aynıdır.

[Zafiyetli Kod](https://github.com/PauSiber/vulnourblog/blob/master/admin/yaziekle.php)

# `Local File Inclusion (LFI)`

Admin panelinde gezinirken aklıma acaba burda **lfi** var mıdır sorusu geldi ve sonuç.

    http://localhost/vulnourblog/admin/index.php?page=/etc/passwd

![lfi](/images/vulnourblog/lfi.png)
