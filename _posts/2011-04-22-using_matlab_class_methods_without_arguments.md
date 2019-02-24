---
layout: post
title: Using MatLab class methods without arguments
tags: [matlab, old blog]
keywords: [programming]
---

Sometimes in [MatLab](https://www.mathworks.com/products/matlab.html) you’ll have a class, and you want to have a function or method in that class that modifies an instance variable in some way. But if you code your class like this:

Code:
{% highlight matlab linenos %}
	classdef my_class
	  properties
	    my_variable = 2;
	  end
	  methods
	    function doubleMyVariable()
	      my_class.my_variable = my_class.my_variable * 2;
	    end
	  end
	end
{% endhighlight %}

And you try to use that function once you made an object from your class:

Code:
{% highlight matlab linenos %}
	my_object = my_class;
	my_object.doubleMyVariable()
{% endhighlight %}

You’ll end up with a very annoying error like this:

Code:
{% highlight matlab linenos %}
	??? Error using ==> roll_dice
	Too many input arguments.
{% endhighlight %}

WTF?!?!? There’s no arguements! Well, that’s because MatLab secretly passes the object itself as an arguement. So there’s always at least one arguement, even if you don’t specify it. To fix this, change your class definition to this:

Code:
{% highlight matlab linenos %}
	classdef my_class
	  properties
	    my_variable = 2;
	  end
	  methods
	    function doubleMyVariable(my_class)
	      my_class.my_variable = my_class.my_variable * 2;
	    end
	  end
	end
{% endhighlight %}

And your code should work. Couldn’t find this anywhere on the internet, so if you’re having this trouble, I hope this helps!

Until next time

Joe
