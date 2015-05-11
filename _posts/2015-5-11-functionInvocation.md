---
layout: post
title: invocation 调用指令
---

<h1>Function Invocation</h1>

<code>
    function hello(thing) 
        { 
            console.log(this + " says hello " + thing);
        }
    
    hello.call("Yehuda", "world") 
    
    //=> Yehuda says hello world  
</code>
