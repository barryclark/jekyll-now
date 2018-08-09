---
layout: post
title: "Cron ile Zamanlanmış Görevler"
tags: [GNU/Linux]
subtitle: "zamanlanmış görevlerin linux'da nasıl oluşturulduğunu açıklar."
---

***Yazan: [boratanrikulu](https://github.com/boratanrikulu)***

**Kaynaklar**  
[wiki.archlinux.org/cron](https://wiki.archlinux.org/index.php/cron)  
[en.wikipedia.org/wiki/Cron](https://en.wikipedia.org/wiki/Cron)

**NOT:** Anlatım için debian9 kullanılmıştır.

---

## Sunucuda Saat Ayarlamasının Yapılması


Eğer zamanlanmış bir görev yapmak istiyorsanız ilk yapanız gereken, elinizde bulunan sunucunun sistem saatinin istediğiniz gibi olduğundan emin olmaktır. Sistem saatini aşağıdaki komut ile kontrol edebilirsiniz.

```bash
	$ date
```

Eğer istenenden farklı bir sonuç gözleniyor ise aşağıdaki komut ile sistem saatini bölgesel olarak yeniden ayarlayabilirsiniz.
```bash
	$ sudo dpkg-reconfigure tzdata
```
<p align="center"> 
	<img src="/images/cron-ile-zamanlanmis-gorevler/1.png">
</p>
<p align="center"> 
	<img src="/images/cron-ile-zamanlanmis-gorevler/2.png">
</p>

---

## Zamanlanmış Görev Nedir ?

Zamanlanmış görevler sayesinde günlük-haftalık-aylık-yıllık periyotlar ile yapmanız gereken işlemleri manuel yapmak yerine otomatik olarak istenen zaman diliminde gerçekleşmesini sağlayabilirsiniz.

Zamanlanmış görevler için çoğunlukla **cron** kullanılır. Çoğu sistemde cron kurulu olarak gelmektedir. Ayrıca yine çoğu sistemde default olarak gelen bazı zamanlanmış cron görevleri mevcuttur.  
Bunlar **/etc/** altında aşağıdaki gibi bulunur.

<p align="center"> 
	<img src="/images/cron-ile-zamanlanmis-gorevler/3.png">
</p>

---

## Cron Nedir ?

Cron zamanlanmış olarak komutları çalıştırmamızı sağlayan bir daemon'dur. Çoğu linux dağıtımında yüklü olarak gelir.

Cron kullanımı için iki temel yol vardır. 

Birincisi; hali hazırda sistemde /etc/ altında bulunan **cron.daily**, **cron.hourly**, **cron.monthly** ve **cron.weekly** klasörlerinine istenen script'in kopyalanmasıdır.  
Bu klasörlerde bulunan scriptler, **/etc/crontab**'daki ayarlamaya göre ilgili zaman dilimlerinde çalıştırılır.

/etc/crontab aşağıdaki gibidir.

<p align="center"> 
	<img src="/images/cron-ile-zamanlanmis-gorevler/4.png">
</p>

İkinicisi; kullanıcıya özel crontab dosyası oluşturulmasıdır. Sıradaki başlıklarda bunun nasıl yapıldığını anlattım.

---

## Crontab Kullanımı

Her kullanıcının kendisine ait bir crontab dosyası vardır.  
**Crontab** ile bir crontab dosyası oluşturulduğunda bu dosyalar **/var/spool/cron/crontabs/** altında tutulur. *Ama bu dosyalara elle müdahale edilmemesi gerekir*, bunun yerine komut satırından **crontab** kullanılmalıdır.

Crontab kullanım komutları aşağıdaki gibidir.

| Komut | Açıklama |
|:-----:|:--------:|
| crontab -l | Komudu çalıştıran kullacının, eğer mevcut ise, crontab dosyasını gösterir |
| crontab -e | Komudu çalıştıran kullanıcının, crontab dosyasını açar |
| crontab -r | Komudu çalıştıran kullanıcının crontab dosyasını siler |
| crontab -u userName -e | Başka bir kullanıcının crontab dosyasını açar |

Crontab dosyasını bir kullanıcı için oluşturmak ve düzenlemek istiyorsak **-e** parametresini kullanmamız gerekir. Eğer ilk defa oluşturuluyorsa aşadağıki gibi boş/default bir crontab dosyası oluşacaktır.

```bash
	$ crontab -e
```


<p align="center"> 
	<img src="/images/cron-ile-zamanlanmis-gorevler/11.png">
</p>

Crontab dosya yapısı aşağıdaki yapıdaki gibi kullanılmalıdır. Her satıra bir işlem yazılacak şekilde düzenlenmelidir.

<p align="center"> 
	<img src="/images/cron-ile-zamanlanmis-gorevler/10.png">
</p>

Yukardaki ifade yerine direkt olarak aşağıdaki gibi bir yapı da kullanılabilir.

| Komut | Eşiti | Açıklama |
|:-----:|:-----:|:--------:|
| **@yearly** | 0 0 1 1 \* | Her yılın ilk günü çalışır |
| **@monthly** | 0 0 1 \* \* | Her ayın ilk günü çalışır |
| **@weekly** | 0 0 \* \* 0 | Her hafta pazar günü çalışır |
| **@daily** |  0 0 \* \* \* | Her gün gece yarısı çalışır |
| **@hourly** | 0 \* \* \* \* | Her saatin başlangıcında çalışır |
| **@reboot** | **-karşılığı yok-** | Her başlatma işleminde çalışır |


Örneğin aşağıdaki iki satır da aynı işlemi yapmaktadır.

<p align="center"> 
	<img src="/images/cron-ile-zamanlanmis-gorevler/12.png">
</p>

---

## Basit Bir Örnek ile Gösterim

Aşağıdaki gibi elimizde basit bir backup script'i olsun, ve bu script'in **blog** kullanıcısı tarafından **her hafta pazartesi günü saat 17:30'da** çalıştırılmasını istiyor olalım.

**backupScript.sh :**  
```bash
	#!/usr/bin/env bash
	TIME=`date +%b-%d-%y`
	FILENAME=backup-$TIME.tar.gz
	SRCDIR=*
	DESDIR=Backups
	tar -cpzf $DESDIR/$FILENAME $SRCDIR
```

İlk olarak blog kullanıcısına geçiş yapalım.
```bash
	$ su blog
```

Ardından bu kullanıcıya ait crontab dosyasını açalım.
```bash
	$ crontab -e
```

<p align="center"> 
	<img src="/images/cron-ile-zamanlanmis-gorevler/5.png">
</p>

Dosya açıldığında aşağıdaki gibi boş bir crontab dosyası görüyoruz.

<p align="center"> 
	<img src="/images/cron-ile-zamanlanmis-gorevler/6.png">
</p>

Ardından şu satırı ekleyelim :
```bash
	30 17 * * 1 /home/blog/backupScript.sh
```

<p align="center"> 
	<img src="/images/cron-ile-zamanlanmis-gorevler/7.png">
</p>

Ardından kayıt edip ve çıkalım.

<p align="center"> 
	<img src="/images/cron-ile-zamanlanmis-gorevler/8.png">
</p>

İşlem bu kadar basit. Artık sunucuda **her pazartesi 17:30'da** betiğin çalıştırıldığı klasördeki tüm verilerin backup'ı alınacak.

<p align="center"> 
	<img src="/images/cron-ile-zamanlanmis-gorevler/9.png">
</p>