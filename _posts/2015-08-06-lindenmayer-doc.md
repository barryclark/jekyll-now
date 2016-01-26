---
title: Generating Fractals with Lindenmayer Systems
description: L-systems are formal grammar structures used in the study of both botany and mathematics, usually to simulate iterative or recursive structures, such as algae or fractals. In this case, we employ them to render fractals.
layout: post

icon: pine-tree

project_title: /lindenmayer
project_url: http://jbuckland.com/lindenmayer

github: http://github.com/ambuc/lindenmayer
---

[<img src="/images/lindenmayer_thumbnail.png">](/lindenmayer)


##About Lindenmayer Systems

**L-systems** are formal grammar structures used in the study of both botany and mathematics, usually to simulate iterative or recursive structures, such as algae or fractals. In this case, we employ them to render fractals.

As noted, in the [Wikipedia article](https://en.wikipedia.org/wiki/L-system) on L-systems (from which much of this math is cribbed), an L-system can be represented by the tuple $$\v G = (V, \omega, P)$$

- where $\v G$ is the _alphabet_,  
- $\omega$ is the _seed_, the first string, and   
- $P$ is the set of _production rules_, by which the current string is replaced by definitions from the alphabet.

##Dragon Curve

Let's take the famous Dragon Curve for example. Here,  

- $\v G = [X, Y]$,  
- $\omega = FX$, and  
- $P = (X \longrightarrow X+YF+,\quad Y \longrightarrow -FX-Y)$. 

In this example, $X$ and $Y$ are variables, which get replaced iteratively with the definitions in $P$; $+$ and $-$ are _right_ and _left_ turns, respectively, and $F$ means _go forwards_.

At a depth of 0, we have only the initial string $\omega$: 

> $FX$

At a depth of 1, we get 

> $FX \longrightarrow F[X]$  
> $\phantom{FX} \longrightarrow F[X+YF+]$  
> $\phantom{FX} \longrightarrow FX+YF+$

At a depth of 2, we get 

> $FX+YF+ \longrightarrow F[X]+[Y]F+$  
> $\phantom{FX+YF+} \longrightarrow F[X+YF+]+[-FX-Y]F+$  
> $\phantom{FX+YF+} \longrightarrow FX+YF++-FX-YF+$

You can see where this is going. 

The dragon curve takes a number of iterations to get going, but many of the other curves show high levels of self-similarity at a depth of only 1 or 2. It depends on the rewriting rules.

##Design of the Application

[Josh Mermelstein](https://github.com/JoshMermel) and I wrote a very simple Python script which can parse these sorts of string rules, stored in a dictionary (later, a Javascript object). It then iteratively *replaces* the necessary strings, *swaps* out those strings for an array of commands, and then *evaluates* each of those commands. Using [Turtle Graphics](https://en.wikipedia.org/wiki/Turtle_graphics), Python then drew that pattern on-screen. The webapp is simply a javascript port of the same code, with the ability to modify the constants and redraw the fractal in real time.

##Pseudo-psuedocode
(Actually valid Python.)

	from turtle import *

	//recursively rewrites $str to a given $depth using an $alphabet
	def rewrite(str, alphabet, depth):
	    if depth == 0:
	        steps = ''
	        for char in str:
	            if char in alphabet:
	                steps += alphabet[char]
	            else:
	                steps += char
	        return steps
	    else:
	        return rewrite(rewrite(str, alphabet, 0), alphabet, depth-1)

	//translates a series of $steps into commands using an $alphabet
	def translate(steps, alphabet):
	    commands = []
	    for char in steps:
	        commands.append(alphabet[char])
	    return commands

	if __name__ == '__main__':
	    T = Turtle()
	    T.speed("fastest")
	    segmentLength = 10
	    depth = 3

	    //the entire fractal is here
	    rewritingRules = {
	    	'L' : '+RF-LFL-FR+' , 
	    	'R' : '-LF+RFR+FL-'
	    }
	    alphabet = {
	    	'L' : '' , 
	    	'R' : '' , 
	    	'+' : 'T.lt(90)' ,
	    	'-' : 'T.rt(90)' , 
	    	'F' : 'T.fd(segmentLength)'
	    }
	    seed = 'L'

	    steps = rewrite(seed, rewritingRules, depth)

	    instructions = translate(steps, alphabet)

	    for item in instructions:
	        if item:
	            eval(item)

The Javascript source can be found [on Github](https://github.com/ambuc/lindenmayer/tree/gh-pages).


See the demo at **[/lindenmayer](/lindenmayer).**
