---
published: true
layout: post
title:  "Chatbot 1: Google的智能问答技术"
date:   2016-05-19 16:30
categories: LSTM RNN Allo chatbot 聊天机器人 人工智能 深度学习
---

去年底Google在Gmail里引入了能自动回信的smart reply功能[^gmail]，能对收到的邮件利用深度学习技术自动产生3个可能的回复，如下图底栏的蓝色语句：

{:.center}
![Gmail的智能回复][reply]

前两天，Google在I/O 2016大会上发布了聊天应用Allo[^allo]，里面同样加入了智能答复的功能。

{:.center}
![Google Allo的自动回复][allo]

Gmail和Allo里的智能答复技术出自相同的团队，可谓一脉相承。里面涉及的深度学习技术主要是RNN（或LSTM[^lstm]）。这也是目前用的最多的端到端的技术框架。Google去年还有篇介绍把RNN应用于问答场景的论文[^gpaper]。

{:.center}
![encoder-decoder模型][seq]

当然，针对邮件和聊天应用，Google团队在应用RNN时遇到很多具体问题，下面我就主要说说这些问题以及Google给出的解答方式，里面会夹杂着一些我比较屌丝的解决方案。


# 邮件通常很长
RNN的一个问题是它不能记录长期的历史信息，虽然LSTM在这个问题上比原始RNN做的更好，但是对于上百字长度的邮件来说还是可能力不从心。Google说他们使用了一种LSTM的变种来解决这个问题。这种方法能在产生答复时更关注原始邮件里与答复相关的语句而忽略不相关的语句，所以它能记录更长期的历史信息。这个LSTM变种是什么样的，Google并没说。

说说我的想法。这个问题的难点是邮件通常是一段话或者几段，如果我们能够判断每段话里哪些句子是要针对性回复的，哪些句子可以在回复时忽略，那就可以缩短邮件的内容。比如上面第一个图里左边的邮件，其实只要针对第一句话进行回复就行，而后面的话都可以忽略。而图里右边的邮件，只要针对最后一句话进行回复就行。看Gmail给出的结果，似乎模型的效果也是类似的。

怎么判断哪些句子要针对性回复？这个可以用RNN训练个分类器分下类就行。当然也可以尝试搞个分层的RNN模型，比如从词级别，句子级别再到段落级别的RNN层级。

另一个思路是，直接考虑用summarization方法对大段文字进行压缩后再使用RNN，或者借鉴summarization里处理大段文字的技术。

# 多样性
Gmail和Allo都会产生最可行的3个答复。但从RNN出来的3个最高概率的答复可能只是说法略有不同但是意思相同，比如：“How about tomorrow?” 、“Wanna get together tomorrow?”、“I suggest we meet tomorrow.” 为了给出的3个答复更有意义，他们希望3个答复语义上有区别，也就是提高答复的多样性。所以他们加了个句子的语义理解，来筛除语义相近的句子。

判断句子的语义相似性，可以利用类似sentence2vec这样的工具。其实利用word2vec的词向量进行简单平均而获得的句子向量，效果可能就不错。

# 超级常用答复
RNN很容易产生超级常用的回复，比如“Thanks"、"Sounds good"和“I love you”等，因为训练语料里这种回复就非常多。这种常用答复不容易出错，但作用不见得很大，属于和稀泥的。所以他们在排序可能回复时，会用句子的概率值除以一个与句子先验概率值相关的数。这也是推荐等应用场景里避免热门产品被推荐过多的常用方法。

这里面比较难的是估计一个回复的先验概率。这个也可以通过句子的语义相似性来计算，比如计算下与一个回复语义相似性高于某阈值的句子数量，然后除以总的句子数量，这就是此答复语义上的先验概率了。


# 对答复引入语义分类
Allo中产生答复使用了两个RNN模型，其中第一个模型对问题进行语义分类，每个语义类别里会设定很多的可能回复，而第二个模型就是从选定的语义类别的回复集中产生最终的回复。

