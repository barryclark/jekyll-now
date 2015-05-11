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


<h2>方法调用</h2>

    var person = {  
        name: "Brendan Eich",
        hello: function(thing) {
            console.log(this + " says hello " + thing);
        }
    }

    // this:
    person.hello("world")

    // 等价于desugars to this:
    person.hello.call(person, "world");  
    
<h2>Using Function.prototype.bind</h22>

Because it can sometimes be convenient to have a reference to a function with a persistent this value, 

people have historically used a simple closure trick to convert a function into one with an unchanging this:

    var person = {  
        name: "Brendan Eich",
        hello: function(thing) {
            console.log(this.name + " says hello " + thing);
        }
    }
    var boundHello = function(thing) { return person.hello.call(person, thing); }
    boundHello("world");  
