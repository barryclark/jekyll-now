---
layout: post
title: "SSH-Key Kullanımı"
subtitle: "ssh-key'in nasıl kullanıldığını açıklar."
---

***Yazan: [boratanrikulu](https://github.com/boratanrikulu)***

**Kaynaklar**  
[www.digitalocean.com - Görsel Kaynağı](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2)

---

<p align="center"> 
	<img src="/images/ssh-key-kullanimi/0.png">
</p>

---

## SSH-Key'in Oluşturulması

Öncelikle bilgisayarınızda ssh-key'i aşağıdaki gibi hazırlayın.

```bash
	$ ssh-keygen
```

<p align="center"> 
	<img src="/images/ssh-key-kullanimi/1.png">
</p>

Ardından pub dosyasının içeriğini kopyalayın ve sunucu tarafına geçin.

```bash
	$ cat /path/to/ssh-key.pub
```

<p align="center"> 
	<img src="/images/ssh-key-kullanimi/2.png">
</p>

---

## Sunucuda "authorized_keys" Dosyasının Hazırlanması

Eğer hali hazırda sunucuda ilgili kullanıcının home dizini altında **.ssh/authorized_keys** dosyası bulunmuyorsa aşağıdaki işlemleri uygulayın.

**~/.ssh** klasörünü aşağıdaki gibi oluşturun ve erişebilirliğini 700 olarak belirleyin.
```bash
	$ cd ~/ && mkdir .ssh && chmod 700 .ssh
```  
**~/.ssh/authorized_keys** dosyasını aşağıdaki gibi oluşturun ve erişebilirliğini 600 olarak belirleyin.
```bash
	$ touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys
```

<p align="center"> 
	<img src="/images/ssh-key-kullanimi/3.png">
</p>

Ardından kopyaladığınız key'i **.ssh/authorized_keys** dosyasına yapıştırın.

<p align="center"> 
	<img src="/images/ssh-key-kullanimi/4.png">
</p>

---

## SSH-Key Kullanımı ile Sunucuya Bağlanmak

Artık **-i** parametresi ile key'in konumunu belirterek sunucuya bağlayabilirsiniz.
```bash
	$ ssh -i /path/to/ssh-key username@ServerIP
```

Aşağıda görüldüğü gibi parola kullanılmadan bağlantı sağlanmış oldu.

<p align="center"> 
	<img src="/images/ssh-key-kullanimi/5.png">
</p>

---

## SSH Kullanımının Daha Güvenli Hale Getirilmesi

Sunucunuzun daha güvenli bir hale gelmesi için default port olan 22'yi değiştirmenizde, root kullanıcısı ve parola kullanımı ile girişleri kapatmanızda fayda vardır. Aşağıdaki gibi bu işlemi yapabilirsiniz.

config dosyasını aşağıdaki gibi açın ve ilgili satırları tabloda belirtildiği gibi değiştirin.
```bash
	$ sudo nano /etc/ssh/sshd_config
```

| Eski | Yeni | Amacı |
|:----:|:----:|:-----:|
| #Port 22 | Port KullanmakIstediginizPort | Default olan 22'i yerine başka bir port kullanmak |
| #PermitRootLogin yes | PermitRootLogin no | root kullanıcısı ile ssh bağlantılarını engellemek |
| #PasswordAuthentication yes | PasswordAuthentication no | Parola ile girişleri kapatmak |
| #PubkeyAuthentication yes | PubkeyAuthentication yes | Pubkey kullanarak girişlere izin vermek |

İşlem gerçekleştirildikten sonra aşağıda görüldüğü gibi ssh-key olmadan bağlantı kurulmasına izin verilmemektedir.

<p align="center"> 
	<img src="/images/ssh-key-kullanimi/8.png">
</p>

---

## ".ssh/config" Dosyasının Kullanımı

Eğer birden fazla sunucu ile uğraşıyorsanız, her bağlantı kurma aşamasında IP girmek tam bir işkence. Bunun önüne geçmek için bilgisayarınızda aşağıdaki gibi bir .ssh/config dosyası oluşturabilirsiniz. Bu sayede IP'leri girmeden direkt olarak **ssh serverName** diyerek sunucunuz ile bağlantı sağlayabilirsiniz.

Bunun için **~/.ssh/config** dosyasını oluşturun.  
```bash
	$ touch .ssh/config
```
Ardından aşağıdaki dosyayı ayarlayın.
```bash
	Host	serverName
		HostName		ServerIP
		User			username
		Port			22
		IdentityFile		/path/to/ssh-key
```
<p align="center"> 
	<img src="/images/ssh-key-kullanimi/6.png">
</p>

Artık herhangi bir şekilde IP girmek yerine direkt olarak **ssh serverName** diyerek sunucunuza bağlanabilirsiniz.
<p align="center"> 
	<img src="/images/ssh-key-kullanimi/7.png">
</p>