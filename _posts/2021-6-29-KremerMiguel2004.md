---
layout: post
title: "Miguel and Kremer (2003) Worms: Identifying Impacts on Education and Health in the Presence of Treatment Externalities"
---

こんにちは！日本は梅雨まっただ中ですね。暑く湿気の高い日が続くようですが、皆さんお体にはお気をつけて！

今回はMiguelさんとKremerさんの他の論文についてブログを書いていた所、やっぱりこの論文の事も書いたほうが良いだろうと思いつき紹介する事にしました。この論文は有名過ぎて今更「紹介」とかないでしょって突っ込まれそうですが、私の勉強の為にお付きあいください。論文は[こちら](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1468-0262.2004.00481.x?casa_token=hpJC8aGBPkQAAAAA:bMaT65iiH_Jdx5x7zEMgSt4_zPEkMjPnfzY_ALKjZKZyfL8DK2Dc5agREMa6bmOLmTc2ypkpiYoMoQ)から。

この論文は波及効果（spill-over effects）を真剣に扱った「最初」の論文として有名ですが、なぜ当論文のコンテクストで波及効果が大事なのかは、[鉤虫](https://www.natureasia.com/ja-jp/nrdp/primer/81616)がどの様に広がるか少し知っている必要があります。

鉤虫とは人間の小腸を宿とする寄生虫で、感染すると腹痛、下痢、発熱、貧血に繋がります。感染の原因は裸足で鉤虫の住む地域を歩いたりすると皮膚から幼虫が入ってくる等が主です。又、感染者から人糞等を伝い水源などに広がることもあるため、一度感染者が増えると人を通して寄生虫が広がっていく傾向にあります。

### 概要
この論文が出る前までは、駆虫薬は効果が低いと考えられており、基本的には大規模な駆虫は研究によって推薦されていませんでした。著者はこの結論は波及効果（spill-over effects）を換算していないことが原因と主張します。
本論文の大きな貢献は、効果推定にあたり薬の波及効果を取り除く事で、薬そのものの効果だけを計算し、結果、駆虫薬のメリットを証明します。

### データと識別戦略
駆虫薬の効果を測定するにあたって、西ケニアで行われたPrimary School Dewarming Project（小学校駆虫プロジェクト）から派生するデータを使います。資金等の理由から、対象校全校一度に駆虫薬を提供出来ないため、本プロジェクトでは対象校を以下の通りに分け、段階的に処方します。

1998年1月にプロジェクト対象である75の小学校をランダムに三つのグループに分ける（一グループ25校）。グループ１に所属する学校は駆虫薬を無料で1998年と1999年が渡されました。グループ２の小学校は1999年のみ。グループ３は2001年に渡されました。つまり、グループ１の1998年におけるコントロールグループはグループ２と３で、グループ１と２の1999年におけるコントロールグループはグループ３。結果として全75校処置されるが、プロジェクトの展開を利用してコントロールグループを作成しました。

ここで注意が必要なのは、駆虫薬はあくまで*学校単位*で処方される訳で、学生個人は本人及び保護者の意志で薬を使います。よって、学校に対する治療の処方効果は「治療の意図（intent-to-treat(ITT)）」分析に値します。

ITT分析はランダムに薬をもらった学校ともらわなかった学校を比べることでプロジェクトの治療の意図の効果を図る事が出来ます。ただ問題なのはこの分析から推定する効果は、ご近所さん間、姉妹・兄弟間を伝って起こる可能性も高い、*学校間での波及効果*が混ざってしまっている事。よって、この波及効果を吸収するために、*近辺のプロジェクト対象校の生徒数*を回帰数式に加えてITT効果を推定する。（文中数式１の $$N^{T}_{dit}$$）

もちろん本当に知りたいのは、実際の薬の平均治療効果です。この効果を推定するにあたってもう一つ問題なのが、生徒個人が実際に治療を受けたかという変数につく係数は*各学校内での波及効果*も混ざってしまっている事。この場合は、学校の治療ステータス（グループ１，２または３）を回帰数式に入れることで解決できる。文中数式３の $$T_{1it}$$ の係数がまさに*各学校内での波及効果*に相当します。

### 分析結果
著者の分析の結果、駆虫薬は
1. 実際に治療を受けた生徒の駆虫だけでなく、同じ学校に通う治療を受けなかった生徒の蟯虫駆除もする。
2. プロジェクト対象校の欠席数を減らすだけでなく、近くの学校の欠席数も減少させる。
3. ただし、学業への影響は特にみられない。

### 感想
この論文は、長いし細かいけど、説明が丁寧に施されていて実験デザインと波及効果の考え方においてすごく勉強になります。

一つ気になるのが表３で駆虫薬治療を受けた生徒の割合がグループごとにでているのですが、グループ１の最初の治療割合と比べて、グループにの最初の治療割合が低い所です。さっき述べたように、生徒が実際に治療を受けるかは本人と保護者次第です。よって、この割合はある程度、生徒と保護者の意図を表した数値と考えられます。

次回紹介する同著者の論文([Kremer and Miguel, 2007](https://academic.oup.com/qje/article-abstract/122/3/1007/1879494))では、駆虫薬に関する情報が人から人へ伝達する事を考慮し、なぜ人は良いと分かっている新しい技術を採用しないのかについて考えます。今回の論文において、私の気になった所に触れる研究だと思いますので興味あれば次回のブログも読んでみてください。

因みに、この論文がきっかけで国際開発業界では「虫戦争（Worm Wars）」と言われる駆虫薬の効用に関する議論が勃発！興味のある方はこの[世界銀行のブログ](https://blogs.worldbank.org/impactevaluations/worm-wars-anthology)の関連論文及び記事のリストを参照してください。私も虫戦争に関しては特に詳しくないので、今後もしかしたら後々リプリケーション論文をこのブログで紹介するかもしれません。

### 最後の一言

今回も最後まで読んでくださってありがとうございます！

本ブログ記事に対するご感想や、本ブログ全体に関わるご意見などがあれば、econ.blog.japan@gmail.comまでご連絡ください！
Twitterでの本ブログのコメント・拡散も歓迎です。その際は、#econjapanblogをお使いください。

ありがとうございました。

渋谷

### **コメント**

#### 鈴木

論文の紹介、ありがとうございます！
途上国でのRCTを用いた研究の黎明期の論文だと思うので、2019年にこの論文の著者の一人であるKremerがBanerjee & Dufloと共にRCTの貢献でノーベル賞をとったというのは、なんだか感慨深いです。

この論文を読んだときに思ったのが「学業成績には影響ないんかい！」でした。
少なくとも僕が学部の卒業論文を書いていたときには、途上国では就学率は向上しているがそれが児童の学力向上に結びついていない、ということが問題になっていたので（今でもそう？）、駆虫薬がこの問題を改善することがなかったのが残念に思ったのを覚えています。
例えばより多くの児童が学校にいくことで児童一人当たりのリソース（教室のスペースや教師のattention）が減少し、学力の向上に結びつかなかったということはありそうですね。
あるいは、単に学力への影響が小さく統計的な検定力に問題があった可能性も考えられます。
何が政策的な目的で、それを測るアウトカムとして何が適切なのかを考えることの重要性を思い出させてくれる論文です。

#### 中村
現在クラスター、個人レベルでのRandomized phase-inの実験をしているので、Worm Warsは私にとっても興味深い事例です。この議論について簡単にまとめると、２０１５年出版の[Davey et al.](https://academic.oup.com/ije/article/44/5/1581/2594562) によるレプリケーションの記事の中で、データ処理や統計分析の手法において特定の代価案を複数利用すると、統計的有意性が見受けられないという結果を提示しています。それに対してMiguel and Kremerの[反駁](https://academic.oup.com/ije/article/44/5/1593/2594563)、レプリケーションの共著者らによる[反々駁](https://academic.oup.com/ije/article/44/5/1596/2594564?sid=751962a4-41da-406e-821f-ce43e1cce64d)に繋がり、メディアや政策界隈(Miguel and KrememrはDeworm the Worldなど保健支援の方にも政策インパクトがあったので）も巻き込んだ、という話です。

Hicks, Miguel, and Kremerやその他の経済学者のブログなどでも挙げられていますが、統計的なメインのポイントは「Davey et al.のレプリケーションの中での問題点は統計精度をあえて落とし、かつ正直あまり正統性がよく見えない方針を複数採用しないとMiguel and Kremerの統計的有意性をNullにできない」、です。解析に関してもPreーanalysis planの重要性などが最近取り上げられていますが、逆に過度な前設定によって起こる弊害などもあるのでなかなか一概には言えない難しい問題です。

この件に関して、学術論文よりもブログなどの方がとっかかり着きやすいと思う方には[Blattman](https://chrisblattman.com/2015/07/23/dear-journalists-and-policymakers-what-you-need-to-know-about-the-worm-wars/)や[Ozler](https://blogs.worldbank.org/impactevaluations/worm-wars-review-reanalysis-miguel-and-kremer-s-deworming-study)などがおすすめです。でも正直学術論文もそこまで読みにくくはないと思いますし、実証実験の統計手法やそれに関するややこしい点を学ぶという観点からは面白いと思います。RCTのレプリケーションに関するシステマティックな問題点に関しては[Young (2019)](https://personal.lse.ac.uk/YoungA/ChannellingFisherQJE.pdf)などもおすすめです。

### **文献：**
Davey, C., Aiken, A. M., Hayes, R. J., & Hargreaves, J. R. (2015). Re-analysis of health and educational impacts of a school-based deworming programme in western Kenya: a statistical replication of a cluster quasi-randomized stepped-wedge trial. International journal of epidemiology, 44(5), 1581-1592.

Hargreaves, J. R., Aiken, A. M., Davey, C., & Hayes, R. J. (2015). Authors’ Response to: Deworming externalities and school impacts in Kenya. International journal of epidemiology, 44(5), 1596-1599.

Hicks, Joan Hamory, Michael Kremer, and Edward Miguel. "Commentary: Deworming externalities and schooling impacts in Kenya: a comment on Aiken et al.(2015) and Davey et al.(2015)." International Journal of Epidemiology 44.5 (2015): 1593-1596.

Miguel, E. and Kremer, M., 2004. Worms: identifying impacts on education and health in the presence of treatment externalities. Econometrica, 72(1), pp.159-217.

Kremer, M. and Miguel, E., 2007. The illusion of sustainability. The Quarterly journal of economics, 122(3), pp.1007-1065.

Young, A. (2019). Channeling fisher: Randomization tests and the statistical insignificance of seemingly significant experimental results. The Quarterly Journal of Economics, 134(2), 557-598.