{:.center}
![第一个LSTM][allo_lstm1]
![第二个LSTM][allo_lstm2]

针对第二个模型，Google并没有说的太细，到底是从设定的候选回复中选出几个最可能的回复，还是允许利用候选回复的词重新组合成新的回复语句？比如"Where are you?"这个问题对应的语义分类是"Location phrase"，"Location phrase"类别中的候选回复里有3个句子："I'm at work"、"I'm at home"、"I'm at office right now"。那么第二个LSTM模型是只能产生这3个回复中的其中某个或某几个（对应检索的逻辑），还是可以产生类似"I'm at home right now"这种利用词重新组合而成的新语句？其实具体是哪种并不重要，在我们自己的的应用场景中哪种好用就用哪种吧。

Google说使用两个LSTM模型的原因是为了节省产生回复的时间。产生一个词时需要计算所有单词对应的输出（对数）概率值，这个在单词量很大时计算量是很大的。如果限定候选词只来自于某个小集合（对应语义分类中包含的词？），那计算量会小很多。为了进一步降低时间消耗，他们也使用了hierarchical softmax来代替扁平的softmax，类似word2vec。

# 控制答复的长度
产生的答复需要长度适中，太短信息量太少，太长的话在手机屏幕上显示起来又不方便。所以Google在选择答复时会更多考虑答复的效用性（utility），而不只是答复的可能性。

那么，怎么衡量答复的效用呢？Google没说。我的理解是，这个应该是依赖于具体应用的。一个可能的方案：我们可以首先对词定义效用，这样句子的效用就可以通过单位长度的平均词效用来获得。比如对于名词给较高的效用，对于介词给较低的效用。

# 答复个性化
细心的同学可能发现了上面图里的第二个RNN模型有点不一样，在decoder阶段多了个user embedding的流程。这就是为了生成的答复具有个性化。比如针对"How are you"这个问题，有些人更愿意回答"Fine"，有其他一些人更愿意回答"I'm good"。加入user embedding就是为了捕捉不同人在表达相同意思时可能使用不同表达的情况。

值得注意的是，user embedding放到了输出层，而不是输入层。这样做的好处是user embedding对应的参数可以像训练矩阵分解或者逻辑回归那样进行在线训练，计算量较小。这样用户在使用了Allo后就能很快感觉到产生的回复在往自己的习惯靠拢。如果user embedding和LSTM作为整体进行训练，这种个性化就会来的很慢，LSTM训练很慢的。

# 使用跨语言知识
> 这条讲的问题大部分人都遇不到，可忽略。

Google的产品需要面向各种语种的人，所以需要系统支持各种语种。当然可以使用RNN对每个语种都训练独立的模型。Google使用了半监督的方法来充分利用跨语言的知识，进而达到优化模型的效果。具体可见博文[^allo]，和里面提到的论文。



[reply]: /images/google_smart_reply.png "Gmail的自动回复"
[allo]: /images/google_allo_smart_reply.png "Google Allo的自动回复"
[seq]: /images/google_seq2seq.png "seq2seq模型"
[allo_lstm1]: /images/google_allo_lstm1.png "第一个LSTM模型"
[allo_lstm2]: /images/google_allo_lstm2.png "第二个LSTM模型"


# References
[^gpaper]: Oriol Vinyals, Quoc Le, [A Neural Conversational Model](http://arxiv.org/abs/1506.05869)，2015.
[^lstm]: Colah, [Understanding LSTM Networks](http://colah.github.io/posts/2015-08-Understanding-LSTMs/)，2015.
[^gmail]: Greg Corrado, [Computer, respond to this email](http://googleresearch.blogspot.jp/2015/11/computer-respond-to-this-email.html)，2015.
[^allo]: Pranav Khaitan, [Chat Smarter with Allo](http://googleresearch.blogspot.jp/2016/05/chat-smarter-with-allo.html)，2016.
