デフォルトのjekyllnow 日付周りが日本っぽくなかったので修正


# 修正点

* Topの記事一覧で日付出てほしかったので、下の方に追加。合わせて日付の書式も日本っぽく? YYYY.MM.DDに変更


```
      <div class="date">
          \{{ post.date | date: "Posted on %Y.%m.%d" \}}
      </div>

```

* 日付の文字がデカかったので修正。ついでになんとなく右寄せに

```
 .date {
    font-style: italic;
    color: $gray;
 +  float: right;
 +  font-family: $helveticaNeue;
 +  font-size: 18px;
 +
  }

```

* post側の書式も合わせて修正

```
   <div class="date">
      \{{ page.date | date: "Posted on %Y.%m.%d" \}}
   </div>

```

## 結果
多少いい感じになった?
