---
layout: post
title: "Sniffing İşlemi"
subtitle: "sniffing'in ne olduğunu wireshark ve tcpdump üzerinden açıklar."
---

***Yazan: [boratanrikulu](https://github.com/boratanrikulu)***

**Kaynaklar**  
[kevsersrca.github.io/blog/security/tcpdump/](https://kevsersrca.github.io/blog//security/tcpdump/)  
[wiki.wireshark.org/CaptureFilters](https://wiki.wireshark.org/CaptureFilters)  
[wiki.wireshark.org/DisplayFilters](https://wiki.wireshark.org/DisplayFilters)  
[guru99.com/wireshark-passwords-sniffer](https://www.guru99.com/wireshark-passwords-sniffer.html)

---

## Sniffing Nedir ?

Bilgisayarlar network'lerde paket yayınlayarak iletişim kurarlar. Bu işlem için IP kullanılır ve paket network'ün türüne göre tüm ağı dolaşabilir. Paket geçtiği yollarda okunabilir yani pakete sniffing işlemi yapılabilir.
	
Basit bir şekilde söylemek gerekirse Sniffing yani *koklama* network'te akan paketlerin tek tek incelenmesidir. Paketler değiştirilmeden direkt olarak okunabilir. Paketleri yakalamak için bir çok sniffing tool'u mevcuttur. (WireShark bunlar arasında en popüleridir.)

Network'te akan paketleri sniffing işlemi ile (şifrelenmiş değil ise) parolalar gibi hassas veriler elde edilebilir.

### Sniffing Türleri

İki tane sniffing türü var;
* Pasif Sniffing  
* Aktif Sniffing

Sniffing türleri anlamak için network'leri oluştururken kullanılan iki temel cihaz olan **hub** ve **switch** hakkında bilgi sahibi olmamız gerekir.

#### Hub
Hub'lar yayımlanan paketleri tüm network'teki port'lara yollayarak çalışır. Eğer hedef bilgisayar network'te bulunuyorsa paketi alır ve cevaplar.  Hub'daki tüm cihazlar paketi görebilir.

Aşağıdaki örnekte hedefimiz sadece Bilgisayar C ama network'teki tüm cihazlar paketi okuyabilir.
<p align="center"> 
<img src="/images/sniffing-islemi/7.png">
</p>

#### Switch
Switch'ler yollanılan paketi IP ve MAC adresine göre yönlendirir. Network'te sadece hedef sistem paketi okuyabilir.

Aşağıdaki örnekte hedefimiz sadece Bilgisayar C ve network'te sadece Bilgisayar C paketi okuyabilir.  
<p align="center"> 
<img src="/images/sniffing-islemi/8.png">
</p>

#### Pasif Sniffing  
Hub'da yayımlanan paketlere uygulanan sniffing işlemi türüdür. Pasif Sniffing olarak isimlendirilmesinin nedeni yapılması kolay tespiti zor olmasıdır.

#### Aktif Sniffing  
Switch'te yayımlanan paketlere uygulanan sniffing işlemi türüdür. Aktif Sniffing olarak isimlendirilmesinin nedeni yapılmasının zor olmasıdır. Switch ile bağlanan network'lerde sniffing işlemi için ARP Poisoning ve Mac Flooding uygulanmalıdır. Bu sayede Hub'mış gibi davranması sağlanabilir.  

## WireShark Nedir ? Nasıl Kullanılır ?

WireShark açık kaynak bir paket analiz tool'udur.

- 750'nin üzerinde protokolü analiz edebilir
- Paketleri yakalayıp bir dosyaya kaydedebilir
- Daha önceden kaydedilmiş bir dosyayı açabilir-
- Gerçek zamanlı analiz yapabilir
- Bir analizi filtre edebilir (örneğin "sadece HTTP mesajlarını göster" gibi)
- Terminal veya kullanıcı arabirimi ile kullanılabilir
- Gelişmiş bir arayüz sunar

![interface](/images/sniffing-islemi/1.png)

WireShark bir çok filtreleme imkanına sahiptir. Bunlara genel olarak değinelim.    

Aşağıdaki örnekteki gibi belirli bir host'un belirli bir portunu dinleyebiliriz.  
![belli-bir-port](/images/sniffing-islemi/2.png)  

Bu dinlemeleri yaptığımız sırada paketleri daha rahat okumak için filtreleme seçeneklerini kullanabiliriz. Aşağıdaki örnekte sadece **http** protokolüne bakıyoruz.  
![belli-bir-protokol](/images/sniffing-islemi/3.png)

Şifresiz bir veriyi sniffing işlemi ile elde etmek oldukça kolaydır.
![pass-sniff](/images/sniffing-islemi/9.png)

#### Capture filtreleme örnekleri;

- Belirli bir host
	```
		host 10.0.2.23
	```  

- Belirli bir network
	```
		net 10.0.2.1/24
	```  

- Belirli bir port
	```
		port 53
	```  

- Belirli bir host ama belirli portlar değil
	```  
		host 10.0.2.23 and not ( port 80 or port 53 )
	```  

- Belirli bir port ve arp değil
	```
		port not 53 and not arp
	```  

- Belirli bir tcp port'u
	```
		tcp and port 80
	```

- Belirli bir tcp port aralığı
	```
		tcp portrange 60-6000
	```

- Belirli bir udp port'u
	```
		udp and port 53
	```

- Belirli bir udp port aralığı
	```
		udp portrange 10-1000
	```

- Sadece IPv4 paketleri
	```
		ip
	```  

- Sadece IPv6 paketleri
	```
		ip6
	```  

#### Display filtreleme örnekleri;

- Belirli bir source port'u
	```
		ip.src == 10.0.2.23
	```  

- Belirli bir destination port'u
	```
		ip.dst == 10.0.2.23
	```

- Belirli bir source ve belirli bir destination değil
	```
		ip.src == 10.0.2.23 and ip.dst != 192.30.252.153
	```

- Belirli bir tcp port'u
	```
		tcp.port == 80
	```

- Belirli bir udp port'u
	```
		udp.port == 53
	```

- Belirli bir port ve belirli bir protokol
	```
		tcp.port == 80 and http
	```

## TCPDump Nedir ? Nasıl Kullanılır ?

Komut satırı üzerinden paket analizi yapmak için kullanılan bir tool'dur. UNIX tabanlı işletim sistemleri içindir.
	
![tcpdum-help](/images/sniffing-islemi/4.png)  
![tcpdump-d](/images/sniffing-islemi/5.png)  
![tcpdump](/images/sniffing-islemi/6.png)

#### Kullanım örnekleri;

- Interface'leri görmek
	```
		tcpdump -D
	```

- Belirli bir interface'i dinlemek
	```
		tcpdump -i enp0s3
	```

- Belirli bir port'u taramak
	```
		tcpdump port 53
	```

- Belirli bir protokol ve port'u taramak
	```
		tcpdump tcp port 80
	```

- Belirli bir interface'de, belirli sayıda paketi dinlemek ve .pcap formatında dışarı çıkarmak
	```
		tcpdump -i enp0s3 -c 10 -w output.pcap
	```  
	**.pcap** formatında dışarı çıkarılan dosyalar daha sonradan WireSharak gibi başka sniffing tool'ları ile okunabilir.

- Dosya halindeki veriyi okumak
	```
		tcpdump -r output.pcap
	```