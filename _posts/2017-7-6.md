---
layout: post
title: An issue with Section 9 Lecture 105
---

Wanted to jot down a few thoughts on Section 9, Lecture 105. This is the Annoy-O-Matic Code Along exercise of this Web Development course by Colt Steele.
Basically, he is creating a blank HTML site, with a javascript connected to the HTML page. The purpose of this web app is to keep asking the user
if they have arrived at their location. You get prompted to answer with a 'yes' or 'no'. If you reply no, you keep getting asked. This is due to the program
using a while loop to keep asking.

The purpose of this exercise is to solidify what he teaches on While loops. A few things I noticed while watching this is that in a previous lecture in this section is that he goes over the DRY acronym. DRY stands for "Do not Repeat Yourself". This is the foundation of a loop. It allows you to no repeat
yourself. In this lecture. I noticed he breaks this rule and I feel that, in my opinion, is a mistake. It may cause the student confusion. Why doesn't he
enforce this? I feel that, if you are going to introduce best practices, such as DRY, you need to enforce those best practices throughout the course.
Here is one example of the code he uses:
```javascript
var answer = prompt("are we there yet?"); // First use

while(answer.indexOf("yes") === -1) {
  var answer = prompt("are we there yet?"); // Second use
}

alert("YAY, WE MADE IT!!!");
```
As you can see. He uses the same prompt twice. Of course, he hasn't gone over functions yet which would fix this, but here is my version:

```javascript
while(true){
  var answer = prompt("Are we there yet?");

  if(answer.indexOf("yes") === -1){
    alert("YAY WE ARE THERE!");
    break;
  }
}
```
With my version. I came across a bug that I did not understand. It did not occur for Colt's version, but it did with mine. I didn't come up with an explanation
until I started writing this. Then I had an "Ohhhhhhh" moment. My bug is within `if(answer.indexOf("yes") === -1)`. Since `answer.indexOf("yes")` returns `0`, the loop would
continue to prompt the user. If the user inputs "no" then the condition is true and runs the `alert()` and breaks out of the loop. Now Colt hasn't introduced `breaks` but
since I have previous programming experience. I knew it was an option I could use here. With that big discovery, and understanding why it was there. I changed my code
to the below example:

```javascript
while(true){
  var answer = prompt("Are we there yet?");
  console.log(answer.indexOf("yes"));
  if(answer.indexOf("yes") === 0 || answer.indexOf("yeah") === 0){
    alert("YAY WE ARE THERE!");
    break;
  }
}
```

Now when indexOf `returns -1` for "no". It keeps looping until it receives 0 for "yes" or "yeah". Now I understand how writing about a bug and things you don't understand is a good idea. Writing this all out actually helped me understand this more.
