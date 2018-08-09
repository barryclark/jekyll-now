---
layout: post
title: "Dosya ve Dizin İzinleri"
tags: [GNU/Linux]
subtitle: "izin işlemlerinin linux'da nasıl yapıldığını açıklar."
---

***Yazan: [boratanrikulu](https://github.com/boratanrikulu)***

**Kaynaklar**  
[wiki.archlinux.org/File_permissions_and_attributes](https://wiki.archlinux.org/index.php/File_permissions_and_attributes)  
[en.wikipedia.org/wiki/Chmod](https://en.wikipedia.org/wiki/Chmod)

---

## Dosya ve Dizininlerin Linux'daki Durumu

**Linux'ta her şey birer dosyadır**. [**[1]**](https://stackoverflow.com/a/10893965)

Özünde dizinler de dosyaların konumunu belirten birer özel dosyadır. Dizinler veri içeremez, yalnızca konum belirtmek amaçlı kullanılabilirler. Dizinlerin bir türü yoktur, uzantısı yoktur. Dosyaların ise bir türü vardır, uzantısı bulunabilir.

Dizin ve dosya isimleri aynı olamaz.

---

## Dosya ve Dizin İzinlerinin İncelenmesi

**ls** ile dosyaların izinleri incelenebilir.

```bash
	$ ls -l fileName
```

<p align="center"> 
	<img src="/images/dosya-ve-dizin-izinleri/0.png">
</p>

Dosya ve dizin işlemlerine bakıldığında 10 karakterden oluşan bir yapı görünür.

Bu karakterler  

- dosyalar için **r**[read] okumak, **w**[write] yazmak, **x**[execute] çalıştırmak  
- dizinler için **r**[read] içeriğini görüntüleyebilmek, **w**[write] alt dosya ve dizinler oluşturabilmek, **x**[execute] cd ile içine girebilmek

izinlerini temsilen kullanılır.
<br><br>
Bunları aşağıdaki gibi üçerli olarak gruplandırarak incelemekte fayda vardır.

<p align="center"> 
	<img src="/images/dosya-ve-dizin-izinleri/1.png">
</p>

Yani bu örnektekinin;  

- bir **dizin** olduğunu,
- dosya kullanıcısının **okuma/yazma/çalıştırma**,  
- dosya grubunun **okuma/çalıştırma**,  
- diğer herkesin de **okuma/çalıştırma**  

iznine sahip olduğunu görüyoruz.

---

## Chmod ile İzinlerin Düzenlemesi [Text Method]

Chmod'un 3 temel parametresi vardır, bunlar aşağıdaki gibidir.

| Parametre | Anlamı | Açıklama |
|:---------:|:--------:|:-------:|
| **-R**    | Recursive | Objenin tüm alt klasörlerine de aynı işlemin uygulanması amaçlı kullanılır |
| **-f**    | Force | Ortaya çıkan hataların gözardı yapılarak işlemin uygulanmasını zorlamak amaçlı kullanılır |
| **-v** | Verbose | İşlemin detayını göstermesi amaçlı kullanılır |

Text method'da genel syntax aşağıdaki gibidir.

```bash
	$ chmod who=permission fileName
```

Kim olduğunu belirtmek için **u**, **g**, **o**, **a** kullanılır.

| Text | Class | Açıklama |
|:----:|:-----:|:--------:|
| **u** | Owner | Dosyaya sahip olan kullanıcı |
| **g** | Group | Dosyanın ait olduğu grup |
| **o** | Other | Diğer herkes |
| **a** | All | Herkes (**ugo** ile aynı anlama gelir) |

Örneğin bir dosya için dosya kullanıcısına okuma/yazma/çalıştırma izinleri vermek istiyorsak aşağıdaki gibi yapabiliriz.

```bash
	$ chmod u=rwx fileName
```

<p align="center"> 
	<img src="/images/dosya-ve-dizin-izinleri/2.png">
</p>

Yalnızca **" = "** operatörü yoktur. Diğer operatör ve amaçları da aşağıdaki gibidir.

| Operator | Açıklama |
|:----:|:-----:|
| **+** | Yetkiyi ilgili kullanıcılara ekler |
| **-** | Yetkiyi ilgili kullanıcılardan çıkarır |
| **=** | Yetkiyi eşitler |

Örneğin az önceki örnekte **" u=rwx "** demiştik. Bunun yerine direkt olarak çalıştırma iznini **" + "** ile ekleyebilirdik.

```bash
	$ chmod u+x fileName
```

<p align="center"> 
	<img src="/images/dosya-ve-dizin-izinleri/3.png">
</p>

Ya da örneğin diğer herkesin yetkisini 0 yapmak istersek aşağıdaki gibi yapabiliriz. Bu şekilde diğer herkesin sahip olduğu yetkileri silmiş oluruz.

```bash
	$ chmod o= fileName
```

Ya da örneğin kullanıcı hariç diğer herkesten çalıştırma izinlerini çıkarmak istiyorsak aşağıdaki gibi yapabiliriz.

```bash
	$ chmod go-x fileName
```

---

## Chmod ile İzinlerin Düzenlemesi [Numberic Method]

Her yetkinin numarasal olarak bir karşılığı vardır. Bunlar aşağıdaki gibidir.

| İzin | Numara Karşılığı |
|:----:|:------:|
| **r** | 4 |
| **w** | 2 |
| **x** | 1 |

Numarasal method'da genel syntax aşağıdaki gibidir. Burada **X** her grup için yetki numaralarının toplamına eşittir.

```bash
	$ chmod XXX fileName
```

Örneğin elimizde **" -rw-r--r-- "** olduğu varsayalım. Bu ifade **644** ile ifade edilebilir. Eğer yetkiyi text değil de direkt olarak numarasal formda görmek istersek **stat**'ı kullanabiliriz.

```bash
	$ stat -c %a fileName
```

<p align="center"> 
	<img src="/images/dosya-ve-dizin-izinleri/4.png">
</p>

**644** yetkisi numarasal method ile olarak bu şekilde :

```bash
	chmod 644 fileName
```

Text method'u ile de bu şekilde :

```bash
	chmod u=rw fileName && chmod go=r fileName
```

ifade edilmektedir, ikisi de aynı işlemi yapmaktadır.

---

## Chown ile Sahipliğin Değiştirilmesi

Her dosyanın (ya da dizinin) ait olduğu bir kullanıcı ve bir grup olmalıdır. Eğer dosya ya da dizinlerin sahipliğini değiştirmek istiyorsak **chown**'u kullanabiliriz.

Genel syntax örnekleri aşağıdaki gibidir.
```bash
	$ chown newOwner fileName
```
```bash
	$ chown newOwner:newGroup fileName
```
```bash
	$ chown :newGroup fileName
```

<p align="center"> 
	<img src="/images/dosya-ve-dizin-izinleri/5.png">
</p>

Eğer tüm alt klasör ve dizinler için de sahipliği değiştirmek istiyorsak, chmod'da da olduğu gibi, recursive parametresi olan **-R** kullanılır.

<p align="center"> 
	<img src="/images/dosya-ve-dizin-izinleri/6.png">
</p>