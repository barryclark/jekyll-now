---
title: Misclassification error rate, ROC and AUC of a normally distributed prognostic
  test
author: "Chamberlain Mbah"
layout: post
output: html_document
published: true
status: publish
tags: R
draft: no
---
 
A test can be a medical test for the presence of a given disease, a test of strength of a material in an industrial setting, or in an educational setting a test to determine the level of understanding of students.  
 
 
Visualise a test as a machine that takes in certain inputs and outputs results, based on these results certain decisions are made. The nature of a test inputs is usually the characteristics of the test object. In a medical certain, where the test investigates the presence of a disease, the input maybe a blood sample from the patient (test object). The strength of a material may be tested by inputting some chemical or physical properties of the material (test object) into a test. Finally, testing the understanding of students may be done by a written exam, where students (test object) give as input into the test their written answers to questions. 
Before using a given test commercially or to make important decisions, its performance must have been assessed. The performance of a test can only be assessed if the expected/true outcome of the test is known.  The results from the test are compared with that of the truth to see how well it matches.  In the case of a binary test, that is when only two outcomes are expected from a test, only two types of errors can be made. Using medical terminology, where a test results maybe positive or negative, the two errors are call false positive and false negatives. As the names imply, a false positive result, is when a test gives as output a positive result when the truth is a negative and similarly for false negatives. 
 
 
In statistics and machine the terminology, discriminant function, is usually used instead of a test.  A statistical model is built/trained and the end results is a discriminant function.   This discriminant function is then used as the test.  We will only discuss the case of binary discriminant functions.
 
This article discusses some special distribution of the discriminant function and their corresponding misclassification error rates, auc and ROC. 
 
Let $D$ be a discriminant function/test and let $Y$ be the true binary test results taking values $\{0,1\}$. Assume that $D$ has the distribution: 
\[D \sim \left\{
  \begin{array}{lr}
    N(a,b^2) & :Y = 1\\
    N(-a,b^2) & : Y=0 
  \end{array}
\right.
\]
and that dicision making with $D$  is as follows:
\[\text{output} = \left\{
  \begin{array}{lr}
    1 & : D > \kappa\\
    0 & : D \leq \kappa\\
  \end{array}
\right.
\]
 
Set $a=2$ and $b=1$, a visualisation of the two distribution is given as follows

{% highlight r %}
N=1000
set.seed(18)
a=2;b=1
D_pos=rnorm(N,a,b)
D_neg=rnorm(N,-a,b)
hist(D_pos,breaks=50,xlim=c(-8,8),col=rgb(1,0,0,0.5),xlab=" ",main="Postive and negative")
hist(D_neg,breaks=50,add=T,col=rgb(0,0,1,0.5))
{% endhighlight %}

![plot of chunk unnamed-chunk-1](/figures/unnamed-chunk-1-1.png)
 
 
 
The misclassification error rate (MER) of $D$ is given by:
\[
\text{MER($\kappa$)}=\Pr(D>\kappa|Y=0)+\Pr(D\leq\kappa|Y=1)
\]
 
These two probabilities have a specific form
\[
\Pr(D>\kappa|Y=1)=1-\Pr(\frac{D+a}{b}<\frac{\kappa+a}{b})=1-\Phi(\frac{\kappa+a}{b})
\]
 
\[
\Pr(D\leq\kappa|Y=0)=\Pr(\frac{D-a}{b}<\frac{\kappa-a}{b})=\Phi(\frac{\kappa-a}{b})
\]
 
There MER($\kappa$) is given by:
\[
\text{MER($\kappa$)}=1-\Phi(\frac{\kappa+a}{b})+\Phi(\frac{\kappa-a}{b})
\]
 
The AUC is also defined as follows (wlog assumme that positive results are less than negative results)
\[
AUC(\kappa)=\Pr(\{D|Y=1\}>\{D|Y=0\})=\Phi\left(\frac{2a}{\sqrt{2}b}\right)
\]
 
For the simulated data above, let $\kappa=0$ (note this is an abitrary choice of $\kappa$). 

{% highlight r %}
kappa=0
#theoritical/truth
MER_theo=1-pnorm((kappa+a)/b)+pnorm((kappa-a)/b)
AUC_theo=pnorm((2*a)/(sqrt(2)*b))
 
#empirical
MER_emp=c()
AUC_emp=c()
for(i in 1:(10*N)){
D_pos=rnorm(N,a,b)
D_neg=rnorm(N,-a,b)
MER_emp[i]=sum(D_pos<kappa)/N+sum(D_neg>kappa)/N
 
r = rank(c(D_pos,D_neg))  
AUC_emp[i] = (sum(r[1:N]) - N*(N+1)/2) / (N*N) 
}
par(mfrow=c(1,2))
hist(MER_emp,breaks=50,main="",xlab = "Empirical misclassification error")
abline(v=MER_theo,lwd=2,col="red")
hist(AUC_emp,breaks=50,main="",xlab = "Empirical auc error")
abline(v=AUC_theo,lwd=2,col="red")
{% endhighlight %}

![plot of chunk unnamed-chunk-2](/figures/unnamed-chunk-2-1.png)
 
 
 
 

{% highlight r %}
#Biases
mean(AUC_emp-AUC_theo)
{% endhighlight %}



{% highlight text %}
## [1] 5.586191e-06
{% endhighlight %}



{% highlight r %}
mean(MER_emp-MER_theo)
{% endhighlight %}



{% highlight text %}
## [1] -5.463896e-06
{% endhighlight %}
 
