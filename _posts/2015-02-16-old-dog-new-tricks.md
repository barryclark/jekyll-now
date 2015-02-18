---
layout: post
title: old dog, new tricks
---

Suppose we have a loop that only terminates when killed. What might make this interesting?

{% highlight python %}
while True:
	print("Hello, world. Coffee time!")
	time.sleep(86400)
else:
	# Nothing. We'll never hit this line.
{% endhighlight %}

In the meantime I'll be at [contrafactum](https://github.com/contrafactum/) on GitHub.