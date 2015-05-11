---
layout: post
title: invocation 调用指令
---

<h1>Function Invocation</h1>

    function hello(thing) 
        { 
            console.log(this + " says hello " + thing);
        }
    
    hello.call("Yehuda", "world") 
    
    //=> Yehuda says hello world  


<h2>简单的函数调用</h2>

function hello(thing) {  
  console.log("Hello " + thing);
}

// this:
hello("world")

// es5模式下等价于:
hello.call(window, "world");  

// es5 严格模式下等价于
hello.call(undefined,'world');

a function invocation like fn(...args) is the same as fn.call(window [ES5-strict: undefined], ...args).

(function() {})() is the same as (function() {}).call(window [ES5-strict: undefined).
