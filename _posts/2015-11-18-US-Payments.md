---
layout: post
title: Reading Notes for "Payments Systems In The U.S."
excerpt_separator: <!--more-->
---

![/images/Payments-Systems-In-The-US.png](/images/Payments-Systems-In-The-US.png)

此篇是一篇读书笔记，书名是 Payments Systems in the U.S.

这本书的标题很大，差不多是“纵览”、“概论”的意思，所以本质上是给读者建立起一个框架，对于具体的支付方法当然是要另外深入研究的。

<!--more-->

#什么是支付系统（Payments Systems)
简而言之，就是在不同Party间进行价值移动，可以更直观的理解为Money Movement


![/images/Def-Payments-Systems.png](/images/Def-Payments-Systems.jpg)

#常见支付系统

- Cash (现金)
- Check (支票)
- Credit Card or Charge Card (信用卡，贷记卡)
- Debit Card (借记卡)
- ACH (自动清算)
- Wire Transfer（电汇）

他们的占比大概是这样的（书上提供的数据），注意 subtotal card 不是一种卡，而是把贷记卡和借记卡合并的数据。
分别从笔数和金额进行对比，还是很有意思的
![/images/Payments-Systems-Statistics.png](/images/Payments-Systems-Statistics.png) 

#支付系统的业务领域

- Point of Sale (POS) // POS机
- Remote Commerce   // 电商
- Bill Payment  // 账单，比如水电煤
- P2P Payment   // 个人之间的转账
- B2B Payment   // 企业之间的转账
- Income Payment  //薪金支付

#评判、比较支付系统的“度量衡”

- Open Loop OR Closed Loop // 开环 or 闭环
- Push OR Pull   // Money movement 的方向是推还是拉
- Settlement  // 结算时效，是每天结算(daily settlemnt)还是每笔结算(gross settlement)
- Ownership // 所有权，是私有？公有？银行有？公众持股？等等
- Domestic OR Cross-border // 境内还是跨境

当然还有其它，比如风险，是否盈利，盈利模式，法规制度，品牌等等等等

有了这些“度量衡”,我们再来看看上面提到的几种
#主流的支付方式

##Checking 支票
支票是最古老的开环支付系统，所谓开环，就是可以自由加入、退出

他的Money Movement的方向是Pull

在清算时，并不收取手续费，也就是100块的支票，收单账户收到的就是100块

支票支付系统本身并没有owner，但是清算所（clearing house）是有产权的，一般是银行或者其它第三方

由从纸质向电子化发展的趋势

一般金额巨大，所以单位成本较低

支票支付系统的发展大致可以分为三个阶段

- Phase 1: 十八世纪到十九世纪， clearing house的发展。此时还停留在人肉清算
- Phase 2: 自动化，就是在支票上加上磁条等信息，用机器进行清算
- Phase 3: 自动化更进一步，发图片就好了，然后进行图像识别。
这里插一句，关于图片清算，其实一开始参与者改革的动力不足，因为系统演进是要投资的嘛。所以在不久之前，支票还是要用飞机运到指定的清算所进行清算的。
后来发生了911恐怖袭击，很多航班都停运了，支票没法及时清算。这时候美国政府推了一把，将强化图片清算的合法化，这事儿就做成了。

和Check相关的还有一种Service叫Lockbox (带锁的箱子)， 本质上像一个邮箱，消费者把该付的账单的Check放到指定的LockBox, 然后由第三方定期去取，然后结算。

如果是大客户，那么这种Lockbox就叫做WholeSale lockbox, 类似于批发零售的关系

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
它是做Daily 清算的
有个机构： NACHA - National Automated Clearing House Association 它的主要职责是定规则，但并不做清算
当然也有相应地联邦法律来约束。法律肯定是高于规则的

###涵盖的业务类型
- B2C - 比如工资支付
- C2B - 比如账单支付
- 一次性 B2B - 比如货款支付
- 一次性 C2B - 比如购买，转账
- 一次性 C2C - 个人之间转账

###发展趋势
个人认为ACH是Checking的一个自然演进
ACH也在从境内向跨境方向发展

##卡支付
Pull with Authorization, 方向是收款方拉钱，但是必须经过验证 //我们刷卡时总要输密码的

卡组织一般都是私有的，或者说是有明确产权的

###卡支付发展的几个阶段:

- Phase 1: 1960s~ 1970s 建立阶段，交易中的各种角色、费率等明确定义
- Phase 2: 1980s 扩张阶段，开始被大众接受；欺诈管理开始形成等
- Phase 3: 1990s 分化阶段，无年费开始出现；奖励机制；电商；EMV标准形成
- Phase 4: 2000~2010 多样化阶段， 无接触支付；移动支付；PCI;Tokenization等等

###卡类别
- Charge card: 记账卡，类似于信用卡，一个周期一结算，不能分期等
- Credit Card, 信用卡
- Signature debit cards， 签字借记卡
- PIN debit cards， 输密码的借记卡
- Prepaid cards, 预付卡

##现金
支付流向是Push // 否则就是抢钱啦
现在犯罪领域用的比较多
BitCoin 算是一种虚拟现金

##电汇
支付方向是Push

主要用于企业之间，特别是金融机构之间，金额巨大

采用实时结算，据说是因为以前没有实施，结果付款银行倒闭了，产生了坏账


#不同角度看支付系统

##消费者（美国）

卡支付是首选

支票支付一直在下降

现金所占比例相对比较稳定，但也一直在下降

从年龄上来看，婴儿潮(1946~1964)之前的倾向于现金、支票支付；婴儿潮时期的，倾向于信用卡支付；婴儿潮之后的，倾向于借记卡支付

这有可能与美国的经济与消费观念有着密切的联系

##商户
商户的目标就是收到钱

商户也希望通过支付方式的选择来促进消费

有个趋势是移动支付的发展促进了所谓“小商户”的形成，就是一些民间之间的支付通过移动支付就可以实现收款

##Biller (开账单的人)
客户的支付方式，线上银行占了很大比重。

另外支票支付依然是一个重要的选项

##企业
企业除了关注纯粹的支付以外，事实上支付的领域扩充为现金流的管理

支票支付依然占据到70%的比重

#新兴支付
支付的价值链一般分为  资金准备 -> 支付发起 -> 支付完成

如果统计一下，新兴的支付领域一般是在支付发起阶段进行创新

而最重要的形式就是作为中间人对支付进行分离，比如国内的支付宝，就是先把钱付给支付宝，再由支付宝与商户结算

##热门领域
- 无接触支付 （contactless）
- 移动支付
- 线上to线下POS

##在支付领域创业的成功要素
- 解决鸡和蛋的问题。只有有很多的Payee(商户)才能吸引更多地Payer(消费者)，同时只有很多的(Payer)消费者才能吸引跟多的Payee(商户)
- 找到正确的盈利模式。
- 正确处理好规模扩张。一旦成功，一个支付系统可能会瞬间扩张，要很好地应对这样的规模扩张

#资源

[http://www.paymentsnews.com](http://www.paymentsnews.com)

[http://paymentsviews.com](http://paymentsviews.com)



