---
layout: post
title: JavaScriptでcoding納め（ネットワーク表示用Markdown）
---

自宅のネットワーク構成とかWi-Fiどの電波拾うと混んでないのかなどなどをたまに聞かれるので、フリー素材の画像を利用しましてテキストからネットワーク構成図を生成してくれるjsを組んでみました（本当は線とか冗長構成とかも書きたいけど、まぁ次回以降のアップデートでやるかもしれません）。

- http://iconhoihoi.oops.jp/
- http://findicons.com/pack/1035/human_o2

~~ちなみに31日になって無線LAN組み替えたりしました。はてさて。~~

今年最後のコーディング。今年もお疲れ様でした、お世話になりました。

<!--break-->

<div id="pclink-info">
ni,gateway,internet
 nw,xinolinx-sub,192.168.0.1,wifi
  pn,nec_note,dhcp,none
  pt,iphone6s(1),dhcp,none
  pa,kindle,dhcp,none
  op,canon6130,dhcp,scan
 nw,xinolinx,192.168.0.2,wifi
  pd,imac,192.168.0.101,printer
  pn,macbook,dhcp
  pd,subpc,dhcp,game
  pt,iphone6s(2),dhcp,none
  tv,bravia,dhcp,none
  gm,ps3,dhcp,none
  gm,wii,dhcp,none
 ns,xinolinx-bf1,192.168.0.3,none
  pd,masterpc,192.168.0.103,wire
  ps,linux,192.168.0.102,dualwire
</div>
<div id="pclink"></div>
