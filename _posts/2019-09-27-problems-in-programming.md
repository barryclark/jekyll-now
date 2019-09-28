---
layout:     post
title:      Problems in programming
date:       2019-09-27 12:32:18
active:     Yes
summary:    Solving simple problems with elegant solutions in different languages.
category: Personal project
thumbnail: 
tags:
- Swift
- Python
- Kotlin
---

<p>
  <a class="chip read-more" target="_blank" href="https://github.com/JoelWhitney/problems-in-programming">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 14.25H3.75V3.75H9V2.25H3.75C2.9175 2.25 2.25 2.925 2.25 3.75V14.25C2.25 15.075 2.9175 15.75 3.75 15.75H14.25C15.075 15.75 15.75 15.075 15.75 14.25V9H14.25V14.25ZM10.5 2.25V3.75H13.1925L5.82 11.1225L6.8775 12.18L14.25 4.8075V7.5H15.75V2.25H10.5Z" fill="#dab827"></path></svg> View on GitHub
  </a>
</p>


## Overview

Writing code and solving problems has always been a great way for me decompress. It can also be a good way to regain focus as my mind begins to slip. These problems can also make great interview questions to see how a candidate approaches a problem.

Problems in programming is a place for me to solve simple problems with elegant solutions in different languages. I'll continue to revisit this topic and update the post whenever I need a break from whatever I'm working on.


<!---
Outcome
-->

## Example problem

**Problem statement:** Write a function that takes in an array of words / short phrases and returns palindromes
<br>**Input:** Array strings
<br>**Output:** Array strings

{% highlight python %}
let words = [" Madam", "Nurses Run", " Palinwho?"]

func returnPalindromes(_ words: [String]) -> [String] {
    return words.filter { isPalindrome($0) }
}

private func isPalindrome(_ word: String) -> Bool {
  let word = word.lowercased().split(separator: " ").joined(separator: "")
    return word == String(word.reversed())
}

let palindromes = returnPalindromes(words)
print(palindromes)
{% endhighlight %}
