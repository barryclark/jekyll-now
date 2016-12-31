---
layout: post
title: 自宅のネットワークをメモする意味でMarkdown
---

自宅のネットワーク構成とかWi-Fiどの電波拾うと混んでないのかなどなどをたまに聞かれるので、 [ICON HOIHOIさま](http://iconhoihoi.oops.jp/) のiconを使ってテキストを書くだけでネットワーク構成っぽいものを表示してくれるjsを組んでみました。本当は線とか冗長構成とかも書きたいけど、まぁ次回以降のアップデートでやるかもしれません。

今年最後のコーディング。今年もお疲れ様でした、お世話になりました。

<!--break-->

ちなみに31日になって無線LAN組み替えたりしました。はてさて。

<div id="pclink-info">
nw,xinolinx-sub,192.168.0.1
 pn,snpc,dhcp
 pn,macbook,dhcp
 pd,mother,dhcp
nw,xinolinx,192.168.0.2
 pd,imac,dhcp
 pt,iphone1,dhcp
 pt,iphone2,dhcp
 pt,kindle,dhcp
 tv,bravia,dhcp
 gm,ps3,dhcp
 gm,wii,dhcp
ns,xinolinx-bf1,192.168.0.3
 pd,master,dhcp
 pd,linux,dhcp
</div>
<div id="pclink" background-color="#EEE"></div>
