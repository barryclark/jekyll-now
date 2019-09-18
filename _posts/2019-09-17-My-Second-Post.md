---
layout: post
title: My Second Post
---
## Learning Journal for September 17th

### Boolean Operator
* equal to ==

a | b | a ==b
--- | --- | ---
*True* | True | True
*False* | True | False
True | False | False
False | False  | True

* not equal to !=

a | b | a !=b
--- | --- | ---
*True* | True | False
*False* | True | True
True | False | True
False | False  | False

* greater than >

a=10 | b=20 | a > b
--- | --- | ---
*True* | True | False
*False* | True | ?
True | False | ?
False | False  | ?

* less than <

a=10 | b=20 | a < b
--- | --- | ---
*True* | True | True
*False* | True | ?
True | False | ?
False | False  | ?

* greater than or equal to>=

a=10 | b=20 | a >= b
--- | --- | ---
*True* | True | False
*False* | True | ?
True | False | ?
False | False  | ?

* less than or equal to <=

a=10 | b=20 | a <= b
--- | --- | ---
*True* | True | True
*False* | True | ?
True | False | ?
False | False  | ?

Reference:
[Tutorial Points](https://www.tutorialspoint.com/Java-Boolean-operators)

* Logical implication: FALSE if the first is true and the 2nd is false, vice versa (if a then b)

a | b | a => b
--- | --- | ---
*True* | True | True
*False* | True | True
True | False | False
False | False  | True

* Logical equality: TRUE if a EQ b

a | b | a EQ b
--- | --- | ---
*True* | True | True
*False* | True | False
True | False | False
False | False  | True

* exclusive disjunction: TRUE if a!EQb

a | b | a XOR b
--- | --- | ---
*True* | True | False
*False* | True | True
True | False | True
False | False  | False


* Logical NAND: FALSE if both are true

a | b | a NAND  b
--- | --- | ---
*True* | True | False
*False* | True | True
True | False | True
False | False  | True

* Logical NOR: FALSE if both are not false

a | b | a NOR  b
--- | --- | ---
*True* | True | False
*False* | True | False
True | False | False
False | False  | True

* Logical Conjunction: AND 

a | b | a AND  b
--- | --- | ---
*True* | True | True
*False* | True | False
True | False | False
False | False  | False

* Logical disjunction: OR 

a | b | a OR  b
--- | --- | ---
*True* | True | True
*False* | True | True
True | False | True
False | False  | False

* Logical Contradiction: all FALSE 

a | b | a F  b
--- | --- | ---
*True* | True | False
*False* | True | False
True | False | False
False | False  | False

Reference:
[wiki truth table](https://en.wikipedia.org/wiki/Truth_table) -found by Zach M.

### Bitwise and Bitshift Operator
* Bitwise Compliment: makes 0 to 1 and 1 to 0, vice versa

a=3 |  | ~a
--- | --- | ---
*0011* |  | *1100(12)*

* signed right shift operator: shift the bit to the right and put 0 to the void left

a=3 |  | >>digit
--- | --- | ---
*0011* | a>>1  | *0001(1)*

* unsigned right shift operator: shift the bit to the right and put 0 to the void left. The leftmost is set as 0

a=3 |  | >>>digit
--- | --- | ---
*0011* | a>>>1  | *0001(1)*


* left shift operator: shift the bit to the left and fills 0 on the voids left
*
a=5 |  | <<digit
--- | --- | ---
*0000 0101* |  a<<2  | *0001 0100(20)* (why is it 20?)

* unsigned left shift operator: the logic is the same as left shift operator

a=5 |  | <<digit
--- | --- | ---
*0000 0101* | a<<1 | *0001 1010(10)* 



Reference:
[geeksForgeeks](https://www.geeksforgeeks.org/bitwise-operators-in-java/)

### Java Drill
Today we did the same drill questions again. Here are two questions that I was not very familiar with:
1. Join an array into a string=> this [link](https://www.javatpoint.com/java-string-join) helped. I didn't get the 2nd method in this example(delimiter + elements)
2. Split a string into an array

### Git & command Line
A common issue I had when I dealt with command line was forgetting the commands. Tim shared a trick by recording commands before closing the window.
> ```history > ..\history.text(save it in the parent directory)```

### Java Tag: text response
1.a string variable with multiple methods: `String input.newLine().trim().length() + "" (empty string)`

### Trust 101
Today our team made three goals for entrusted behavior:

1. character: Talk straight
1. competence: Clarify expectations
1. both: Listen first
Tim suggested us to use the phrases in daily conversations to make it a habit. 

I tried "clarify expectations" and "listen first" on our individual working hour. My team members were all very supportive and we all practiced the skills together. We had a good start.
