---
layout: post
title: old dog, new tricks
---

Let's say we have a loop that only terminates when killed by system shutdown. What would make that loop interesting?

{% highlight python %}
while True:
	print("Hello, world. Coffee time!")
	time.sleep(864000)
else:
	print("Nothing. We'll never hit this line.")
{% endhighlight %}

In the meantime I'll be at [contrafactum](https://github.com/contrafactum/) on GitHub.