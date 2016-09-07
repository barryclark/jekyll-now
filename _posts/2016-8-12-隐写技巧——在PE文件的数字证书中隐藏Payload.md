---
layout: post
title: 隐写技巧——在PE文件的数字证书中隐藏Payload
---
## 0x00 前言
---
为了验证PE文件的来源和完整性，常常会为PE文件添加数字证书。Windows系统下默认会对一些重要文件添加微软的数字签名，如ntdll.dll。恶意文件分析系统在对PE文件的静态分析过程中，如果PE文件有数字签名，则对签名进行验证。若数字签名验证通过，则不再对其进行后续分析。这样做主要考虑的是降低误报，以及减少服务器资源消耗。如果能在保证数字签名有效的前提下，在PE文件中隐藏Payload，那么这种隐写方式将会非常隐蔽。

## 0x01 简介
---
来自Deep Instinct Research Team的`Tom Nipravsky`在BlackHat2016的议题`《Certificate Bypass: Hiding and Executing Malware from a Digitally Signed Executable》`介绍了这个方法，并且实现了一个Reflective PE Loader，用来加载隐藏在PE文件数字证书中的Payload，值得学习。

**议题PDF下载地址：**

https://www.blackhat.com/docs/us-16/materials/us-16-Nipravsky-Certificate-Bypass-Hiding-And-Executing-Malware-From-A-Digitally-Signed-Executable-wp.pdf

本文将会更加详细的介绍如何实现在保证数字签名有效的前提下，向PE文件中隐藏Payload。


## 0x02 PE文件格式和数字签名格式
---
![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/1.png)


> 图1引用自Windows Authenticode Portable Executable Signature Format
> https://msdn.microsoft.com/en-us/windows/hardware/gg463180.aspx

**签名过程：**

- 计算PE文件hash
- 根据hash生成数字证书
- 数字证书添加在文件末尾，这部分称作`Certificate Table`

**计算文件hash的步骤：**

1.	Load the image header into memory.
2.	Initialize a hash algorithm context.
3.	Hash the image header from its base to immediately before the start of the checksum address, as specified in Optional Header Windows-Specific Fields.
4.	Skip over the checksum, which is a 4-byte field.
5.	Hash everything from the end of the checksum field to immediately before the start of the Certificate Table entry, as specified in Optional Header Data Directories.
6.	Get the Attribute Certificate Table address and size from the Certificate Table entry. For details, see section 5.7 of the PE/COFF specification.
7.	Exclude the Certificate Table entry from the calculation and hash everything from the end of the Certificate Table entry to the end of image header, including Section Table (headers).The Certificate Table entry is 8 bytes long, as specified in Optional Header Data Directories.
8.	Create a counter called SUM_OF_BYTES_HASHED, which is not part of the signature. Set this counter to the SizeOfHeaders field, as specified in Optional Header Windows-Specific Field.
9.	Build a temporary table of pointers to all of the section headers in the image. The NumberOfSections field of COFF File Header indicates how big the table should be. Do not include any section headers in the table whose SizeOfRawData field is zero. 
10.	Using the PointerToRawData field (offset 20) in the referenced SectionHeader structure as a key, arrange the table's elements in ascending order. In other words, sort the section headers in ascending order according to the disk-file offset of the sections.
11.	Walk through the sorted table, load the corresponding section into memory, and hash the entire section. Use the SizeOfRawData field in the SectionHeader structure to determine the amount of data to hash.
12.	Add the section’s SizeOfRawData value to SUM_OF_BYTES_HASHED.
13.	Repeat steps 11 and 12 for all of the sections in the sorted table.
14.	Create a value called FILE_SIZE, which is not part of the signature. Set this value to the image’s file size, acquired from the underlying file system. If FILE_SIZE is greater than SUM_OF_BYTES_HASHED, the file contains extra data that must be added to the hash. This data begins at the SUM_OF_BYTES_HASHED file offset, and its length is:
(File Size) – ((Size of AttributeCertificateTable) + SUM_OF_BYTES_HASHED)

> 引用自Windows Authenticode Portable Executable Signature Format
> https://msdn.microsoft.com/en-us/windows/hardware/gg463180.aspx

如果修改了文件内容，那么计算出的文件hash就会改变，导致数字证书无法通过验证，所以数字证书能够保证签名文件的完整性，但是在计算文件hash的算法上**存在一个不足：**

计算文件hash并非对整个文件内容作计算（如计算文件hash的步骤4，以及图1中灰色背景的部分，目的是避免绑定的证书文件影响到hash值）

**更值得注意的是：**

在Certificate Table的尾部添加数据并不会影响计算出的文件hash，也就是说在Certificate Table尾部添加数据不会导致证书失效

**注：**

这个思路早在2009年由Aymeric Barthe@bartheph提出

https://blog.barthe.ph/2009/02/22/change-signed-executable/

