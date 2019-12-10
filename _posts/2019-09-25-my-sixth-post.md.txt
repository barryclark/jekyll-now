---
Category: post
title: Learning Journal for September 25th
---
### Homework: The observer pattern in Java

## Analogy

Using the newspaper as an example, the subscribers are like observers. They will get updated when there is a new volume of newspaper. The newspaper itself is like a subject. Its job is to update its own content.

There are more details that the developers need to answer before using the observe pattern:
1. Who is going to notify the observers? 
2. How is the data accessed? The observers *** pull *** the data? The subject ***push*** the data?

java.util.Observable answers these questions by giving both subject and observers the flexibility to pull and push data depending on the needs.

Taking the weather forecast model as an example:
[subject with pull modle] (https://github.com/EmilyStacy-droid/EmilyStacy-droid.github.io/blob/master/images/20190925-java%20observer%20pattern.png)
