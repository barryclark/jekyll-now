---
+layout: post
+title: "Aktif Bilgi Toplama (NMAP)"
+excerpt: "NMAP kullanımı hakkında bir özet."
---

***Yazan: Bora Tanrıkulu***


**Kaynaklar:**

NMAP ile Ağ Keşfi - Murat Yokuş (Pusula Yayıncılık)

[canyoupwn.me/tr-nmap-cheatsheet/](https://canyoupwn.me/tr-nmap-cheatsheet/)

[jlk.fjfi.cvut.cz/arch/manpages/man/extra/nmap/](https://jlk.fjfi.cvut.cz/arch/manpages/man/extra/nmap/nmap.1.en)

---

## Aktif Bilgi Toplama ?

- Geçen hafta anlatımını yaptığım pasif bilgi toplama ile IP ve servis bilgileri gibi bir çok veriye, hedef sistem ile doğrudan ilişkiye girmeden, hali hazırda internet üzerinde bulunan **açık kaynaklardan** bilgi toplayarak erişmiştik.

- Pasif bilgi toplama işleminden sonra **aktif bilgi toplama** adımı gelmektedir.

	Aktif bilgi toplama adımında hedef **sistem ile doğrudan** ilişkiye girilir. Hedef sistem ile kurulan bu ilişki sonuncunda, hedefin log'ları incelendiğinde bu durum fark edilebilir. En basitinden bir IP adresine yapılacak port taraması firewall log'larına düşecektir.

## NMAP Nedir ?

- Nmap, bir güvenlik tarayıcısıdır. Taranan ağın haritasını çıkartabilir ve ağ makinalarında çalışan servislerin durumlarını, işletim sistemlerini tespit edebilir.

	Bu sistemlerin açık olan portlarını, çalışan fiziksel aygıt tiplerini, çalışma süresini, yazılımların hangi servisleri kullandığını, yazılımların sürüm numaralarını, sistemin firewall'a sahip olup olmadığını, ağ kartının üreticisinin adı gibi bilgileri tespit edebilir.

- Ağda aktif olan cihazların tespiti için yapılmış, bir NMAP taraması örneği:

	![nmap-ping-taraması](pics/1.png)

## NMAP ile Tarama İşlemleri

- Tek bir hedef üzerinde tarama işlemi aşağıdaki gibi hiç bir argüman kullanmadan yapılabilir.  
	Varsayılan bir NMAP taraması en sık kullanılan 1000 TCP/IP portunu tarar.

- Bu tarama örneği, [**metasploitable**](https://sourceforge.net/projects/metasploitable/files/Metasploitable2/) cihazı üzerinde gerçekleştirilmiştir. Görüldüğü gibi bir çok port cihaz üzerinde açıktır.

	**Port:** Protokol / Port numarası

	**State:** Port bilgisini verir.

	&nbsp;&nbsp;&nbsp;&nbsp;-> Açık  
	&nbsp;&nbsp;&nbsp;&nbsp;-> Kapalı  
	&nbsp;&nbsp;&nbsp;&nbsp;-> Filtreli  
	&nbsp;&nbsp;&nbsp;&nbsp;-> Filtresiz
	
	**Service:** Port numarasına ait servis bilgisini verir.

	![nmap-argumansiz-tarama](pics/2.png)

## Çoklu Hedefler Üzerinde Tarama Yapmak

- NMAP ile aynı anda birden fazla hedef üzerinde tarama işlemi gerçekleştirilebilir.

	Bunun için aşağıdaki örnekteki bi hedef IP'ler ardı ardına yazılabilir 

	![nmap-coklu-tarama](pics/3.png)

- Ya da aynı işlem aşağıdaki komut ile de yapılabilir

	```
		nmap 10.0.2.16,17
	```

- Belirli IP aralıklarını taramak için ise aşağıdaki komut kullanılabilir.

	Bu komut 10.0.2.1 ile 10.0.2.100 arasındaki IP'ler üzerinde tarama işlemi yapar.
	
	```
		nmap 10.0.2.1-100
	```

- Birden çok network/subnets taramak için de aralıklar kullanılabilir.

	Bu komut 10.0.1.* subnet'inden 10.0.100.* subnet'ine kadar, bu subnet'lerin tüm IP'lerini tarar.

	```
		nmap 10.0.1-100.*
	```

- Tarama sırasında aynı network içersinde bir çok cihaz olabilir. Bu cihazlardan bazılarını taramak istemez isek **--exclude** parametresi kullanılır.

	Örnek vermek gerekirse, aşağıdaki tarama işleminde **10.0.2.0/24** ağında bulunan tüm cihazları taramasını ama locahost olan 10.0.2.14 IP'sını taramaması sağlanır.

	![nmap-exclude](pics/4.png)

## Agresif Tarama Yapmak

- **-A** parametresi, NMAP ile hedef üzerinde agresif tarama yapmayı sağlar.  
	Agresif tarama işlemi ile, NMAP'te en sık kullanılan parametrelerin bazıları otomatik olarak kullanılmış olur.

	Bunlar; İşletim Sistemi Tespiti, Versiyon Tespiti, Script taraması ve Traceroute'tur. (*-O -sC --traceroute*)
	***"-A, to enable OS and version detection, script scanning, and traceroute"***

	[**metasploitable**](https://sourceforge.net/projects/metasploitable/files/Metasploitable2/) cihazı üzerinde yapılan **agresif tarama örneği**:

	![nmap--A](pics/5.png)
	![nmap--A](pics/6.png)
	![nmap--A](pics/7.png)
	![nmap--A](pics/8.png)
	![nmap--A](pics/9.png)

## NMAP Parametreleri

- Varsayılan tarama seçenekleri, güvenli sistemler üzerinde fazla etkili değildir. Aşağıdaki tabloda daha kapsamlı tarama ve keşif yapmamızı sağlayan parametreler gösterilmiştir.

	| Açıklama                | Parametre |
	|-------------------------|:---------:|
	| Ping Atma               |  **-PN**  |
	| Sadece Ping Tarama      |  **-sP**  |
	| TCP syn ping            |  **-PS**  | 
	| TCP ack ping            |  **-PA**  | 
	| UDP ping                |  **-PU**  | 
	| SCTP init ping          |  **-PY**  | 
	| ICMP echo ping          |  **-PE**  | 
	| ICMP timestamp ping     |  **-PP**  |
	| ICMP adress mask ping   |  **-PM**  | 
	| IP protocol ping        |  **-PO**  |
	| ARP ping                |  **-PR**  |
	| Traceroute              | **--traceroute** |
	| Reverse dns çözümleme   | **-R**      |
	| Reverse dns çözümleme kapa | **-n**      |
	| Alternatif dns lookup      | **--system-dns**  |
	| Manuel dns sunucu belirleme | **--dns-servers** |
	| Host listesi oluşturma      | **--sL**     |

#### -PN Parametresi ile Ping'siz Tarama

- NMAP varsayılan oalrak, açık portları için bir sistemi taramaya başlamadan önce hedefin aktif olup olmadığını tespit etmek için ping atar. Bu parametre ile hedef üzerinden ping ile kontrol işlemi atlanarak eksiksiz bir bir port taraması yapılır.

	Bu parametre ping isteklerini engelleyen firewall'lara karşı etkili olmaktadır.

	```
		nmap -PN 10.0.2.17
	```

#### -sP Parametresi ile Sadece Ping Tarama

- Bu parametre ile hedef basit bir ping isteği gönderilerek aktif olup olmadığı tespit edilmeye çalışılır.

	![nmap-ping-taraması](pics/1.png)

#### -PS Parametresi ile TCP syn ping

- TCP syn ping, hedef sisteme bir syn paketi gönderir ve bir yanıt dönmesini dinler.

	Bu Alternatif keşif yönetimi, standart ICMP pinglerini engelleyen sistemlere karşılı işe yarayabilir.

	```
		nmap -PS [port1,port2,...,] [hedef]
	```

#### -PA parametresi ile TCP ack ping

- TCP ack ping, hdeften gelen bir yanır için varolmayan TCP bağlantılarına yanıt vererek sistemi keşfetmeye çalışır. Bu işlem 3'lü el sıkışma (3 way handshake) işlemi gibidir.

	Bu Alternatif keşif yönetimi, standart ICMP pinglerini engelleyen sistemlere karşılı işe yarayabilir.

	```
		nmap -PA [port1,port2,...,] [hedef]
	```

#### -PU parametresi ile UDP ping

- Hedeften yanıt almak için UDP paketleri gönderilir. Çoğu firewall bunu engellese de, bazı yapılandırma sistemleri yalnızca TCP bağlantılarını filtrelemek için yapılandırıldıysa izin vermektedir.

	```
		nmap -PU [port1,port2,...,] [hedef]
	```

### Gelişmiş tarama

- NMAP varsayılan olarak temel bir TCP taraması yapmaktadır. Bazı durumlarda daha detaylı bilgi toplamak için ya da firewall'ı atlamak için daha farklı parametreler kullanmamız gerekebilir.

	| Tarama Türü             | Parametre |
	|-------------------------|:---------:|
	| TCP syn scan            |  **-sS**  |
	| TCP connect scan        |  **-sT**  |
	| UDP scan                |  **-sU**  | 
	| TCP null scan           |  **-sN**  |
	| TCP fin scan            |  **-sF**  |
	| XMAS scan               |  **-sX**  |
    | TCP ack scan            |  **-sA**  |
    | Custom TCP scan         |  **--scanflags** |
    | IP protocol scan        |  **--sO** |
    | Ham internet paketleri gönderme | **--send-eth** |
    | IP paketleri gönderme   | **--send-ip** |

### Port Tarama İşlemleri

- NMAP varsayılan olarak en çok kullanılan 1000 portu tarama işlemi yapar. Bu portlar dışındaki portların taramasını yapmak için parametreler ile belirtmemiz gerekir.

	Toplam 131.070 TCP/IP portu vardır. (65.535 TCP + 65.535 UDP)

	| Açıklama                | Parametre       |
	|-------------------------|:---------------:|
	| Hızlı Tarama            |  **-F**         |
	| Belirli Port Tarama     |  **-p [port-numarasi]**  |
	| İsim ile Port Tarama    |  **-p [port-adi]**  |
	| Protocol ile Port Tarama | **-p T:[tcp-portu], U:[udp-portu]**  |
	| Tüm Portları taramak     | **-p-** |
	| En fazla kullanılan Portları taramak | **--top-ports sayi** |
	| Ardışık olarak Port tarama | **-r** |


## NMAP Script Engine (NSE)

- NSE, kullanıcıların NMAP ile tarama işlevlerini gerçekleştirmek için özel komut dosyaları kullanmayı sağlar. NSE, nadiren de olsa sistem duraklamaları ve veri kaybı gibi sonuçlara neden olabilecek agresif tarama teknikleri kullanır.

	Sadece kendinizin yazdığı script değil, hali hazırda içine **default* olarak dahil edilmiş scriptlerde vardır.

	| Özellikler			| Parametre		|
	|-----------------------|:--------------:|
	| Tek Script çalıştırma | **--script [script-adi]** |
	| Çoklu Script çalıştırma | **--script [script-adi-1], [script-adi-2]** |
	| Kategoriye göre Script çalıştırma | **--script [kategori-adi]** |
	| Çoklu kategoriye göre Script çalıştırma | **--script [kategori-adi-1], [kategori-adi-2]**|
	| Script durum izleme | **--script-trace** |
	| Script Database Güncelleme | **-script-updatedb** |

#### Tek Script Çalıştırma

- **whois-domain.nse** script'i ile yapılan tarama örneği:

	![nmap-nse-whois](pics/10.png)

#### Kategoriye göre Script Çalıştırma

- Kategorileri daha detaylı incelemek için: [nmap.org/nsedoc/](https://nmap.org/nsedoc/)

	| Kategori				| Kapsam ve İşlevi |
	|-----------------------|:-----------------:|
	| **All** 				| Tüm NSE Script dosyalarını çalıştırır |
	| **Auth**					| Kimlik Doğrulama Script'leri |
	| **Default**				| Varsayılan Script Dosyalarını çalıştırır |
	| **Discovery**				| Hedef hakkında detaylı keşif yapar |
	| **External**			| Dış kaynak ile iletişim kuran script (whois vs.) |
	| **Intrusive**				| Hedef sisteme sızmaya çalışan Script dosyaları |
	| **Malware**				| Backdoor ve Malware kontrol Script dosyaları |
	| **Safe**					| Basit Script dosyaları |
	| **Vuln**					| Zefiyetleri kontrol eden script dosyları |

- Malware kategorisinde bulunan scriptler ile tarama örneği:

	![nmap-nse-malware](pics/15.png)
	![nmap-nse-malware-2](pics/16.png)

#### Örnek Bir Backdoor Bulma Aşaması

- NMAP ile versiyon taraması yaparız;

	![nmap-ftp-backdoor](pics/18.png)

- Çıkan sonuçlara uygun Scriptlere bakarız.

	ftp (vsftpd 2.3.4) için yapılan script taraması:
	
	![nmap-ftp-backdoor](pics/19.png)

	Referance kısmında bunun için belirtilen exploit'i kullanmak için metasploit'i açıyoruz ve belirtilen aramayı yaptıktan sonra exploit'imizi seçiyoruz.

	![msfconsole-ftp](pics/20.png)
	![msfconsole-ftp](pics/21.png)
	![msfconsole-ftp](pics/22.png)

#### Script Dosyaları Database Güncelleme

- Aşağıdaki gibi güncelleme işlemi gerçekleştirilir.

	![nmap-nse-update-db](pics/12.png)

#### Script Dosyalarının Konumu

- Script dosyaları, linux sistemlerde, **/usr/share/nmap/scripts/** altındadır.

	![nmap-scripts-folder](pics/13.png)
	![nmap-scripts-search](pics/14.png)

## Güvenlik Duvarını Atlatmak

- NMAP ile yapılan taramalar güvenlik duvarına takılır doğru ya da hiç sonuç vermeyebilir. NMAP, bu savunmaları atlatmak için oluşturulmuş birkaç özellik barındırmaktadır.

	| Özellik			| Parametre |
	|-------------------|:---------:|
	| Parçalanmış paketler | **-f**  |
	| MTU ayarı 			| **--mtu**   |
	| Decoy kullanmak		| **-D**	|
	| Idle Zombie tarama	| **-sI**	|
	| Manuel kaynak port belirtmek | **--source-port** |
	| Rastgele veri ekleme		| **--data-length** |
	| Rastgele hedef taramak	| **--randomize-hosts** |
	| Mac Adress Spoof			| **--spoof-mac** |
	| Bad Checksums gönderme	| **--badsum**		|

#### Parçalanmış Paketler

- **-f** paremetresi, hedefe gönderilen paketleri 8 byte'lık paketlere bölerek gönderme işlemini gerçekleştirir.

	Eski veya yanlış yapılandırılmış güvenlik duvarlarını atlatmaya çalışırken işe yarayabilir.

	```
		nmap -f [hedef]
	```

#### MTU Ayarı

- **-mtu** parametresi, özel MTU(**Maximum Transmission Unit**) değeri belirtmek için kullanılır.

	Aşağıdaki örnek **-f** parametresindeki gibi paketleri 8 byte'lık paketler kullanır. 

	**--mtu** parametresinde [değer], 8 ve katı şeklinde olmalıdır.

	```
		nmap --mtu 8 [hedef]
	```

#### Decoy Kullanımı

- **-D** opsiyonu, bir veya deha fazla decoy kullanarak NMAP taramasını maskelemek için kullanılır.

	```
		nmap -D RND: [sayı] [hedef]
	```

#### Idle Zombie Tarama

- **-sI** parametresi, idle zombi tarması gerçekleştirmek için kullanılır.

	Idle Zombie taraması ile, boşta çalışan sistemlerden yararlanırız. Bu boşta çalışan sistem üzerinden, hedefteki sistemin taraması gerçekleştirirlir.

	```
		nmap -sI [zombie-sistem] [hedef]
	```

#### Mac Adress Spoof

- **--spoof-mac** parametresi, saldıran cihazın mac adresinin hedef sistem üzerinde log'lanmasına karşı değiştirmeyi sağlar.

	```
		nmap --spoof-mac 0 [hedef]
	```

	![nmap-mac](pics/23.png)