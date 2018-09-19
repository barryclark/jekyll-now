---
layout: post
title: "LDAP Nedir ? Örnek Bir Uygulama."
tags: [GNU/Linux]
subtitle: "lyk18'de yapılan ldap anlatımının bir özeti."
---

***Yazan: [boratanrikulu](https://github.com/boratanrikulu)***

**Kaynaklar**  
LYK'18 - GNU/Linux Sistem Yönetimi 2. Düzey [**[Aydın Doyak]**](https://twitter.com/aydintd)  


**NOT 0:** Ldif dosyalarının syntax'ına hakim olmak oldukça zor, ben de hakim değilim.  
Konfigürasyon dosyaları, Aydın Doyak'tan alınmıştır.  
[**aydintd.net/centos-7de-openldap-sunucu-kurulumu-ve-ayarlanmasi/**](https://aydintd.net/centos-7de-openldap-sunucu-kurulumu-ve-ayarlanmasi/)

**NOT 1:** Eksik ya da yanlış gördüğünüz yerler için Pull Request atabilirsiniz [**[0]**](https://github.com/boratanrikulu/boratanrikulu.github.io/tree/master/_posts)  
**NOT 2:** Yazı ile ilgili düşüncelerinizi yorum yazarak belirtirseniz sevinirim **:)**

---

## Directory (Dizin) Nedir ?

Dizin, belirli türden nesnelerden oluşan küme ve bu küme üzerinde sorgu yapılması imkanı veren bir yapı olarak özetlenebilir. **Aslında dizin bir veritabanıdır.** Örneğin bir network'teki cihazlar hakkında bilgilerin tutulması amacıyla kullanılabilir.

Veritabanlarından farklı olarak; dizinde veriler belirli bir hiyerarşiye göre tutulur. Bu sebeble arama ve okuma işlemleri aynı işi yapan bir veritabanı uygulamasına gore daha performanslıdır olabilir.

Dizinde rollback, transaction gibi **kompleks işlemler desteklenmez**.

Dizin daha çok **dağıtık çalışmaya ihtiyaç duyan uygulamalar için tercih edilir**. Kurumsal e-mail adres defteri, DNS sistemi gibi..

Tanım kaynağı: [**[1]**](http://www.bilgisayarmuhendisleri.com/sayfa.aspx?s=60)

---

## LDAP Nedir ?

LDAP, yani **Lightweight Directory Access Protocol**, önceden **X.500** olarak tanımlanmış dizin erişim protokolünün hafifletilmiş bir sürümüdür.

İletişim protokolü olarak TCP/IP'yi kullanır.

---

## Bir Örnek Üzerinden Açıklanması

<p align="center"> 
	<img src="/images/ldap-nedir-ornek-bir-uygulama/1.png">
</p>

Genel olarak tanım üzerinden LDAP'ın kullanım amacı anlaşılamamış olabilir.

Şöyle hayal edin; 100 tane çalışanı olan bir şirket olsun. Bu şirkette her çalışan için bir bilgisayar olmalı. Yani elimizde **100 tane client** olacak. Bu şirkete her yeni bir çalışan alındığında/değiştirildiğinde, ilgili bilgisayarda kullanıcı bilgilerinin değiştirilmesi gerecek. Bu işlemi her seferinde local bilgisayar üzerinden yapılması gereksiz bir iş yükü yaratacaktır. İşte bu durumda LDAP kullanılabilir.

Kullanıcı bilgileri local bilgisayarlar üzerinde tutmak yerine merkezi bir server üzerinden tutulur ve tüm client'lar kullanıcı bilgilerini bu LDAP server'ı üzerinden çeker. Eğer bir çalışan değişikliği yapılacak ise de direkt merkezi server üzerinden kolaylıkla yapılabilir.

Biz de bu anlatımda, örnekteki durumu baz alarak, kullanıcı bilgilerini saklayabileceğimiz bir LDAP server'ı hazırlayacağız.

---

## Server'ın Hazırlanması

**NOT :** Anlatım için CentOS 7 tercih edilmiştir.

İlk olarak aşağıdaki gibi **hostname**'i ayarlayalım.
```bash
[root@ldap ~#] hostnamectl set-hostname ldap.boratanrikulu.me
```

Ayrıca **/etc/hosts** dosyasına aşağıdaki gibi bir satır ekleyin.
```
127.0.0.1    ldap ldap.boratanrikulu.me
```

LDAP **port** olarak 389'u kullanır. LDAPS ise port olarak 636'yı kullanır.  
Aşağıdaki gibi güvenlik duvarında gerekli izinleri verelim.
```bash
[root@ldap ~#] firewall-cmd --permanent --zone=public --add-service=ldap
```
```bash
[root@ldap ~#] firewall-cmd --permanent --zone=public --add-service=ldaps
```
```bash
[root@ldap ~#] firewall-cmd --reload
```

Herşeyin yolunda gittiğinden emin olmak için aşağıdaki gibi güvenlik duvarı kurallarına göz atabilirsiniz.
```bash
[root@ldap ~#] firewall-cmd --zone=public --list-all
```

---

## OpenLDAP Kurulumu

Aşağıdaki gibi OpenLDAP'ı kuralım.
```bash
[root@ldap ~#] yum install openldap-servers openldap-clients openldap
```

Ardından default olan DB_CONFIG dosyasını kullanım için ayarlayalım.
```bash
[root@ldap ~#] cp /usr/share/openldap-servers/DB_CONFIG.example /var/lib/ldap/DB_CONFIG
```
```bash
[root@ldap ~#] chown ldap:ldap /var/lib/ldap/DB_CONFIG
```

Artık servisi başlatabiliriz.
```bash
[root@ldap ~#] systemctl start slapd
```
```bash
[root@ldap ~#] systemctl enable slapd
```

Herhangi bir sorun olup olmadığını kontrol etmeyi de unutmayalım.
```bash
[root@ldap ~#] systemctl status slapd -l
```

LDAP ayarlamalarında iki farklı yol vardır. Bunlardan ilki her bir ayar için ldif dosyaları oluşturmak ve daha sonra LDAP üzerinden ilgili işlemleri yapılması. İkincisi /etc/openldap/slapd.d altında ayrı ayrı config dosyaları oluşturmak. OpenLDAP geliştiricileri ilkini tavsiye ediyor, biz de öyle yapacağız.

Yapacağımız işlemlerde ayarlar için ldif dosyaları oluştaracağız ve ardından database'e bu dosya üzerinden ayarları basacağız.

---

## Ağaç Yapısının Hazırlanması ve Temel Konfigürasyon

Ldap'da default olarak parola ayarlanmamış halde gelir. Parola set edebilmek için bir ldif dosyası oluşturacağız. Bu dosyaların nerede olduğunun bir önemi yok, ben düzenli olması açısından **ldif_files** isimli bir dosyada saklayacağım.

```bash
[root@ldap ~#] mkdir /root/ldif_files
```

Parola set edebilmek için elimizde hash'lenmiş halinin bulunması gerekir. Bu işlemi **slappasswd** ile yapabiliriz. Bunun ile birlikte girilen parolanın özet fonksiyonu alınabilir.
```bash
[root@ldap ~#] slappasswd
```

Ardından aşağıdaki gibi bir dosya oluşturun
```bash
[root@ldap ~#] vim /root/ldif_files/change_password.ldif
```

Yapacağımız değişiklik için 4 adet bilgi girmeliyiz;  

ağaç bilgisi **dn**,  
işlem türü **changetype**,  
işlemin nereye yapılacağı **add**,  
değer **olcRootPw**.. 

Bunlar için aşağıdaki satırları özet fonksiyonu kısmını değiştirdikten sonra dosyaya kopyalayın ve kayıt edin.

```
dn: olcDatabase={0}config,cn=config
changetype: modify
add: olcRootPW
olcRootPW: {SSHA}RO3LgVGv4emLElZbjKtCwBBYdKqz4mej
```

Şimdi yaptığımız değişikliği basalım. Bunun için aşağıdaki gibi bir yapı kullanılır. Burada ldapi:/// olarak gösterilen bir socket'tir.
```bash
[root@ldap ~#] ldapadd -Y EXTERNAL -H ldapi:/// -f /root/ldif_files/change_password.ldif
```

İşlemin ardından aşağıdaki gibi bir çıktı gözlemleriz.

>	SASL/EXTERNAL authentication started
	SASL username: gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth
	SASL SSF: 0
	modifying entry "olcDatabase={0}config,cn=config"

---

Default olarak gelen bazı **schema**'lar vardır. Bunlar /etc/openldap/schema/ altında bulunur. Bunların bazılarının sisteme işlenmesinde fayda vardır. Bunları aşağıdaki gibi basalım.

Doküman bilgileri için
```bash
[root@ldap ~#] ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/cosine.ldif
```

Sistem bilgileri için 
```bash
[root@ldap ~#] ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/nis.ldif
```

Kullanıcı bilgileri için
```bash
[root@ldap ~#] ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/inetorgperson.ldif 
```

Parola sınırlamaları yapmak için
```bash
[root@ldap ~#] ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/ppolicy.ldif
```

---

LDAP domain adı ile paralel çalışır. Bu yüzden domain adı ayarları önemldir. Bu ayarlar için aşağıdaki gibi bir ldif dosyası oluşturalım.
```bash
[root@ldap ~#] vim /root/ldif_files/change_domain.ldif
```

Domain adının gösterim şekilde şu şekildedir;

**cn**, yani kullanıcı  
**dc**, domain adı  
**dc**, domain uzantısı

Dosyayı domain ve özet fonksiyon bilgilerini değiştirerek aşağıdaki gibi oluşturun.  

Bu ldif dosyası ile ağaç için yöneticinin (manager) ayarlanması sağlayacağız ve ilgili parolayı set edeceğiz. Ayrıca yönetici haricindeki diğer kullanıcıların yetkisi sınırlayacağız.

```
dn: olcDatabase={1}monitor,cn=config
changetype: modify
replace: olcAccess
olcAccess: {0}to * by dn.base="gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth"
  read by dn.base="cn=admin,dc=boratanrikulu,dc=me" read by * none

dn: olcDatabase={2}hdb,cn=config
changetype: modify
replace: olcSuffix
olcSuffix: dc=boratanrikulu,dc=me

dn: olcDatabase={2}hdb,cn=config
changetype: modify
replace: olcRootDN
olcRootDN: cn=admin,dc=boratanrikulu,dc=me

dn: olcDatabase={2}hdb,cn=config
changetype: modify
add: olcRootPW
olcRootPW: {SSHA}RO3LgVGv4emLElZbjKtCwBBYdKqz4mej

dn: olcDatabase={2}hdb,cn=config
changetype: modify
add: olcAccess
olcAccess: {0}to attrs=userPassword,shadowLastChange by
  dn="cn=admin,dc=boratanrikulu,dc=me" write by anonymous auth by self write by * none
olcAccess: {1}to dn.base="" by * read
olcAccess: {2}to * by dn="cn=admin,dc=boratanrikulu,dc=me" write by * read
```

Ardında kuralımızı database'e işleyelim.
```bash
[root@ldap ~#] ldapmodify -Y EXTERNAL -H ldapi:/// -f /root/ldif_files/change_domain.ldif
```

---

Artık LDAP ağacımızı yapılandırmaya başlayabiliriz. Biz **People** ve **Group** isimli iki tane Orginazsyon Unit'i oluşturmak istiyoruz.

```bash
[root@ldap ~#] vim /root/ldif_files/basedomain.ldif
```

```
dn: dc=boratanrikulu,dc=me
objectClass: top
objectClass: dcObject
objectclass: organization
o: boratanrikulu
dc: boratanrikulu

dn: cn=admin,dc=boratanrikulu,dc=me
objectClass: organizationalRole
cn: Admin
description: Directory Manager

dn: ou=People,dc=boratanrikulu,dc=me
objectClass: organizationalUnit
ou: People

dn: ou=Group,dc=boratanrikulu,dc=me
objectClass: organizationalUnit
ou: Group
```

Bu işlemi ağacımıza işlemek için aşağıdaki gibi bir yapı kullanmalıyız. Buradaki **Wx** ifadesi parola sorgusunun sağlanması içindir. **-D** ise hangi dn ile işlemin yapılacağını belirtir, bir nevi hangi yetki ile yapılacağı.
```bash
[root@ldap ~#] ldapadd -Wx -D cn=admin,dc=boratanrikulu,dc=me -f /root/ldif_files/basedomain.ldif 
```

Şuana kadar yaptığımız işlemler ile People ve Group olmak üzere iki adet Orginazsyon Unit'i olan boş bir ağaç oluşturmuş olduk.

Aslında şu ana kadar uğraştığımız yapıların genel görnümü şu şekilde;

<p align="center"> 
	<img src="/images/ldap-nedir-ornek-bir-uygulama/2.png">
</p>  

Aşağıdaki komut ile ağacığımızın tamamını görüntüleyelim. Bu komut ile **"dc=boratanrikulu,dc=me"** ağacının tamamını görütüleyebiliriz.
```bash
[root@ldap ~#] ldapsearch -Wx -D cn=admin,dc=boratanrikulu,dc=me -b "dc=boratanrikulu,dc=me"
```
ldapsearch -H ldaps:/// -Wx -D cn=admin,dc=boratanrikulu,dc=me -b "dc=boratanrikulu,dc=me"

---

## OpenLDAP'ın SSL ile Kullanılması

LDAP sunucumuzda SSL kullanmak için sertifika satın alabilir ya da kendimiz oluşturabiliriz. Biz bu anlatımda kendimiz bir SSL sertifikası oluşturacağız. Bunun için aşağıdaki adımları uygulayın.

```bash
[root@ldap ~#] cd /etc/pki/tls/certs/
```
```bash
[root@ldap certs#] echo "03" > file.srl
```
```bash
[root@ldap certs#] openssl req -out ca.pem -new -x509
```
```bash
[root@ldap certs#] openssl genrsa -out server.key 1024
```
```bash
[root@ldap certs#] openssl req -key server.key -new -out server.req
```
```bash
[root@ldap certs#] openssl x509 -req -in server.req -CA ca.pem -CAkey privkey.pem -CAserial file.srl -out server.pem
```

SSL sertifikamızı bu şekilde oluşturmuş olduk.  

Daha sonradan kullanacağımız dosyalar **ca.pem**, **server.pem**, **server.key** olarak /etc/pki/tls/certs dizini altında oluşturuldu.

Şimdi artık OpenLDAP'ı **ldaps** çalıştıracak şekilde ayarlayabiliriz.
```bash
[root@ldap ~#] vim /etc/sysconfig/slapd
```

SLAPD_URLS satırını aşağıdaki gibi güncelleyin.
```
SLAPD_URLS="ldapi:/// ldap:/// ldaps:///"
```

Ardından SSL ayarlamalarını yapmak için bir ldif dosyası oluşturalım.
```bash
[root@ldap ~#] vim /root/ldif_files/modify_ssl.ldif
```

ve dosyayı aşağıdaki gibi yapın.
```
dn: cn=config
changetype: modify
replace: olcTLSVerifyClient
olcTLSVerifyClient: allow
-
replace: olcTLSCACertificateFile
olcTLSCACertificateFile: /etc/pki/tls/certs/ca.pem
-
replace: olcTLSCertificateFile
olcTLSCertificateFile: /etc/pki/tls/certs/server.pem
-
replace: olcTLSCertificateKeyFile
olcTLSCertificateKeyFile: /etc/pki/tls/certs/server.key
# ldapmodify -Y EXTERNAL -H ldapi:/// -f mod_ssl.ldif
```

Bu işlemlerin ardından servisi yeniden başlatmalıyız.
```bash
[root@ldap ~#] systemctl restart slapd
```
```bash
[root@ldap ~#] systemctl status slapd -l
```

Artık **ldaps portu 636** da slapd tarafından dinleniyor olmalı.
```bash
[root@ldap ~#] netstat -ntlpd | grep "636"
```

Şimdi test amaçlı bir sorgu yapalım.
```bash
[root@ldap ~#] ldapsearch -H ldaps:/// -Wx -D cn=admin,dc=boratanrikulu,dc=me -b "dc=boratanrikulu,dc=me"
```

Eğer bu sorgu sonucunda aşağıdaki gibi bir hata alıyorsanız **"TLS_REQCERT allow"** satırını /etc/openldap/ldap.conf 'a ekleyin.
```
ldap_sasl_bind(SIMPLE): Can't contact LDAP server (-1)
```

---

## Grup Oluşturulması ve Kişi Eklenmesi

Artık kullanıcı bilgileri için gerekli ayarlamaları yapmaya başlayabiliriz.

İlk olarak gruplaro oluşturalım. Sistemde 3 grup olsun istiyoruz;

- **sysadmin** 
- **developer**
- **manager**

Aşağıdaki gibi bir ldif dosyası oluşturalım ve database'e işleyelim.
```bash
[root@ldap ~#] vim /root/ldif_files/add_groups.ldif
```
```
dn: cn=sysadmin,ou=Group,dc=boratanrikulu,dc=me
cn: sysadmin
objectClass: top
objectClass: posixGroup
gidNumber: 10000

dn: cn=developer,ou=Group,dc=boratanrikulu,dc=me
cn: developer
objectClass: top
objectClass: posixGroup
gidNumber: 11000

dn: cn=manager,ou=Group,dc=boratanrikulu,dc=me
cn: manager
objectClass: top
objectClass: posixGroup
gidNumber: 12000
```
```bash
[root@ldap ~#] ldapadd -Wx -D cn=admin,dc=boratanrikulu,dc=me -f /root/ldif_files/add_groups.ldif
```

Burada gidNumber'ı 10000'dan başlatma sebebimiz default sistem id'leri ile çakışma ihtimalini düşürmek istememizdir.

---

Artık kullanıcı ekleyebiliriz. **Bora Tanrıkulu** isimli bir kullanıcı ekleyelim. Kullanıcı parolası özet fonksiyonunu slappasswd ile oluşturabilirsiniz.  

Biz bu örnekte başka kullanıcı eklemeyeceğiz. Başka bir kullanıcı eklemek isterseniz **uidNumber**'ı artırmayı unutmayın. Ya da kullanıcı grubunu değiştirmek istiyorsanız **gidNumber**'ı değiştirin.

```bash
[root@ldap ~#] vim /root/ldif_files/add_boratanrikulu.ldif
```
```
dn: uid=boratanrikulu,ou=People,dc=boratanrikulu,dc=me
changetype: add
objectClass: inetOrgPerson
objectClass: top
objectClass: posixAccount
objectClass: shadowAccount
objectClass: organizationalPerson
objectClass: person
description: bora tanrikulu
cn: Bora Tanrikulu
sn: Tanrikulu
uid: boratanrikulu
uidNumber: 10001
gidNumber: 10000
homeDirectory: /home/boratanrikulu
mail: boratanrikulu@gmail.com
loginShell: /bin/bash
userPassword: {SSHA}RO3LgVGv4emLElZbjKtCwBBYdKqz4mej
```
```bash
[root@ldap ~#] ldapadd -Wx -D cn=admin,dc=boratanrikulu,dc=me -f /root/ldif_files/add_boratanrikulu.ldif
```

Ardından aşağıdaki gibi bir sorgu ile işlemlerin son halini görebiliriz.
```bash
[root@ldap ~#] ldapsearch -Wx -D cn=admin,dc=boratanrikulu,dc=me -b "dc=boratanrikulu,dc=me"
```

**NOT :** LDAP'ı terminal üzerinden kullanmak oldukça zor. Grafiksel çözümler arıyorsanız; **LDAP Account Manager** ya da **Apache Directory Studio**'a bakabilirsiniz. Ben bu anlatımda bunların kullanıma değinmeyeceğim.

---

## Client Tarafından Bilgilerin Çekilmesi

**Not :** Client olarak Debian kullanılmıştır.

Şimdi bir tane client tarafından ldap server'dan bu bilgileri çekelim. Bunun için bu kez bir **Debian** ayağa kaldıralım.

Ardından gerekli paketleri kuralım.
```bash
[client@boratanrikulu ~$] sudo apt install sssd sssd-ldap sssd-tools libpam-sss libnss-sss
```

Ve sssd.conf şeklinde bir dosya oluşturun ve içeriğini aşağıdaki gibi yapın.
```bash
[client@boratanrikulu ~$] sudo vim /etc/sssd/sssd.conf
```

```
[nss]
filter_groups = root
filter_users = root
reconnection_retries = 3
debug_level = 7

[pam]

debug_level = 7
reconnection_retries = 3

[sssd]
config_file_version = 2
reconnection_retries = 3
sbus_timeout = 30
services = nss, pam
domains = boratanrikulu.me

[domain/boratanrikulu.me]

id_provider = ldap
auth_provider = ldap

ldap_uri = ldaps://ldap.boratanrikulu.me
ldap_search_base = dc=boratanrikulu,dc=me
ldap_tls_cacert = /etc/ssl/certs/ca-certificates.crt

#This parameter requires that the DC present a completely validated certificate chain. If you're testing or don't care, use 'allow' or 'never'.
ldap_tls_reqcert = allow

ldap_force_upper_case_realm = true
ldap_user_search_base = ou=People,dc=boratanrikulu,dc=me
ldap_group_search_base = ou=Group,dc=boratanrikulu,dc=me
ldap_user_object_class = inetOrgPerson
ldap_user_name = uid
ldap_user_fullname = cn
ldap_user_home_directory = homeDirectory
ldap_user_email = mail 
ldap_group_object_class = posixGroup
ldap_group_name = cn

override_homedir = /home/%u
default_shell = /bin/bash

#Bind credentials
# ldap_default_bind_dn = cn=admin,dc=boratanrikulu,dc=me
# ldap_default_authtok = 123123
cache_credentials = true
enumerate = true
```

ldap.boratanrikulu.me şeklinde gerçekten de bir sunucu olmadığı için bunu /etc/hosts'a ekleyip yerini belirtmeliyiz. Aşağıdaki satırı /etc/hosts'a ekleyin.
```
192.168.2.218    ldap ldap.boratanrikulu.me
```

Kullanıcı Home dizinlerinin oluşturulması için aşağıdaki işlemleri de uygulayalım.
```bash
[client@boratanrikulu ~$] sudo vim /etc/pam.d/common-account
```
Aşağıdaki satırı dosyaya ekleyin.
```
account optional pam_mkhomedir.so skel=/etc/skel umask=0077
```

```bash
[client@boratanrikulu ~$] sudo vim /etc/pam.d/common-session
```
Aşağıdaki satırı dosyaya ekleyin.
```
session optional pam_mkhomedir.so skel=/etc/skel umask=0077
```

Artık servise restart çekebiliriz.
```bash
[client@boratanrikulu ~$] sudo systemctl restart sssd
```

Ardından aşağıdaki gibi test ettiğimizde sistemin sorunsuz çalıştığını görebiliriz.

<p align="center"> 
	<img src="/images/ldap-nedir-ornek-bir-uygulama/3.png">
</p> 

---

LDAP hakkında yazacaklarım şuan için bu kadar. LDAP çok detaylı bir konu, kendi öğrendiklerimi yazarak paylaşmak istedim, umarım faydalı olmuştur.

**NOT :** Yazı ile ilgili düşüncelerinizi yorum yazarak belirtirseniz sevinirim **:)**