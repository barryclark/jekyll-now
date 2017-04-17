---
layout:     post
title:      Играем мышцами в этом шаблоне
date:       2014-06-10 12:31:19
summary:    Демонстративно показываем возможности шаблона
categories: jekyll
thumbnail: cogs
tags:
 - demo
 - возможности
 - шаблон
---

**Важно** - Это производная статья ["See pixyll in action"][1], взятая из любимой jekyl темы [pixyll][4].

Все ссылки легко [найти и опознать](#)
 	[Link display text](http://www.sampleurl.com)
   , не отвлекая от гармонии параграфа. Это 
правило распространяется на _курсив_ и __полужирный__ текст. Вычёркивание работает 
<del>на всякий пожарный</del> на тот случай, если надо обновить пост.
Что бы не выделяться, <ins>или наоборот выделить себя</ins> отлично работает и 
подчёркивание.

### Код, синтаксис и подсветка

Блоки кода используют тему [peppermint][2].

{% highlight ruby %}
class Awesome < ActiveRecord::Base
  include EvenMoreAwesome

  validates_presence_of :something
  validates :email, email_format: true

  def initialize(email, name = nil)
    self.email = email
    self.name = name
  end
end
{% endhighlight %}

```html
<!DOCTYPE html>
<title>Заголовок</title>

<style>body {width: 500px;}</style>

<script type="application/javascript">
  function $init() {return true;}
</script>

<body>
  <p checked class="title" id='title'>Title</p>
  <!-- here goes the rest of the page -->
</body>
```

# Заголовки!

Они адаптивны и пропорциональны (в `padding`, `line-height`, `margin`, и `font-size`).

##### Они обращают правильное внимание на себя

Что позволяет подавать информацию в правильной иерархии и логике

### Есть списки, конечно

  * Яблоки
  * Груши
  * Помидоры
  * Молоко

  1. Покосить газон
  2. Покормить кошку
  3. Брейк-данс!

### Изображения выглядят отлично

![Thumper](https://i.imgur.com/DMCHDqF.jpg)


### Стильные цитаты включены в счёт

Можно использовать встроенный синтаксис _markdown_, `>` для простых цитат.

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis porta mauris.

### Поддержка форматирования текста [LaTeX](https://ru.sharelatex.com/)

По умолчанию разделителями являются \$\$. Следовательно, `$$ E = m \cdot c^2 $$` дает $$ E = m \cdot c^2 $$

Ну и кое-что повеселее:

$$ \zeta(s) = \frac{1}{\Gamma(s)} \int \limits_0^\infty x^{s-1} \sum_{n=1}^\infty e^{-nx} \mathrm{d}x = \frac{1}{\Gamma(s)} \int \limits_0^\infty \frac{x^{s-1}}{e^x - 1} \mathrm{d}x $$


### Со временем возможны улучшения

Следим за [Github репозиторием][3] для запросов,
добавлений, функций.

Кодим дальше.

[1]: http://pixyll.com/jekyll/pixyll/2014/06/10/see-pixyll-in-action/
[2]: https://noahfrederick.com/log/lion-terminal-theme-peppermint/
[3]: https://github.com/jacobtomlinson/carte-noire
[4]: http://pixyll.com/
