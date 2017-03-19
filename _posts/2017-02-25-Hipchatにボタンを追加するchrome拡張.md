# TL;DR

hipchatにRe:ボタンとquoteボタンを追加するchrome拡張を作ったよ


# 背景

業務で他のチャットツールと使っていたが、もろもろの事情によりhipchatに移行したところメンバーからhipchatがつかいづらいという声があがった

→のでつくった

hipchatにない返信ボタンをつくったり、quoteコマンドを1ボタンでいけたら多少は楽になるんじゃないかという考え

# モノ

[https://github.com/taross-f/HipchatButtons](https://github.com/taross-f/HipchatButtons)

# ソース

* ボタンがなかったら追加する、ってのを5秒毎にやってるだけ(room変わったり発言あったりするので)
* ボタンクリックで発言内容をとってinputにつっこむだけ
* hipchatはフロントがreactで素直に突っ込むとうまく動かないところを適当に遅延させてなんとかやり過ごしている

```js

$(function(){
    console.log("hipchat buttons loading...");

    setInterval(function() {
        var buttons = $(".msg-line > .hc-dropdown");

        buttons.each(function(_, element) {
            var b = $(element);
            if (b.children('.btn-addon').length) return; // if already button exists, do nothing
            
            // add quote button
            var quoteButton = $("<button style='height:18px;' class='btn btn-success btn-addon btn-xs'>Qt:</button>");
            quoteButton.bind("click", function () {
                setTimeout(function() { // delay to avoid React clears message-input
                    $("#hc-message-input").val("/quote " + b.next('.msg-line').text());
                }, 100);
            });
            b.append(quoteButton);

            // add Re: button
            var reButton = $("<button style='height:18px;' class='btn btn-addon btn-primary btn-xs'>Re:</button>");
            reButton.bind("click", function () {
                setTimeout(function() {
                    var name = b.parents('.hc-chat-msg').children('.sender-name').text();
                    if (!name.startsWith("@")) name = b.parents('.hc-chat-msg').children('.sender-name').attr('aria-label');
                    $("#hc-message-input").val("Re: " + b.parents('.hc-chat-msg').children('.sender-name').text() + " ");
                }, 100);
            });
            b.append(reButton);            
        }, this);
    }, 5000);
});


```

## 既知の問題

* ボタンをあとから入れるので、一旦表示されたあとスクロールが微妙にずれる。(改行が変わってしまうところがあるため。scrollのさせかたがわからない…) 一番気持ち悪い
* `s/foo/bar` 対応はしてない
* quoteはそのあとに半角スペースなど何かしら入れないと投稿できない

## おまけ

結局hipchatからもとのチャットツールに戻りました。拡張だけでそれぞれの要望を満たすのはムズカシイねー
