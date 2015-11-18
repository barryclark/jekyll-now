---
layout: post
title: Reading Notes: Payments Systems in U.S.
---

此篇是一篇读书笔记，书名是 Payments Systems in the U.S.

![/images/Payments-Systems-In-The-US.png](/images/Payments-Systems-In-The-US.png)

这本书的标题很大，差不多是“纵览”、“概论”的意思，所以本质上是给读者建立起一个框架，对于具体的支付方法当然是要另外深入研究的。

#什么是支付系统（Payments Systems)
简而言之，就是在不同Party间进行价值移动，可以更直观的理解为Money Movement
![/images/Def-Payments-Systems.png](/images/Def-Payments-Systems.png)

#常见支付系统
Cash (现金)
Check (支票)
Credit Card or Charge Card (信用卡，贷记卡)
Debit Card (借记卡)
ACH (自动清算)
Wire Transfer（电汇）

他们的占比大概是这样的（书上提供的数据），注意 subtotal card 不是一种卡，而是把贷记卡和借记卡合并的数据。
分别从笔数和金额进行对比，还是很有意思的
![/images/Payments-Systems-Statistics.png](/images/Payments-Systems-Statistics.png) 

#支付系统的业务领域
Point of Sale (POS) // POS机
Remote Commerce   // 电商
Bill Payment  // 账单，比如水电煤
P2P Payment   // 个人之间的转账
B2B Payment   // 企业之间的转账
Income Payment  //薪金支付

#评判、比较支付系统的“度量衡”
Open Loop OR Closed Loop // 开环 or 闭环
Push OR Pull   // Money movement 的方向是推还是拉
Settlement  // 结算时效，是每天结算(daily settlemnt)还是每笔结算(gross settlement)
Ownership // 所有权，是私有？公有？银行有？公众持股？等等
Domestic OR Cross-border // 境内还是跨境

当然还有其它，比如风险，是否盈利，盈利模式，法规制度，品牌等等等等

有了这些“度量衡”,我们再来看看上面提到的几种
#主流的支付方式

##Checking 支票
支票是最古老的开环支付系统，所谓开环，就是可以自由加入、退出
他的Money Movement的方向是拉
在清算时，并不收取手续费，也就是100块的支票，收单账户收到的就是100块
支票支付系统本身并没有owner，但是清算所（clearing house）是有产权的，一般是银行或者其它第三方
由从纸质向电子化发展的趋势
一般金额巨大，所以单位成本较低

支票支付系统的发展大致可以分为三个阶段
Phase 1: 十八世纪到十九世纪， clearing house的发展。此时还停留在人肉清算
Phase 2: 自动化，就是在支票上加上磁条等信息，用机器进行清算
Phase 3: 自动化更进一步，发图片就好了，然后进行图像识别。
这里插一句，关于图片清算，其实一开始参与者改革的动力不足，因为系统演进是要投资的嘛。所以在不久之前，支票还是要用飞机运到指定的清算所进行清算的。
后来发生了911恐怖袭击，很多航班都停运了，支票没法及时清算。这时候美国政府推了一把，将强化图片清算的合法化，这事儿就做成了。

和Check相关的还有一种Service叫Lockbox (带锁的箱子)， 本质上像一个邮箱，消费者把该付的账单的Check放到指定的LockBox, 然后由第三方定期去取，然后结算。
如果是大客户，那么这种Lockbox就叫做WholeSale lockbox
批发零售的关系

###关于风险
支票的风险主要有两个：
1. 支付时间和到账时间是有时差的，清算之前钱一直就还没到账；没到账之前什么事情都有可能发生 :) 有时候现金流断了，一家企业就挂了
2. 账户里没那么多钱进行清算, 即所谓的NSF (No sufficent fund)。关于这个，全美每年的损失能到10 billion的级别

##ACH
Automatic Clearing House - 自动清算所
ACH 一般是银行所有的
在本书中，它是唯一一种既支持Pull又支持Push的支付系统

###主要角色
originator -> ODFI -> operator -> RDFI -> receiver 
ODFI: originating depository financial institution 
RDFI: receiving depository financial institution
简单来说，就是收款方，付款方以及他们中间的各种代理，这里面就有产业链了
它使做Daily 清算的
有个机构： NACHA - National Automated Clearing House Association 它的主要职责是定规则，但并不做清算
当然也有相应地联邦法律来约束。法律肯定是高于规则的

###涵盖的业务类型
B2C - 比如工资支付
C2B - 比如账单支付
一次性 B2B - 比如货款支付
一次性 C2B - 比如购买，转账
一次性 C2C - 个人之间转账

###发展趋势
个人认为ACH是Checking的一个自然演进
ACH也在从境内向跨境方向发展

##卡支付

##现金

##电汇

#不同人看支付系统
##消费者

##商户

##Biller (开账单的人)

##企业

#新兴支付
##热门领域
##在支付领域创业的成功要素


[http://www.gnu.org/philosophy/selling.html](http://www.gnu.org/philosophy/selling.html)



