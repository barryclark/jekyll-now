---
layout: post
title: "Merkezi Log Server Oluşturulması"
tags: [GNU/Linux]
subtitle: "lyk18'de yapılan rsyslog anlatımının bir özeti."
---

***Yazan: [boratanrikulu](https://github.com/boratanrikulu)***

**Kaynaklar**  
LYK'18 - GNU/Linux Sistem Yönetimi 2. Düzey [**[Erdem Bayer]**](https://www.linkedin.com/in/erdem-bayer-1633915/)  

**NOT 1:** Eksik ya da yanlış gördüğünüz yerler için Pull Request atabilirsiniz [**[0]**](https://github.com/boratanrikulu/boratanrikulu.github.io/tree/master/_posts)  
**NOT 2:** Yazı ile ilgili düşüncelerinizi yorum yazarak belirtirseniz sevinirim **:)**

---

## Rsyslog Nedir ?

Rsyslog, log'ların yönlendirilmesini sağlayan, UNIX tabanlı sistemlerde çalışan, açık kaynak bir yazılımdır. Temel syslog protokolünü uygulayan rsyslog; içeriğe dayalı filtreleme, zengin filtreleme yetenekleri, esnek yapılandırma seçenekleri ile göze çarpar. Ayrıca taşıma için TCP'yi kullanma gibi özellikler ekler. [**[1]**](https://en.wikipedia.org/wiki/Rsyslog) 

---

## Rsyslog Nasıl Çalışır ?

Bir süreç tarafından log yazılacağında, log ilk olarak **/dev/log**'a yazılır.

Örneğin postfix tarafından bir log yazılmak istendiğinde, ilgili log /dev/log'a yazılır. **rsyslog** tarafından dinlenen /dev/log'daki log mesajı; rsyslog tarafından **/var/log/mail**'e yazılır.

/dev/log bir **socket**'tir.

<p align="center"> 
	<img src="/images/merkezi-log-server-olusturulmasi/1.png">
</p>

---

Peki **rsyslog**, /dev/log'a yazılan log'ları **nereye yazacağını nasıl anlıyor ?**

Log'ların nereye, hangi aciliyet ile yazılacağını belirtmek için 2 etiket kullanılır ;

- **Facility** (type)
- **Severity** (level)

**Facility** ile **hangi türde** bir log mesajı olduğu belirtilir;  
**Severity** ile de **hangi aciliyette** bir log olduğu belirtilir.

Facility ve Severity türleri bellidir, ekleme çıkarma yapılamaz. 

---

#### Facility [**[2]**](https://wiki.gentoo.org/wiki/Rsyslog#Facility)

| Numarasal Kod | Facility | Açıklama |
|:--------------:|:--------:|:-----------:|
| 0 	| kern 	| kernel messages |
| 1 	| user 	| user-level messages |
| 2 	| mail 	| mail system |
| 3 	| daemon 	| system daemons |
| 4 	| auth 	| security/authorization messages |
| 5 	| syslog 	| messages generated internally by syslogd |
| 6 	| lpr 	| line printer subsystem |
| 7 	| news 	| network news subsystem |
| 8 	| uucp 	| UUCP subsystem |
| 9 	| cron 	| clock daemon |
| 10 	| security 	| security/authorization messages |
| 11 	| ftp 	| FTP daemon |
| 12 	| ntp 	| NTP subsystem |
| 13 	| logaudit 	| log audit |
| 14 	| logalert 	| log alert |
| 15 	| clock 	| clock daemon (note 2) |
| 16 	| local0 	| local use 0 (local0) |
| 17 	| local1 	| local use 1 (local1) |
| 18 	| local2 	| local use 2 (local2) |
| .		| .		| . |
| .		| .		| . |
| 23 	| local7 	| local use 7 (local7) |

---

#### Severity [**[3]**](https://wiki.gentoo.org/wiki/Rsyslog#Severity)

| Numarasal Kod | Severity | Açıklama |
|:-------------:|:--------:|:--------:|
| 0 	| emerg 	| system is unusable
| 1 	| alert 	| action must be taken immediately
| 2 	| crit 	| critical conditions
| 3 	| error 	| error conditions
| 4 	| warning 	| warning conditions
| 5 	| notice 	| normal but significant condition
| 6 	| info 	| informational messages
| 7 	| debug 	| debug-level messages 

---

#### Birkaç Örnek

**logger** ile log mesajı üretebiliriz.

Örneğin aşağıdaki gibi bir log oluşturulalım.

```bash
[root@log ~#] logger "first log we sent"
```

CentOS'da bu log /var/log/messages'a düşecektir.

```bash
[root@log ~#] less /var/log/messages
```

logger'da **facility** ve **severity** belirtmek için **-p** parametresi kullanılır.

Örneğin aşağıdaki gibi bir log oluşturulalım.

```bash
[root@log ~#] logger -p mail.alert "postfix is down."
```

Bu log, /var/log/maillog'a düşecektir.

```bash
[root@log ~#] tail -10 /var/log/maillog
```

Eğer normalde olmayan bir facility ya da severity kullanmaya çalışırsak hata verecektir.

```bash
[root@log ~#] logger -p mesaj.onemli "cok onemli bir mesaj."
```

<p align="center"> 
	<img src="/images/merkezi-log-server-olusturulmasi/2.png">
</p>

---

#### Rsyslog Konfigürasyon Dosyaları

Rsyslog konfigürasyon dosyası **/etc/rsyslog.conf**'dir. Ayrıca **/etc/rsyslog.d/** dizini altına conf uzantılı bir dosya konulursa, aynı şekilde işleme alınır.

Modül'ler ise **/usr/lib64/rsyslog/** dizini altında bulunur. Örneğin; imtcp modülü sayesinde tcp üzerinden log alınabilir, modüllerin kullanması için load'lanması gerekir. Bunun için konfigürasyon dosyasında aşağıdaki gibi load'lama yapılabilir.

```
$ModLoad imtcp
```

Aslında rsyslog çalışma mantığı direkt, rsyslog tarafından /dev/log'un okunması ve /var/log/ altında ilgili dosyaya yazılması şeklinde değildir. Araya bir çok modül girebilir. **imuxsock** modülü sayesinde /dev/log okunabilir..

Şimdi ufaktan konfigürasyon dosyasını kurcalamaya başlayalım.
```bash
[root@log ~#] vim /etc/rsyslog.conf
```

Dosyada ayarlar incelendiğinde bazılarının başında **"-"** olduğu gözükür. Bu "sync" işleminin yapılmasına gerek olmadığı belirtmek içindir. Ama aslında günümüzde bir işlevi yoktur. Eskiden rsyslog tarafından yazma işlemi yapıldıktan sonra sync yapılırken, günümüzde bu işlem yapılmamaktadır. **Yani "-" yazılsa da yazılmasa da sync yapılmaz.**

<p align="center"> 
	<img src="/images/merkezi-log-server-olusturulmasi/3.png">
</p>

Şimdi test amacıyla bir kural satırı ekleyelim. Aşağıdaki satırı, konfigürasyon dosyasında uygun bir yere ekleyin.  

Bu kural satırı şunu söylemektedir; **security facility** ile gelen log'lardan alert severity'e sahip, **auth facility** ile gelenlerin de hepisini **/var/log/sec-logs** dosyasına yaz.

```
security.alert;auth.*        /var/log/sec-logs
```

Şimdi bu ayarı kontrol etmek için dosyayı kayıt edip çıkalım. Yapılan konfigürasyon değişikleri için servisi reload'lamalıyız.

```bash
[root@log ~#] systemctl force-reload rsyslog
```

Herhangi bir sorun olup olmadığını görmek için status'e bakmayı da unutmayın.

```bash
[root@log ~#] systemctl status rsyslog
```

Şimdi yaptığımız kuralı test edelim. Aşağıdaki gibi 2 tane log yollayalım.

```bash
[root@log ~#] logger -p security.warning "someone trying to hack you."
```
```bash
[root@log ~#] logger -p auth.alert "you are under bruteforce attack."
```

Ardından aşağıdaki gibi oluşturduğumuz log'ların yazıldığını görebiliriz.

```bash
[root@log ~#] cat /var/log/sec-logs
```

<p align="center"> 
	<img src="/images/merkezi-log-server-olusturulmasi/4.png">
</p>

Örneğin auth ve cron haricindeki tüm facility'lerin info severity'e sahip olan loglarını bir yere kaydetmek istiyor olalım. Bu durumda aşağıdaki gibi bir kural girebiliriz.

```
*.info;mail.none;cron.none        /var/log/infos
```

Ya da örneğin hiç bir yerde mail facility'si olsun istemiyorsak konfigürasyon dosyasında kural satırlarının **en üstüne** şunu eklersek, **hiç bir mail facility log'u yazılmaz.**

```
mail.*        stop
```

**NOT :** Konfigürasyon dosyasını değiştirdikten sonra servisi reload'lamayı unutmayın **:)**.

---

## Merkezi Log Sunucusunun Hazırlanması

Bu örnekte merkezi bir log server'ı kuracağız.  

Bunun için elimizde bir adet **postfix** ve bir adet **wordpress** server'ı olacak, bu iki sunucunun da log'larını ayrı bir server'da tutacağız.  

Aşağıdaki görselde daha anlaşılır şekilde görebilirsiniz.

**NOT :** 3 server için de **CentOS 7** tercih edilmiştir. Siz başka dağıtımlar tercih edebilirsiniz.

<p align="center"> 
	<img src="/images/merkezi-log-server-olusturulmasi/0.png">
</p>

---

#### Log Server'da Yapılacak İşlemler

**NOT :** Anlatımın önceki adımlarında test amaçlı yapılan işlemleri silin lütfen **:)**.

Şuana kadar rsyslog için /dev/log **socket**'inden log'ları alıp, ilgili dosyalara yazdığını söyledik, hatta bu işlem için **imuxsock** modülünü kullandığını belirtik.

Şimdi aynı mantıkla, bu sefer bir socket üzerinden değil de TCP ve UDP üzerinden log'ların okunmasını ve ilgili dosyalar yazılmasını istiyoruz. Bunun için **imtcp** ve **imudp** modülleri kullanılır.

Biz bu anlatımda log'ların hedefe varıp varmadığından emin olmak istediğimizden dolayı TCP tercih edeceğiz. Bu yüzden dolayı Log Server'da modül olarak imtcp'yi load'lamalıyız.

```bash
[root@log ~#] vim /etc/rsyslog.conf
```

Konfigürasyon dosyasında imtcp modül kısmını yorum satırı dışına alarak aşağıdaki gibi yapın.

```
# Provides TCP syslog reception
$ModLoad imtcp
$InputTCPServerRun 514
```

Ardından servisi reload'layın.
```bash
[root@log ~#] systemctl force-reload rsyslog
```

Artık 514/TCP portu, rsyslog tarafından dinleniyor olmalı. Aşağıdaki gibi kontrol edebilirsiniz.
```bash
[root@log ~#] netstat -nlptu | grep "514"
```

Ayrıca firewall'da gerekli port'u açmamız gerekiyor. Aşağıdaki gibi açabilirsiniz.
```bash
[root@log ~#] firewall-cmd --zone=public --add-port=514/tcp
```
```bash
[root@log ~#] firewall-cmd --zone=public --permanent --add-port=514/tcp
```

---

#### Postfix ve Wordpress Server'da Yapılacak İşlemler

Şimdi Wordpress Server üzerinden, Log Server'a bir log atalım ve herhangi bir sorun var mı diye kontrol edelim.

```bash
[root@wordpress ~#] logger -T -n 192.168.2.140 -P 514 -p mail.info "Wordpress Server'dan gelen LOG."
```

Şimdi Log Server'da durumu kontrol edelim.
```bash
[root@log ~#] tail -f /var/log/maillog
```

<p align="center"> 
	<img src="/images/merkezi-log-server-olusturulmasi/5.png">
</p>

Eğer Wordpress Server'ın tüm log'larını, Log Server'a yollamak istiyorsak aşağıdaki gibi bir satırı konfigürasyon dosyasına eklememiz yeterlidir. Fakat biz Log Server log'ları ile uzak server log'larının karışmasını istemediğimiz için bir adım daha uygulamamız gerekiyor; **template !**

**NOT 1:** Aynı satırı Postfix Server için de ekleyin.  
**NOT 2:** Konfigürasyon dosyasını değiştirdikten sonra reload işlemini unutmayın.

```bash
*.*          @@192.168.2.140:514 # TCP
# *.*        @192.168.2.140:514 # UDP
```

```bash
[root@wordpress ~#] systemctl force-reload rsyslog
```

---

#### Template Kullanımı

Bizim kurmak istediğimiz yapıdaki amaç; Log Server'ın **/var/log/remote** dizini altında **her uzak sunucu için ayrı klasör oluşması** ve bunların altında uzak server log'larının saklanmasını sağlamak.

Bunun için template yapısını kullanacağız. [**[4]**](https://www.rsyslog.com/doc/master/configuration/properties.html)

Kullanacağımız template aşağıdaki gibi olacak. Bu iki satırı /etc/rsyslog.conf'da uygun bir yere ekleyin ve servisi reload'layın.

```
$template RemoteServersTamplate, "/var/log/remote/%hostname%/%syslogfacility-text%/%syslogseverity-text%.log"
```
```
*.*        ?RemoteServersTamplate
```

Postfix ve Wordpress Server'da test amaçlı birkaç log oluşturduğumuzda sorunsuz çalıştırğını gözlemliyoruz.

<p align="center"> 
	<img src="/images/merkezi-log-server-olusturulmasi/6.png">
</p>

---

#### Expression-Based Filtreleme Kullanımı

Aslında burada aslında bir sorun var, gördüğünüz gibi local olan Log Server'ın log'ları da yazılmış ve **log** diye bir klasör oluşturulmuş. Biz bunu istemiyoruz. Bunu önlemek amacıyla **Expression-Based Filtreleme** uygulanabilir.

Bunun kullanımı şu şekildedir;

**"** if **EXPRESSION** then **ACTION** else **ACTION** **"**

Yani aslında Log Server'ın loglarını bu kural satırına uygulamak istemiyorsak şu şekilde yapmamız yeterlidir.

```
*.*        if $hostname != 'log' then ?RemoteServersTamplate
```

Tüm cihazlarda bir kaç log ürettikten sonra aşağıdaki sonucu gözlemliyoruz.

<p align="center"> 
	<img src="/images/merkezi-log-server-olusturulmasi/7.png">
</p>

---

**NOT :** Yazı ile ilgili düşüncelerinizi yorum yazarak belirtirseniz sevinirim **:)**