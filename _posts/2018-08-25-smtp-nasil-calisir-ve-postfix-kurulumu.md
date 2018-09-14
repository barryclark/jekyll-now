---
layout: post
title: "SMTP Nasıl Çalışır ve Postfix Kurulumu"
tags: [GNU/Linux]
subtitle: "lyk18'de yapılan postfix anlatımının bir özeti."
---

***Yazan: [boratanrikulu](https://github.com/boratanrikulu)***

**Kaynaklar**  
LYK'18 - GNU/Linux Sistem Yönetimi 2. Düzey [**[Erdem Bayer]**](https://www.linkedin.com/in/erdem-bayer-1633915/) [**[Murathan Bostancı]**](https://www.linkedin.com/in/murathanbostanci/)

**NOT 1:** Eksik ya da yanlış gördüğünüz yerler için Pull Request atabilirsiniz [**[0]**](https://github.com/boratanrikulu/boratanrikulu.github.io/tree/master/_posts)  
**NOT 2:** Yazı ile ilgili düşüncelerinizi yorum yazarak belirtirseniz sevinirim **:)**

---

## SMTP Nedir ?

**Simple Mail Transfer Protocol**, yani SMTP, ilk olarak 1982'de [**RFC 821**](https://tools.ietf.org/html/rfc821)'de tanımlanmıştır.  
Günümüzde kullanılan **Extended SMTP** ise, 2008'de güncellenerek [**RFC 5321**](https://tools.ietf.org/html/rfc5321)'de tanımlanmıştır.

**25/TCP** portunu kullanan SMTP, e-posta göndermek için sunucu ile istemci arasındaki iletişimi belirleyen protokoldür. [**[1]**](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol)  

---

## Bir E-Mail'in Yapısı

<p align="center"> 
	<img src="/images/smtp-nasil-calisir-ve-postfix-kurulumu/4.png">
</p>

Bir mail iki kısımdan oluşur;

- **Header**
- **Body**

**Header** kısmında mail ile ilgili bilgiler tutulur; nereden geldiği, nereye gideceği, yollanım tarihi, mail konusu gibi.. Ama bunlardan sadece iki tanesi zorunludur; nereden geldiği ve nereye gideceği.. Yani **From** ve **To** bilgileri haricinde diğer bilgilerin doldurulması SMTP için zorunluluk değildir.

Diğer bir kısım olan **Body**, yollanacak mesajı saklayan bölümdür. Bu bölüm için bir zorunluk yoktur. Dolu veya boş olması SMTP açısından bir sorun değildir.

---

## Bir E-Mail Nasıl Hedefe Ulaşır ?

<p align="center"> 
	<img src="/images/smtp-nasil-calisir-ve-postfix-kurulumu/1.png">
</p>

**admin@boratanrikulu.me** kullanıcısının **elun.musk@spacex.com** kullanıcısına mail atmak istediğini düşünelim.

Bu durumda client tarafından mail yollandığında, mail ilk olarak [**boratanrikulu.me**](https://boratanrikulu.me)'nin mail server'ına gidecektir. Bu **server bilgisi DNS sorgusunda bulunan MX kaydı ile tespit edilir**. Yani mail yollanacağında MX kaydı sorgusu yapılır ve mail ona göre ilgili server'a yollanır.  

Mail'in server'a yollanma işlemi SMTP protokolü ile gerçekleşir. Bu aşamada eğer server'da gerekli konfigürasyon yapıldıysa; mail'i yollayan kişi gerçekten [**boratanrikulu.me**](https://boratanrikulu.me) kullanıcısı mı, gönderilen mail'de istenmeyen veri ya da text var mı gibi bazı kontroller yapılabilir, ama bunların hiç biri aslında bir zorunluluk değildir.  

**From** ve **To** kısımlarının dolu olması yeterlidir, bunların herhangi bir şekilde doğrulunun yapılması zorunluluk değildir. Ama tabiki günümüz mail servisleri tarafından bu kontroller yapılacaktır. Fakat söylediğim gibi, **bu kontrollerin yapılması bir zorunluluk değildir** SMTP protokolü için.

Mail, server tarafından alındıktan sonra bir **envelope**'a (zarf) konur. Mail, server'lar arasında bu envelope içersinde iletilir.

---

<p align="center"> 
	<img src="/images/smtp-nasil-calisir-ve-postfix-kurulumu/2.png">
</p>

[**boratanrikulu.me**](https://boratanrikulu.me/) mail server'ı tarafından mail, [**spacex.com**](https://www.spacex.com/) mail server'ına SMTP protokolü kullanılarak yollanır. Bu aşamada mail direkt olarak hedef server'a ulaşacak diye bir şey yoktur. **Mail yollanırken araya başka server'lar girebilir** ve mail bu şekilde iletilir. Ya da iletilemeyebilir. Yani **yolda mail kaybolabilir**. Bu yüzden gerekli testlerin yapılması önemli bir husustur.  

**SMTP mail'in hedefe kesinlikle varacağını tahattüt etmez.**

Mail'in hangi server'lardan geçtiği **envelope header**'a bakılarak tespit edilebilir.

Mail [**spacex.com**](https://www.spacex.com/)'a ulaştığında hedef sistem tarafından bazı kontroller yapılabilir. Fakat bunların hiç biri zorunlu değildir. Hatta kontrol yapılmasını geçelim, server'lar tarafından direkt olarak header ve body kısımları değiştirilebilir. Bunun engellenmesi amacıyla **SSL** şifreleme yapılması önemlidir.

Şöyle düşünün, elimizde temel konfigürasyon haricinde bir ek ayar, kontrol yapılmamış iki tane mail server'ı olsun. Bu durumda hiç bir kontrol yapılmadığı için istediğimiz mail adresini **From** kısmıda belirterek, hedefdeki mail server'ına yollayabiliriz ve hedefteki kullanıcı sanki bizim yazdığımız kullanıcıdan gelmişçesine bu mail'i alır. Bunun bir örneğini anlatımın ilerki kısımlarında mevcuttur.

---

Genel olarak, gerekli konfigürasyon ayarları yapılmış bir mail server'ında aşağıdaki gibi kontroller yapalabilir.

- **Gri liste** ile mail'i yollayan kullanıcının kontrolü
- Mail'in geldiği mail adresinin alan adının, **reverse dns** adresinin kontrolü
- Mail **SPF** kaydındaki bir server'dan mı geliyor kontrolü
> SPF (**Sender Policy Framework**) mail server'ı tarafından kabul edilecek mail server'larının kaydını tutar.
- Mail'in geldiği server, **domain key** ile örtüşüyor mu kontrolü
- Mail'i gönderen adres, **RBL** (kara liste) altında var mı kontrolü
- **Header** ve **Body** kısımlarının kontrolü (Saat, başlık, belli kelimeler)
- **Content Security** (virüs taraması) ve **spam** kontrolü yapılır.

Eğer bu ve benzeri kontrolleri geçerse; ya da kontrol olmayan bir mail server'ı ise, hedef kullanıcının dizinine mail teslim edilir.

---

## E-Mail'in Kullanıcı Tarafından Teslim Alınması

<p align="center"> 
	<img src="/images/smtp-nasil-calisir-ve-postfix-kurulumu/3.png">
</p>

Bir kullanıcı e-mail server'ından mail'lerini almak istediğinde bunu iki yol ile yapabilir;  

- **POP**
- **IMAP**

POP yani **Post Office Protocol** ile mail'ler server'dan client cihazına (local) çekilir. Aynı bir posta ofisi gibi çalışır. Gelen mail olduğunda, mail fiziksel olarak cihaza alınır.  

IMAP yani **Internet Messaged Access Protocol** ile ise client üzerine alınmadan direkt olarak server ile iletişim kurularak görüntülenir.

---

## Postfix Kurulumu

**NOT:** Anlatım için **CentOS 7** tercih edilmiştir.

Bu örnekte [**boratanrikulu.me**](https://boratanrikulu.me) server'ı için basit bir mail servisinin nasıl yapılandırıldığındığı göreceksiniz. Bu anlatımı uygulayarak takip edebilmek için elinizde bir domain ve server olması gerekmektedir. Elinizde yok ise de yalnızca okuyarak da anlatıma katılabilirsiniz.

Anlatımda domain servisi için [**namecheap**](https://www.namecheap.com/)'i tercih ettim. Siz farklı şirketleri tercih edebilirsiniz, DNS ayarları menusu hepsinde benzer olacaktır.

---

#### MX Kaydının Hazırlanması

Mail yollanması sırasında MX kaydından mail server'ı tespit edildiği için **DNS'in SMTP için hayati önemi vardır**. Bu yüzden ilk olarak [**boratanrikulu.me**](https://boratanrikulu.me) domain'i için MX kaydı olarak server IP'mizi girmeliyiz aşağıdaki örnekteki.

<p align="center"> 
	<img src="/images/smtp-nasil-calisir-ve-postfix-kurulumu/5.png">
</p>

Yapılan değişikliğin işlenmesi bir süre alabilir. Süreci hızlandırmak içiv TTL süresini düşürebilirsiniz. İşlemin başarılı şekilde gerçekleştiğini tespit etmek için aşağıdaki gibi MX kaydına bakabilirisiniz.

<p align="center"> 
	<img src="/images/smtp-nasil-calisir-ve-postfix-kurulumu/6.png">
</p>

---

#### Server'da Temel Ayarların Yapılması

MX kaydını ekledikten sonra artık server'ı yapılandırmaya başlayabiliriz. İlk olarak hostname'i ayarlamak ile başlıyoruz.

Şuanki **hostname**'i görmek için aşadağıdaki komutu yürütebilirsiniz.
```bash
hostnamectl status
```

Ardından MX kaydına eklediğimiz adresi hostname olarak set edelim.
```bash
hostnamectl set-hostname mail.boratanrikulu.me  
```

Ayrıca **/etc/hosts** dosyasına aşağıdaki gibi bir satır ekleyin
```bash
vim /etc/hosts
```
```
127.0.0.1 mail mail.boratanrikulu.me
```

Server **saat ayarları** da mail servisleri için önemlidir. Karışıklılığı önlemek adına saat ayarlarından emin olalım. Aşağıdaki gibi güncel saat ayarlarına bakabilirisiniz.
```bash
timedatectl status
```

Eğer saat ayarlarında bir sorun var ise aşağıdaki gibi **timezone** değiştirebilirsiniz.
```bash
timedatectl list-timezones | grep Istanbul
```

```bash
timedatectl set-timezone Europe/Istanbul
```

Ayrıca server'lardan saat kaymaları yaşanabilir, saniyelik olarak kaymaların bile kötü etkileri olacaktır. Bunu engellemek için **NTP** kullanacağız, aşağıdaki gibi kurup başlatabilirsiniz.
```bash
yum install ntp
```
```bash
systemctl start ntpd && systemctl enable ntpd
```

Ardından aşağıdaki gibi durum sorgusu yapabilirsiniz.
```bash
ntpq -pn
```

---

#### Postfix Kurulumu ve Default Ayarlar ile Birkaç Test

Artık postfix kullanıma geçebiliriz. Eğer **postfix** ve **telnet** kurulu değilse aşağıdaki gibi kurun.
```bash
yum install telnet postfix
```

Ben bu mail servisini bilgilendirme amaçlı kullanıcağım için **info** ve **request** isimli kullanıcıları ekliyorum. Siz kendinize göre farklı yapabilirsiniz.
```bash
adduser info
```
```bash
adduser request
```

Artık postfix kullanıma geçebiliriz. Telnet ile bağlanalım.
```bash
telnet mail.boratanrikulu.me smtp
```

Bu örnekteki amacımız **info@mail.boratanrikulu.me** kullanıcısından **root@mail.boratanrikulu.me** kullanıcısına mail atmak. Bu sayede hiç bir konfigürasyon yapılmamış mail server'ını test edebileceğiz.

SMTP protokolünde ile yapılması gereken selamlamadır. Aşağıdaki gibi server'ı selamlayım. 
```bash
EHLO mail.boratanrikulu.me
```
Mail'i kimin yolladığı, yani **From** kısmı aşağıdaki gibi belirtilir.
```bash
MAIL FROM:info@mail.boratanrikulu.me
```
Mail'i kimin alacağı, yani **To** kısmı ise aşağıdaki gibi belirtilir.
```bash
RCPT TO:root@mail.boratanrikulu.me
```
Yollanacak mesajı girebilmek için, yani **body** kısmı bilgilerini girebilmek için DATA diyerek bunu belirtmemiz gerekir.
```bash
DATA
```
Artık yollanacak mesajı girebiliriz. Ben aşağıdaki gibi bir örnek mesajı girdim.
```
mail from info to root.
```
Body kısmına girilen verinin bittiğini belirtmek için tek satırda **"."** yazıp belirtmemiz gerekir.
```bash
.
```
Artık telnet bağlantımızı sonlandırabiliriz.
```bash
QUIT
```
Default ayarlara göre mail'ler **/var/spool/mail** dizini altında kullanıcılara ait dosyalara yazılır. Yani her mail için ayrı dosyalar oluşturmak yerine tek bir dosya içersinde tutulur. Bunun belli avantajları ve dezavantajları vardır.

Tekli dosyaya yazma işlemine **MBOX** denir. Her mail için ayrı oluşturulması amacıyla ise **Maildir/** kullanılır. MBOX'un Maildir'e göre farkları aşağıdaki gibidir.

- **Avantajları**

	- MBOX'da **sıralı işler hızlıdır** çünkü mail'ler tek dosya üzerinden, aç kapa yapmadan, direkt olarak okunur.  
	- **Yedekleme** işlemi daha **kolaydır**.  
	- Tarihe göre **sıralama hızlıdır**.
	- E-mail'e **müdahale edilmesi** gerektiğinde bütün e-mail dosya okunması gerekir yani daha **yavaştır**. 
	- **Arama** işlemleri **hızlıdır**.
	- E-mail **taşıma** işlemi daha **hızlı ve kolaydır**.

- **Dezavantajları**

	- Diğer header'lara göre **sıralama daha yavaştır**.
	- **Silme** işlemleri daha **yavaştır**.
	- Dosya **bozulma risk daha büyüktür**.
	- Bir çok deamon'ın dosya üzerinde işlem yapması, **süreçler arası bekleme durumu doğurur**, performans düşer.

Default ayarlar ile MBOX kullanıdığı için az önceki örnekte yolladığımız e-mail'i aşağıdaki gibi görüntüleyebiliriz.
```bash
ls /var/spool/mail
```
```bash
less /var/spool/mail/root
```

---

#### Elun Musk'dan Gelen Mail

Daha önceden de belirttiğim gibi, default ayarlarda aslında yapılmasını bekleyeceğimiz hiçbir kontrol yapılmaz. Örneğin aşağıdaki gibi bir mail'i sanki **elun.musk@spacex.com**'dan root kullanıcısına yollanmış gibi atarsak; bu mail kullanıcıya sanki Elun Musk tarafından gelmiş gibi ulaşacaktır.  

**Evet! Yanlış duymadın, default ayarlar ile durum bu şekilde.**

```bash
telnet mail.boratanrikulu.me smtp
```
```
EHLO mail.boratanrikulu.me
```
```
MAIL FROM:elun.musk@spacex.com
```
```
RCPT TO:root@mail.boratanrikulu.me
```
```
DATA
```
```
i have a job offer for you. are you interested ?
```
```
.
```
```
QUIT
```
```bash
less /var/spool/mail/root
```

Gördüğünüz gibi, Elun Musk tarafından bir iş teklifi aldım **:)**.

<p align="center"> 
	<img src="/images/smtp-nasil-calisir-ve-postfix-kurulumu/7.png">
</p>

---

## Postfix Anatomy

<p align="center"> 
	<img src="/images/smtp-nasil-calisir-ve-postfix-kurulumu/0.png">
</p>

Postfix bir çok modülün birleşmesi ile oluşan bir yapıdır. [**[2]**](http://www.porcupine.org/postfix/doc/big-picture.html)

Her şey ayrı bir parça olarka çalışır. Örneğin mail gönderilmesi bozulsa bile, mail alımı işlemi devam edebilir. Her servisin durumu ayrı ayrıdır.

**qmgr**, active kuyruğundan mailleri alır. Eğer kendi kullanıcısına gelmiş ise local daemon'na verir.

Eğer başka bir smtp'ye aktarılacak ise **smtp daemon**'a verilir, bu şekilde mail iletilir.

**pipe**, üçüncü parti yazılımlara çıktıları, girdi olarak vermek için kullanılır. Virüs taraması, spam kontrol, dosya gönderimlerini silmek gibi..

---

## Postfix'in Yapılandırılması

Artık [**boratanrikulu.me**](https://boratanrikulu.me) için kullanacağımız basit bir bilgilendirme mail servisini hazırlamaya başlayabiliriz. Mail'leri saklamak için çoklu dosya yolunu tercih edeceğiniz.  

Sistemimizde mail için kullanacağımız iki kullanıcı olacak; **info** ve **request**.

**info@mail.boratanrikulu.me** kullanıcısı, bilgilendirme mail'lerinin atılabilmesi amacıyla kullanılacaktır. Bu mail adresi için mail kabul edilmeyecektir, yalnızca mail yollanması amacıyla kullanılacaktır.

**request@mail.boratanrikulu.me** kullanıcısı ise; site kullanıcılarının öneri ve isteklerini belirtmek amaçlı atacağı mail'leri kabul edebilmek amacıyla kullanılacaktır. Bu mail adresinden mail atılması düşünülmemektedir, mail kabul edecektir.

---

Yukarda bahsettiğimiz isteklerimizi uygulayabilmek amacıyla, konfigürasyona başlayabiliriz. Postfix için iki temel ayar dosyası vardır; **main.cf** ve **master.cf**. Bunlar /etc/postfix altında bulunur.

```bash
vim /etc/postfix/main.cf
```

Değişikleri direkt olarak dosyanın en alt satırına ekleyebilirisiniz ama bunu önermem. Daha düzenli olması açısından lütfen aşağıdaki değişiklikleri ilgili satırları bulup yapınız. Bu aşamaları tek tek yazmıyorum, arayıp değiştirmelisiniz **:)**.

Eğer **myhostname** set edilmez ise sistemin hostname'ni kullanır. Biz **myhostname** ve **mydomain**'i aşağıdaki gibi belirleyelim. 
```
myhostname = info.boratanrikulu.me
```
```
mydomain = boratanrikulu.me
```  

**myorigin** dışarı yollanacak mail'ler için kullanılacak adresi belirlemek amacıyla kullanılır.. Biz **myorigin** olarak hostname'i kullanacağız.
```
myorigin = $myhostname
```

**inet_interfaces** hangi interface'lerden mail kabul edileceğini belirler. Biz tüm interface'leri kabul etmek istiyoruz. Bu değeri **"all"** yapalım.
```
inet_interfaces = all
```

**mydestination** ile hangi alan adları için mail kabul edileceği belirlenebilir. Aşağıdaki gibi belirleyelim.
```
mydestination = $myhostname, localhost.$mydomain, localhost
```

**local_recipient_maps** ile kullanıcı bazlı işlemleri sağlayabiliriz, biz **info** kullanıcısına mail atılmasını istemiyoruz. Yalnızca **request** kullanıcısı için dışarıdan mail atılabilsin istiyoruz, bu amaçla aşağıdaki satırı eklemeliyiz.

```
local_recipient_maps = hash:/etc/postfix/local_recipients, $alias_maps
```

**home_mailbox** ile mail'lerin kullanıcılara nasıl teslim edileceğini belirleyebiliriz. Bu şekilde her kullanıcının home dizini altına mail teslim edilir. Eğer **Maildir** olarak ayarlanır ise tek bir dosya üzerine mail'ler yazılır, eğer **Maildir/** olarak ayarlanırsa her mail için ayrı dosya oluşturulur. Biz her mail için ayrı dosya oluşturulmasını istiyoruz, bu sebeple aşağıdaki gibi yapalım.
```
home_mailbox = Maildir/
```

**Recipients** amacıyla girdiğimiz ayar için dosya oluşturmalıyız, aşağıdaki gibi oluşturuabilirsiniz.
```
echo "request@mail.boratanrikulu.me OK" > /etc/postfix/local_recipients
```

```bash
postmap /etc/postfix/local_recipients
```

Yapacağımız ayarlar bu kadar. Dosya kayıt edip çıkabiliriz. **inet_interfaces** ayarlarını değiştirdiğimiz için servisi kapatıp tekrar açmamız gerekiyor.
```bash
systemctl restart postfix
```

---

**Maildir/** kullanacağımız için kullanıcı dizinleri altında bir Maildir klasörü olmalı, aşağıdaki gibi oluşturabilirsiniz.

```bash
mkdir /root/Maildir
```

```bash
mkdir /home/info/Maildir
```

```bash
chown -R info:info /home/info/Maildir
```

```bash
mkdir /home/request/Maildir
```

```bash
chown -R request:request /home/request/Maildir
```

Bazı kullanıcılara gelen mail'leri başka bir kullanıcının dizinine bırakmak için **/etc/aliases** kullanılır. Bizim kullanmak istediğimiz **info** kullanıcısı default ayarlarda *root* kullanıcısına yönlendiriliyor. Biz bunu istemediğimiz için o satırı aliases dosyasında yorum satırına alalım. Eğer bu işlemi yapmazsak, info kullanıcısına gelen tüm mail'ler root kullanıcısına yönelendirilir.

**Not:** Biz "request" kullanıcısı haricinde hiç bir kullanıcı için mail kabul etmediğimiz için bu adım gereksiz olabilir. Ben düzenli olması açısından yine de yapma gereği duydum.

```bash
vim /etc/aliases
```

Yorum satırına aldıktan sonra aşağıdaki komutu yürütün.
```bash
postalias /etc/aliases
```

---

#### Birkaç Test

Şimdi bir test yapalım. **info@mail.boratanrikulu.me** kullanıcısı ile bir gmail hesabına bilgilendirme mail'i atalım.

```bash
telnet mail.boratanrikulu.me smtp
```
```bash
EHLO mail.boratanrikulu.me
```
```bash
MAIL FROM:info@mail.boratanrikulu.me
```
```bash
RCPT TO:boratanrikulu@gmail.com
```
```bash
DATA
```
```
Hello there! SMTP post is ready! Read it!
https://boratanrikulu.me/smtp-nasil-calisir-ve-postfix-kurulumu
```
```bash
.
```

Mail muhtemelen spam klasörüne düşecektir. Aşağıda gözüktüğü bir sorun ile karşılaşmadık.

<p align="center"> 
	<img src="/images/smtp-nasil-calisir-ve-postfix-kurulumu/8.png">
</p>

---

Bir de **request** kullanıcısı için bir test yapalım. **boratanrikulu@gmail.com** kullanıcısından bir istek mail'i atalım.

<p align="center"> 
	<img src="/images/smtp-nasil-calisir-ve-postfix-kurulumu/9.png">
</p>

Aşağıda gözüktüğü gibi mail sorunsuz bir şekilde server'a ulaştı.

<p align="center"> 
	<img src="/images/smtp-nasil-calisir-ve-postfix-kurulumu/10.png">
</p>