当然，在证书尾部添加数据虽然不会影响计算出的文件hash，但会改变证书长度，所以在PE文件结构中保存证书长度的位置需要作相应修改（共2处），下面实例演示一种最直观的添加payload并修改证书长度的方法

## 0x03 演示一
---
**测试文件：**

ntdll.dll

Win7 x64下默认位置为：C:\Windows\SysWOW64

**使用工具：**

CFF Explorer

Hex Editor

LordPE

### 1、定位Certificate Size in Certificate Table

使用`CFF Explorer`查看dll结构，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/3-1.png)

可获得如下信息：


File Size: 1292592 bytes

PE   Size: 1277952 bytes


推断出：

Certificate Table的偏移地址为138000H(1277952)

Certificate Table的前四字节保存长度，大小应该为14640 bytes（1292592-1277952）

现在跳到偏移地址138000H,查看前四字节，验证推断

如图，前四字节为30390000,转换成实际长度为00003930H,即14640 bytes

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/3-2.png)

### 2、修改Certificate Size in Certificate Table

测试待添加的payload为：1111111111，长度为10

显然，

New Size = Old Size + Payload Size

		 = 14640 +10

		 = 14650

		 = 393aH

对应偏移地址138000H-138003的数据修改为3A390000,如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/3-3.png)


### 3、定位Certificate Size in Optional Header

使用`CFF Explorer`查看dll结构，选择Nt Headers-Optional Header-Data Directories [x],找到Security Directory Size项，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/3-4.png)


### 4、修改Certificate Size in Optional Header

00003930修改为0000393A，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/3-5.png)

保存文件，查看文件信息，签名失效（因为还没有添加payload）

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/3-6.png)


### 5、添加payload

使用`Hex Editor`在文件尾部添加payload 

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/3-7.png)

保存后，签名成功识别，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/3-8.png)


### 6、修改PE文件校验和

使用`LordPE`打开PE文件，如图，原文件的校验和为0013E00E

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/3-9.png)

点击"?"对其更新，如图，新的校验和为00142672

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/3-10.png)

使用`CFF Explorer`打开PE文件，选择Nt Headers-Optional Header，找到CheckSum项

原校验和为0013E00E，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/3-11.png)

修改为00142672，保存为ntdll(AddPayload).dll

使用`LordPE`验证校验和，成功

至此，在保证PE文件数字证书有效的前提下，成功在PE文件尾部添加Payload

**注：**

添加的payload长度需要满足为8的整数倍，否则会显示数字签名状态无效

## 0x04 演示二
---
测试文件：aliide.sys

### 1、定位Certificate Size in Certificate Table

如图，偏移地址2000H（8192）

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/3-12.png)

跳到偏移地址2000H,查看前四字节，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/3-13.png)

Certificate Size为00001c50H

### 2、修改Certificate Size in Certificate Table

添加的payload为BBBBBBBBBB,10字节

00001c50H+10=00001c5AH

修改为5A1C0000，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/3-14.png)


### 3、定位Certificate Size in Optional Header

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/3-15.png)


### 4、修改Certificate Size in Optional Header

00001C50改为00001C5A

### 5、添加payload

尾部添加BBBBBBBBBB

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/3-16.png)


### 6、修改PE文件校验和

000065ED改为0000B156

添加成功

**注：**

添加的payload长度需要满足为8的整数倍，否则会显示数字签名状态无效


## 0x05 程序实现
---

### 1、Aymeric Barthe@bartheph的实现方法

**开发语言：**c++

**下载地址：**

https://blog.barthe.ph/download/2009/AppendPayLoad.tar.bz2

编译成功后，命令行执行：

AppendPayLoad.exe ntdll.dll payload.txt newntdll.dll

**参数说明：**

ntdll.dll：原PE文件

payload.txt：存储待添加的payload

newntdll.dll：新生成的文件

测试Payload添加成功，新生成文件的数字签名成功识别，程序有**如下特点：**

1.payload在尾部自动填0补齐payload长度为8的倍数

如图，多了6个'00'，补齐长度

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/4-1.png)


2.未修改PE文件校验和

如图，PE文件校验和实际应该为00142684

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/4-2.png)

### 2、Joakim Schicht的实现方法

**开发语言：**Autoit

**下载地址：**

http://reboot.pro/files/file/85-digitalsignaturetweaker/

界面如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-8-12/4-3.PNG)

## 0x06 小结
---
本文介绍了如何利用工具实现在保证数字签名有效的前提下，向PE文件中隐藏Payload。在掌握了修改方法后，编写程序实现自动修改不会很难。对于带有数字签名的PE文件，建议不要盲目相信。


## 更新
---

- 对添加payload的长度限制做了修正，payload长度需要满足是8的倍数，否则数字签名状态无效(感谢维一零的帮助)


---

[LEAVE A REPLY](https://github.com/3gstudent/feedback/issues/new)
