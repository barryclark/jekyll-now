---
layout: post
title: Blackboard Language Pack for Latin Countries with different decimal setup
date: '2014-09-16 16:00:00'
---

**UPDATED version below 2014-09-16**

Several times a day we get asked why things are not made for latin american countries where we do whatever we want and in some cases latin american countries simply wont follow the rules made by other countries, so some of the languages packs pretty much won't apply for our countries, in the most case Mexico and Colombia and maybe Brasil.

So, looking at the difference language packs there is not much difference, you can easily customize if you feel comfortable fiddling around and moving things here and there, specially if you don't like sticking to the basic (hey who knows, you can be one of those? )

Well, at the end there is a simple step if you don't want to modify much, and pretty much just the simple way it calculates the grades in the grade center or in the assessments and where ever you need to insert a decimal value or maybe a thousand value.

I will not go over this much, because its actually very simple if you just want to modify it to accept this values.

So here it is:
1. Download the Language Pack that you wish to edit (in my case i used the Spanish Spain)</li>
2. Unzip it -&gt; remember this step because you will have to zip it the same way</li>
3. Open the folder that is called "ES_SP"</li>
4. Locate the file: LocaleSettings.properties</li>
5. Open this file and you will edit the following sections:
6. **First Part**

	# The following resources belong to NumberFormat
	# Only substitute equivalent characters where necessary
	# Note: Keep the decimal_point here in sync with the one used in the float formats below
	{% highlight bash %}
	number_format.decimal_point=,
	number_format.thousands_sep=.
	number_format.exponent=eE
	{% endhighlight %}
7. **Second Part**

	# Regular expressions for Javascript number validation.
	{% highlight bash %}
	float.format=^[0-9]*(\\\\,[0-9]+)?$
	float.allow.negative.format=^[-]?[0-9]*(\\\\,[0-9]+)?$
	efloat.format=^[+-]?[0-9]*(\\\\,[0-9]+)?([eE][+-]?[0-9]+)?$
	{% endhighlight %}
8. **Change it to the first part looks like this**

	# Only substitute equivalent characters where necessary
	# Note: Keep the decimal_point here in sync with the one used in the float formats below
	{% highlight bash %}
	number_format.decimal_point=.
	number_format.thousands_sep=,
	number_format.exponent=eE
	{% endhighlight %}
9. **Change it to the second part looks like this**

	# Regular expressions for Javascript number validation.
	{% highlight bash %}
	float.format=^[0-9]*(\\\\.[0-9]+)?$
	float.allow.negative.format=^[-]?[0-9]*(\\\\.[0-9]+)?$
	efloat.format=^[+-]?[0-9]*(\\\\.[0-9]+)?([eE][+-]?[0-9]+)?$
	{% endhighlight %}
10. As you can see is a pretty straight forward change but it actually needs to know where to look at. After this I made a few extra steps that i loved because it changes the way it will look like in the Language Packs section, so go to the _"bb-lp-manifest.xml"_ file and open it I have made it look like the following:
	{% highlight xml %}
	<?xml version="1.0" encoding="UTF-8"?>
    <manifest>
    	<languagepack>
          <name value="EspaÃ±ol (MÃ©xico)"/>
          <locale value="es_MX"/>
          <leftToRight value="true"/>
          <description value=""/>
          <version value="1.0.0"/>
          <bbversion value="9.1.60230.0"/>
          <vendor>
            <id value=" "/>
            <name value=""/>
            <url value=""/>
            <description value=""/>
          </vendor>
    	</languagepack>
    </manifest>
	{% endhighlight %}
As you can see above, there a few things to notice:

* The name of the language pack now states: "Espanol Mexico"
* The locale value is "es_MX" -&gt; this is extra important THIS IS HOW YOUR FOLDER NEEDS TO BE CALLED
* And last: the bbversion value -> you might already know why this is important but it has to match your version and this has to be for the specific need.

So after we have changed it, we change the folder name of es_SP to es_MX and then we zip the folder and the bb-lp-manifest.xml and tada! we have our new language pack.

**updated version 2014-09-16**
In Sp13 and above there are a few differences.

1. the files are the same
2. the procedure is the same
3. but the following are the contents of those lines
	{% highlight bash %}
		number_format.decimal_point=.
    number_format.thousands_sep=,
		number_format.exponent=eE
	{% endhighlight %}
and in the second file should be
	{% highlight bash %}
		# Regular expressions for Javascript number validation.
		float.format=^(([0-9]{1,3}(\\\\,[0-9]{3})*)|[0-9]*)(\\\\.[0-9]+)?$
		float.allow.negative.format=^((([-]?[0-9]{1,3}(\\\\,[0-9]{3})*)|[-]?[0-9]*)(\\\\.[0-9]+)?|\\\\.[0-9]+)?$
		efloat.format=^[+-]?[0-9]*(\\\\.[0-9]+)?([eE][+-]?[0-9]+)?$
	{% endhighlight %}
		# Regular Expression for Thousand separator.
		thousand.sep.format=,

4. now you still need to make the folder with the correct naming so it should work correctly.
