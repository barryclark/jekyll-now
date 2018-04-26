---
layout: post
title: "Parola Kırma Saldırıları"
subtitle: "Genel olarak brute force'un ne olduğunu açıklayan bir anlatım."
---

***Yazan: [boratanrikulu](https://github.com/boratanrikulu)***

**Kaynaklar**  
[erdemoflaz.com/sifre-ve-parola-arasindaki-farklar](https://erdemoflaz.com/sifre-ve-parola-arasindaki-farklar/)  
[openwall.com/john/doc/examples](http://www.openwall.com/john/doc/EXAMPLES.shtml)  
[null-byte.wonderhowto.com/how-to/crunch](https://null-byte.wonderhowto.com/how-to/hack-like-pro-crack-passwords-part-4-creating-custom-wordlist-with-crunch-0156817/)

---

## Parola Nedir ?

Okunduğunda anlam ifade eden, kişinin kendinin de bildiği, kendinin seçip kullandığı kelimelerdir.  
**Örneğin:** 123456, password, qwerty gibi kelimeler buna örnek verilebilir. 

## Şifre Nedir ?
Normal olarak okunduğunda bir anlam ifade etmeyen, çeşitli algoritmalar ile oluşturulup geri dönüştürülebilir veya geri dönüştürülemez hallerde kullanıldığı metinlerdir.  
**Örneğin:** sha-1, md5, base64, md4, rsa, idea gibi algoritmalar şifrelemede sıklıkla kullanılan çeşitlerdir.

Kısaca **“senin bildiğin parola, sistemin bildiği şifredir”** diyebiliriz.

## Crunch ile Wordlist Oluşturmak

- Wordlist oluşturmak amacıyla kullanılan bir tool'dur.

	Genel yapısı :

	```
		crunch <min> <max> [options]
	```

	Aşağıdaki gibi bir yapı ile, 8 karakterli rakamlardan oluşan tüm kombinasyonları elde etmiş olursunuz.

	```
		crunch 8 8 0123456789 -o numeric-wordlist.lst
	```

- Hazır charset kullanımı için **-f** parametresi kullanılır.
	
	![hazir-charset](/images/parola-kirma-saldirilari/1.png)  
	![hazir-charset](/images/parola-kirma-saldirilari/2.png)

- Çıktıların nasıl olacağını belirlemek için **-t** (pattern) parametresi kullanılır.
	
	![pattern](/images/parola-kirma-saldirilari/3.png)

- Kelime bazında kullanmak için **-p** parametresi kullanılır.

	![kelimeile](/images/parola-kirma-saldirilari/4.png)

## CUPP ile Wordlist oluşturmak

- Kişilere özel olarak wordlist oluşturmayı kolaylaştıran bir tool'dur. [github.com/mebus/cupp](https://github.com/Mebus/cupp)
	
	![cupp](/images/parola-kirma-saldirilari/5.png)  
	![cupp](/images/parola-kirma-saldirilari/6.png)  
	![cupp](/images/parola-kirma-saldirilari/7.png)

## Hazır Wordlist'ler

- Internet üzerinde dolaşmakta olan bir çok hazır wordlist var. Bunlar kullanılabilir. Ama hedefe yönelik bilgi sahibi iseniz, özelleştirilmiş wordlist hazırlamak en iyi seçenektir.

	Bu repo'da bir çok hazır wordlist bulunmakta : [github.com/danielmiessler/SecLists](https://github.com/danielmiessler/SecLists/tree/master/Passwords)  

	![hazir-wordlist](/images/parola-kirma-saldirilari/8.png)

## John the Ripper ile Hash'leri Kırmak

- Oldukça popüler olan bu uygulama ile bir çok şifre kırılabilir. Bir çok şifreleme türünü desteklemektedir.

	Örneğin Exploit anlatımında kevgir cihazında yetki yükseltme ile root'a kadar çıkmıştık. Ama root'un parolasını hala bilmiyorduk. John the Ripper ile (eğer şanslı isek) kullanıcının şifresini kırabilir. Tek ihtiyacımız olan parolanın hash'leniş hali yani şifresi.

	Linux sistemlerde her kullanıcının parolası, hash'lenmiş olarak **/etc/shadow** dosyasında tutulur.

	Aşağıdaki örnekte kendi sistemimdeki root kullanıcısın parolasını John the Ripper ile örnek olarak kırdım. (tabiki şifresi 12345678 değildi, örnek olması açısından değiştirdim.)

	![john-the-ripper](/images/parola-kirma-saldirilari/9.png)

	Aynı mantıkla Windows sistemdeki kullanıcıların da şifreleri kırılabilir. Bunun için **C:\Windows\System32\config** alında bulunan **SYSTEM** ve **SAM** dosyalarına ihtiyacınız olacak. Bu dosyaları bir şekilde aldıktan sonra **pwdump** isimli programı kullarak hash'leri alabilirsiniz.  

	```
		pwdump <system hive> <SAM hive>
	```

- Eğer hash türünde olmayan bir dosyayı kırmak istiyorsanız, örneğin bir zip dosyasını, öncelikle onu John the Ripper'ın kırabileceği bir formata dönüştürmelisiniz. Bunun için **zip2john** kullanılabilir.

	![crack-zip](/images/parola-kirma-saldirilari/10.png)

- MD5 algoritması ile hazırlanmış bir hash aşağıdaki gibi kırılabilir.
	
	![md5](/images/parola-kirma-saldirilari/11.png)

## Medusa ve Hydra Kullanımı

2 servisin genel olarak kullanımı aşağıdaki gibidir:

- **Medusa:**

	```
		Medusa -h [host-ip] [-u username] [-P file] -M [service]
	```

- **Hydra:**

	```
		hydra [-l username] [-P file] [host-ip] [service]
	```

SSH servisi üzerinde testler yaparken kullanılabilecek güzel bir Wordlist [github.com/jeanphorn/wordlist](https://github.com/jeanphorn/wordlist/blob/master/ssh_passwd.txt)

![ssh-brute-force](/images/parola-kirma-saldirilari/12.png)

## Metasploit ile Brute Force

- Brute Force için metasploit kullanılabilir. 

	```
		search auxiliary/scanner/
	```

- SSH için metasploit ile brute force yapmak

	![ssh-metasploit](/images/parola-kirma-saldirilari/13.png)