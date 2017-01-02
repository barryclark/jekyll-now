---
layout: post
title: ネットワーク表示用Markdown.js 解説
---

昨年末の実装しました [jquery-jNetPreview-0.0.1.js](https://github.com/xinolinx/xinolinx.github.io/blob/e726714dc92207f4075eedb7bead3419a8cf5744/js/jquery-jNetPreview-0.0.1.js) について忘れないうちに構造メモを取っておこうと思います。GPLのライセンスですので、ご自由に利用くださいませ（商用・非商用・変更すべて可能です）。本ファイルの他にjQueryが必要になりますので、別途`<script>`タグで組み込んでください。

利用する際にはRAWでDLした後に、ネットワーク表示をさせたい箇所に埋め込んで下さい。`id="pclink-info"`が構造を記載する箇所で、`id="pclink"`の中に出力されます。複数セット表示したい場合は、`id="pclink-info"`と`id="pclink"`のペアを複数定義すると表示可能です（同数存在しない場合はエラーとして処理を停止します）。

```bash
$ wget https://raw.githubusercontent.com/xinolinx/xinolinx.github.io/master/js/jquery-jNetPreview-0.0.1.js
```

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    ...
    <script type="text/javascript" src="/js/jquery-1.6.1.min.js"></script>
    <script type="text/javascript" src="/js/jquery-jNetPreview-0.0.1.js"></script>
    ...
  <head>
  <body>

<div id="pclink-info">
ni,gateway,internet
 nw,xinolinx-sub,192.168.0.1,wifi
  pn,nec_note,dhcp,none
  pd,subpc,dhcp,game,wire
 ns,xinolinx-bf1,192.168.0.3,none
  pd,masterpc,192.168.0.103,wire
  ps,linux,192.168.0.102,dualwire
</div>
<div id="pclink"></div>

  </body>
</html>
```

それでは、ソースコードの抜粋です。

<!--break-->

まず、画像が格納されているディレクトリを指定します。このままでも構いません。

```	javascript
var imgdir = "https://xinolinx.github.io/images/icon/";
```

次に`id="pclink-info"`と`id="pclink"`のペアを描画関数`draw_pc_link_for_each`へ渡します。ここで個数の判定などをしています。

```javascript
	function draw_pc_link (list_pclink, list_infos){
		if (list_pclink.length == 0) {
			/* Canvas is NOT exist (bye) */
			return;
		}
		if (list_pclink.length != list_infos.length) {
			/* Canvas is NOT exist (bye) */
			return;
		}
		for (var i = 0; i < list_pclink.length; i++) {
			var target = list_pclink.get(i);
			var info = list_infos.get(i);
			draw_pc_link_for_each(target, info);
		}
```

描画関数では、まず、改行コード`\n`OR`\r\n`で情報を分割しノード情報に分離します。また、`id="pclink-info"`を非表示にし、ノードにmouseoverしたときに表示するコメント用のdiv`$(commnet)`を生成して隠しておきます。

```javascript
		function draw_pc_link_for_each(canvas, info)
		{
			var string = info.firstChild.data;
			var nodes = string.replace("\r", "").split("\n");
			... 
			/* floating canvas */
			$(info).hide();
			...
			var comment_tag = "<div>comment</div>";
			$(canvas).append(comment_tag);
			var comment = canvas.lastChild;
			$(comment).hide();
```

以降は各行毎に処理します。`,`で行を分割し、先頭の` `(半角空白文字)の個数で階層を判断します。

```javascript
			for(var node of nodes) {
				if (node == "") {
					continue;
				}

				var attrs = node.split(",");
				var depth = 0;
				var depthinfo = attrs[0].match(/ /gm);
				if (depthinfo) {
					depth = depthinfo.length;
				}
```

階層が変化した場合は行を切り替えます。

```javascript
				if (depth > prevdepth) {
					/* enter children */
					left = depth * size_w;
					top = top + size_h;
				} else if(depth < prevdepth) {
					/* leave children */
					left = depth * size_w;
					top = top + size_h;
				}
```

以降は各ノードに対応した画像を埋め込んでいます。どのような画像が出力されるかは、`getimgurl(type)`関数と、`getimgurl_option(option)`関数を参照してください。


- `getimgurl(type)`関数
 - ni ... インターネットゲートウェイ
 - nw ... Wi-Fi
 - ns ... ネットワークスイッチ
 - pn ... PC(ノート型)
 - pd ... PC(デスクトップ型)
 - ps ... PC(サーバ型)
 - pt ... タブレット端末
 - pa ... Android端末
 - tv ... TV機
 - gm ... Game機
 - op ... プリンタ
 - os ... ストレージ
 - other ... PC(サーバ型)
  
- `getimgurl_option(option)`関数
 - wire ... 有線NIC
 - dualwire ... デュアルポート有線NIC
 - scan ... スキャナ
 - wifi ... 無線LAN
 - game ... ゲームパッド
 - storage ... ストレージ
 - printer ... プリンタ接続
 - func ... 特定機能
 - other ... 透明画像(48x48px)
 
```javascript
				var setimg = "<img"
					+ " src=\"" + getimgurl(type) + "\""
					+ " alt=\"" + name + "\""  
					+ " name=\"" + name + "("+ info + ")" + "\""  
					+ " />";

				$(canvas).append(setimg);
				var settag = canvas.lastChild;
				var setcss = {
					position: "absolute",
					top: top + "px",
					left: left + "px"
				};
				$(settag).css(setcss);
				
				/* multi option */
				var option = attrs[current_option_pos];
				while (option) {
					setimg = "<img"
						+ " src=\"" + getimgurl_option(option) + "\""
						+ " alt=\"" + name + "\""  
						+ " name=\"" + name + "("+ info + ")" + "\""  
						+ " />";
					$(canvas).append(setimg);
					settag = canvas.lastChild;
					$(settag).css(setcss);

					current_option_pos++;
					option = attrs[current_option_pos];
				}
```

最後に、最も上にかぶせてある画像タグが`$(settag)`に格納されていますので、そこにmouseイベントを付与して完了です。mousemoveでコメント位置を微調整し、mouseoverで表示と表示内容の格納、mouseoutで非表示にします。

```

				$(settag).mouseover(
				function (e) { ... });
				
				$(settag).mouseout(
				function (e) { ... });
				
				$(settag).mousemove(
				function (e) { ... });	
```

以上で完了です。お疲れ様でした。
