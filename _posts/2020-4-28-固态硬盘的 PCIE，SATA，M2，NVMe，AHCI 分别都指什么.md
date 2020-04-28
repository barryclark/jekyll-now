---
layout: post
titiel: 固态硬盘的 PCIE，SATA，M2，NVMe，AHCI 分别都指什么？
---

##### M.2 SSD  
##### SATA  
##### PCI-E  
##### NVMe

用在笔记本上面的固态硬盘主要就是M.2 SSD固态硬盘，在一些中高端主板宣传上也能看到，支持M.2固态硬盘是卖点之一  
  
虽然固态硬盘的速度比机械硬盘快很多，但是目前大多数采用的是SATA总线，M.2 SSD除了有SATA总线以外，还有采用PCI-E的，有些更好的硬盘还写着NVMe  
  
##### 到底他们之间有什么区别呢？
一、插槽不同，M.2就是固态硬盘的接口或者插槽，有两种类型：

- B Key（Socket2）
- M Key（Socket3）  

目前大多数M.2固态硬盘是两种插槽都兼容，所以插口是有两个缺口的这种。  
B型和M型区别：  
1. B型有6个金手指，M型有5个金手指；
2. B型和M型除了缺口不同之外，另外的区别是M型支持更高的总线标准，所以M型的插槽常见于中高端电脑上面

二、M.2固态硬盘，在长度上也有不同的规格：

- 2240，宽度22mm，长度40mm
- 2260，宽度22mm，长度60mm
- 2280，宽度22mm，长度80mm

三、M.2固态硬盘，采用的总线标准有两种：

- SATA：速度慢，600M/s以内
- PCI-E：速度快【顺丰快递】
    1. 不支持NVMe：1000M/s以内【隔日达】
    2. 支持NVMe：2000M/s【即日达】

NVMe属于M.2固态硬盘的一个协议标准，所以M.2固态硬盘的速度虽然受主控、芯片的影响，但是主要还是在于硬盘是SATA还是PCI-E，如果是PCI-E，又在于支不支持NVMe  

##### 问题
###### 1. 有M.2接口的主板都能使用M.2 SSD？
不一定的，不同主板的M.2接口所支持的通道是不同的，有的只支持PCI-E通道，但有的就兼容 SATA和PCI-E两种通道，所以我们如果买 M.2 SSD，要弄清楚自己的主板上的M.2接口是支持哪种通道的。

###### 2. 同是M.2接口，为什么会有PCI-E和SATA之分？
这是因为两者所走的通道不同，M.2有两种接口定义：Socket 2和Socket 3。  
Socket 2支持SATA、PCI-EX2通道的SSD，Socket 3专为高性能存储设计，支持PCI-EX4。

###### 3. 什么决定M.2 SSD所走的通道？
主控决定了接入M.2接口的SSD是走PCI-E通道还是SATA通道。  

###### 4. NVMe的由来  
现在所用的SATA接口与AHCI标准其实是为高延时的机械硬盘而设计的，目前主流SSD依然继续使用它们，早期SSD性能不高时可能还不觉得有什么问题，但是随着SSD的性能逐渐增强，这些标准已经成为限制SSD的一大瓶颈，专为机械硬盘而设计的AHCI标准并不太适合低延时的SSD。

所以在2009年下半年，关于NVMe的技术工作正式启动，NVMe规范由包含90多家公司在内的工作小组所定制，Intel是主要领头人，小组成员包括美光、戴尔、三星、Marvell、NetAPP、EMC、IDT等公司，目的就是为SSD建立新的存储规范标准，让它在老旧的SATA与AHCI中解放出来。

所以NVMe的优势在于：更低的延时、IOPS大增、功耗更低、驱动适用性广







---

