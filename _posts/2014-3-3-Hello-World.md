# What is React and why is it so popular?

I am currently a student in GA and here I am trying to recap what I have learnt and discovered throughout the course.
This is my very first post, and I am going to talk about REACT!
If you are studying programming, you must come across this word! But what is it exactly? **Why** do people think it is so great?

## ...so what is it?

React is a javascript library for building user interface(frontend). I will put this way, you are becoming a good friend with 'JS' and sometimes, he makes your life a bit too complicated with all the rules and certain limit. You are getting a bit tired of all of his things, then one day, you met JS's new friend 'React'. React was typical popular kid that everyone likes, and he came tou you telling you all these tricks that he has to deal with the situation that you are going through with JS and said that he will help you out! What a great friend! Therefore, with React's help, you become even closer friend with JS! Happy ending.

It might not be very helpful to you, but what I am trying to say is, with React, it will manage couple of things in a better way that JS couldn't. I will show you some examples.


## quick example
This is an example that I created using pure Javascript.
![code example](/images/1-what-is-react/count-js.png)

All I want is making a button and span so each time I press the button, I want to show the increased number next to the button. As you can see, there are so many 'appendChild' to create some elements.

![](https://media.giphy.com/media/nkLB4Gp8H6hFe/giphy.gif)


Let's have a look what I wrote in React

```javascript
import React, { useState } from 'react';

function App () {
  const [count, setCount] = useState(0)
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => {
        setCount(count +1)
      }}>increment</button>
    </div>
  )
}

```
<iframe src="https://codesandbox.io/embed/jj0vxjy5v5?fontsize=14" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>