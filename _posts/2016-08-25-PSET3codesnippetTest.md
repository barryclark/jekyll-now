---
published: true
layout: post
title: 'Jekyll, code snippet for CS50 pset3'
tags: Herp derp
---
## CS50 code snippet for PSET3

Enter text in [Markdown](http://daringfireball.net/projects/markdown/). Use the toolbar above, or click the **?** button for formatting help.

{% highlight ruby linenos %}
def show
  puts "Outputting a very lo-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-ong lo-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-ong line"
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
{% endhighlight %}


another test "C"

{% highlight c linenos %}
#include <stdio.h>

int main (void){
  printf("hello world");
}

{% endhighlight %}

For reference:
![2016-08-25_21-17-32.png]({{site.baseurl}}/images/2016-08-25_21-17-32.png)

Trying the same code snippet in "C" using the "ruby"
see reference:

![2016-08-25_21-19-26.png]({{site.baseurl}}/images/2016-08-25_21-19-26.png)


{% highlight ruby linenos %}
#include <stdio.h>

int main (void){
  printf("hello world");
}

{% endhighlight %}