---
> 固态硬盘的 PCIE，SATA，M2，NVMe，AHCI 分别都指什么？别再搞混了


 <div><p><span>固态硬盘近年来也是随着计算机的发展而得到了迅速的发展，目前已经隐隐有要取代机械硬盘的势头，只要成本价格控制下来，相信取代机械硬盘也只是时间问题</span></p><p><span>但是关于固态硬盘的概念实在是太繁琐了，很多人选购固态时也是看到商家宣传 NVMe，PCIE 固态却不懂到底是什么意思，今天我们就来为大家详解这些都是什么东西</span></p><p></p><div class="sr-rd-content-center"><img class="" src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=192934091,1517829559&amp;fm=173&amp;app=49&amp;f=JPEG?w=640&amp;h=335&amp;s=F9848B5459346615CE31C1DA0300C0A3"></div><p></p><p><span>首先我们要把 M2 跟 SATA 放一起说，我们常说的 M2 其实是 M.2，更多是指一种尺寸或者插槽，就是上图中右边的尺寸较小的直接插主板上的这种，而 SATA 也是，通常是指上图左边那个尺寸较大的一大块那种</span></p><p><span>还要提的是 M.2 插槽也是有两种的，一种是金手指有两个缺口的 Socket 2 跟金手指只有一个缺口的 Socket 3，这两种可以走不同的通道，我们后面会说到</span></p><p></p><div class="sr-rd-content-center"><img class="" src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=297402158,3738584108&amp;fm=173&amp;app=49&amp;f=JPEG?w=640&amp;h=427&amp;s=B2907E85CA3A82CE23B92D1C03008042"></div><p></p><p><span>接下来要搞懂的是 SATA 跟 PCIE，这两个东西是指串行接口或者就是数据走的通道，相信有人看到这个 SATA 就要迷糊了，其实上面的 SATA 更多是指插槽，而这里的 SATA 是指数据走的通道，目前的新设备普遍都是 SATA3 接口了，但是 SATA3 是向下兼容 SATA2 跟 SATA1 的（所以下文我们只讨论 SATA3）</span></p><p><span>PCI-E 跟 SATA3 简单说就是数据走的 “路”，PCI-E 就像是特别宽大的路，数据可以走的特别快，而 SATA3 与之相比更像是一条崎岖的小路，数据走的特别慢，但是 CPU 内部就那么大一点，修不了特别多的大路，所以 PCI-E 通道也就仅有那么几条</span></p><p></p><div class="sr-rd-content-center"><img class="" src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1416965005,3635623223&amp;fm=173&amp;app=49&amp;f=JPEG?w=640&amp;h=348&amp;s=4DAE3C721D8BDCCA1AFDA1DB0000C0B1"></div><p></p><p><span>通常 SATA 的插槽只能走 SATA3 的通道，而 M.2 的插槽上文我们说了分为 Socket 2 跟 Socket 3</span></p><p><span>M.2（Socket 2）的固态可以走 SATA3 或者 PCI-E 3.0×2 通道 (就是两条 PCI-E)，而 M.2（Socket 3）的固态则可以走 PCI-E 3.0×4 通道</span></p><p><span>需要说的是每条 PCI-E 3.0 的带宽是 8Gbps，而 SATA 3.0 的带宽则只有 6Gbps</span></p><p></p><div class="sr-rd-content-center"><img class="" src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1169270773,3931988441&amp;fm=173&amp;app=49&amp;f=JPEG?w=640&amp;h=369&amp;s=49043D7207106DC048F091CC000010B3"></div><p></p><p><span>最后要说的就是经常被商家拿来当作卖点的 NVMe 了，其实 NVMe 跟 AHCI 都是一种规范，就像是在路上走如果没有交通规则的限制，那么肯定是一团拥挤肯定都走不动了，而 NVMe 跟 AHCI 就像是这种交通规则</span></p><p></p><div class="sr-rd-content-center"><img class="" src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1823426669,2623887675&amp;fm=173&amp;app=49&amp;f=JPEG?w=640&amp;h=348&amp;s=4DAE3C721D8BDCCA02F101D30000C0B2"></div><p></p><p><span>AHIC 是针对 SATA 这种弯路的交通规则，然后开发者发现，这种针对弯路的规范，数据只能一个一个通过的规则用在宽敞的 PCIE 通道上面实在太浪费了，于是针对 PCIE 通道又开发出了 NVME 规范，可以让很多数据同时通过</span></p><p><span>总结：M.2 跟 SATA 其实可以说是插槽的形状，而 PCI-E 跟 SATA3 就是数据从硬盘到 CPU 或者内存走的通道，而 NVME 跟 AHCI 就是针对 PCI-E 跟 SATA 通道的 “交通规则”</span></p></div></div></div></sr-rd-content>
