---
layout: post
title: JavaScriptでcoding納め（ネットワーク表示用Markdown）
---

自宅のネットワーク構成とかWi-Fiどの電波拾うと混んでないのかなどなどをたまに聞かれるので、 [ICON HOIHOIさま](http://iconhoihoi.oops.jp/) のiconを使ってテキストを書くだけでネットワーク構成っぽいものを表示してくれるjsを組んでみました。本当は線とか冗長構成とかも書きたいけど、まぁ次回以降のアップデートでやるかもしれません。

~~ちなみに31日になって無線LAN組み替えたりしました。はてさて。~~

今年最後のコーディング。今年もお疲れ様でした、お世話になりました。

<!--break-->

<div id="pclink-info">
nw,xinolinx-sub,192.168.0.1
 pn,nec_note,dhcp
 pn,macbook,dhcp
 pd,subpc,dhcp
 pa,kindle,dhcp
nw,xinolinx,192.168.0.2
 pd,imac,192.168.0.101
 pt,iphone6s(1),dhcp
 pt,iphone6s(2),dhcp
 tv,bravia,dhcp
 gm,ps3,dhcp
 gm,wii,dhcp
ns,xinolinx-bf1,192.168.0.3
 pd,masterpc,192.168.0.103
 ps,linux,192.168.0.102
</div>
<div id="pclink"></div>
