---
published: false
layout: post
title:  "Chatbot 2: 降低chatbots制造代价的利器 Wit.ai"
date:   2016-05-26 23:15
categories: wit.ai chatbot 聊天机器人 人工智能
---

**[Wit.ai](https://wit.ai)**[注：要梯子]是Facebook收购的一家AI公司，他们的主要产品是一个帮助制造chatbot的平台：**Bot Engine**。Chatbot开发者可以通过bot engine提供的网页工具和API接口比较方便地构建具有某种特定功能的chatbot，比如酒店预订、订餐、打车，甚至是找对象等等。

它本质上还是利用检索技术完成对话的，也就是需要开发者维护很多问答对。但是内部又使用了很多机器学习技术来使得问答对的维护比较灵活方便，而且系统对于问答对具有比较好的泛化性。下图是开发者的网页截图。

{:.center}
![Wit.ai的开发者网页页面][wit]

我在之前的文章“[Google的智能问答技术][allo]”中介绍了Google的Gmail和Allo已经在使用深度学习RNN模型来自动产生问题的答案，而wit.ai却还在用检索式的方式，wit.ai是不是很low？嗯，是挺low的。但是目前也只能用这种low的检索方式来做垂直领域具有特定功能的chatbot。

Gmail和Allo里的smart reply针对的场景是泛聊，也就是唠嗑，而wit.ai针对的场景主要是完成垂直领域的特定功能。唠嗑的前后连贯性不需要那么强，而让用户顺利完成某件事时却依赖很多背景信息。比如订披萨时你需要告诉chatbot要订多大尺寸，什么口味，要不要加料，还要告诉它什么时间送到什么地方由谁接收等等。这么多信息是通过与chatbot的多次交互不断收集来的。

> 目前，RNN等深度学习模型并不善于收集长期的背景信息！

当然，从拥有的数据量上来看一般的开发者也是没法和Google比的。其实，我相信Google的聊天应用Allo里也同样大量用到了检索式方法来产生特定功能问题的答案。

下面我介绍如何利用wit.ai来构建天气预报chatbot。里面会细讲wit.ai的整体思路以及里面的各种关键概念。

# stories
可以使用不同的story来生成新的story

# entities
# actions
# understanding



# api.ai的特别之处
和wit.ai一样，在意图构建时可以触发action。此action可以要求一些输入参数。api.ai为每个输入参数丢失时设定触发一个新的action，利用此action来获取此输入参数。在多个参数丢失时，也可以定义各参数对应的actions的触发顺序。微软的LUIS也是这么做的。

> 只有在所有输入参数都获取到时此意图绑定的那个action才会被触发。


# LUIS的特别之处
* Entity可以定义最多10个子entities。
* 最多支持10个entities。
* 利用active learning来产生一些需要用户手动标注的语句，使得把标注后的语句加入到原始训练预料里可以最大限度地优化现有模型。
* 对中文的支持较好
> When you "train" a model, LUIS generalizes from the examples you have labeled, and develops code to recognize the relevant intents and entities in the future. Internally, LUIS uses logistic regression classifiers to determine intents, and conditional random fields (CRFs) to determine the entities. 

#专家系统相对于半个世纪前有什么变化？



[wit]: /images/wit_ai.png 
[allo]: /images/google_allo_smart_reply.png "Google Allo的自动回复"
[seq]: /images/google_seq2seq.png "seq2seq模型"
[allo_lstm1]: /images/google_allo_lstm1.png "第一个LSTM模型"
[allo_lstm2]: /images/google_allo_lstm2.png "第二个LSTM模型"

[allo]: ../../../2016/05/26/breezedeus-google-allo-chat-smarter.html


# References
[^gpaper]: Oriol Vinyals, Quoc Le, [A Neural Conversational Model](http://arxiv.org/abs/1506.05869)，2015.
[^lstm]: Colah, [Understanding LSTM Networks](http://colah.github.io/posts/2015-08-Understanding-LSTMs/)，2015.
[^gmail]: Greg Corrado, [Computer, respond to this email](http://googleresearch.blogspot.jp/2015/11/computer-respond-to-this-email.html)，2015.
[^allo]: Pranav Khaitan, [Chat Smarter with Allo](http://googleresearch.blogspot.jp/2016/05/chat-smarter-with-allo.html)，2016.
