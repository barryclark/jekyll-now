---
layout: post
title: Corrlated n coins
date: 2023-02-03
---
This is a problem from Leonard Susskind first Stanford's lecture on statistical mechanincs.
You have a collection of $n$ coins laid out in a row. If you meassure one of them and it is up, then the first neighbors
are three quarters to be down. What is the total entropy of such a system?

$ H(x_{1}, x_{2}, ......., x_{n}) = H(x_{1}) + H(x_{2}\vert x_{1}) + H(x_{3}\vert x_{1},x_{2}) + .....$

$ H(x_{1}, x_{2}, ......., x_{n}) = H(x_{1}) + (n-1)H(x_{n+1}\vert x_{n})$

$$ H(x\vert y) = \sum_{y_i} p(y_i)H(x\vert y_i) $$

$H(x_{n+1}\vert x_{n}) = \frac{1}{2}ln(2) + \frac{1}{2}(-pln(p) - (1-p)ln(1-p))$

$H(x_{1}, x_{2}, ......., x_{n}) = ln(2) + \frac{n-1}{2}ln(2) + \frac{n-1}{2}(-pln(p) - (1-p)ln(1-p))$

The dependence decreaces the entropy of the row of coins. 

