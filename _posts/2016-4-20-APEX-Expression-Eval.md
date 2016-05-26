---
layout: post
title: Salesforce APEX Expression Evaluation
---

I was surprised to find out that APEX is missing eval() function. Like JavaScript Eval() ability to check compare string expression seem to be basic function. With all the Metadata support on Force.com platform Expression Evaluation may have seem too low level of a function? Well I searched around but could not find exact examples on github or elswhere, found couple of related articles,
[Adding Eval() support to Apex](http://www.fishofprey.com/2014/11/adding-eval-support-to-apex.html),
[EVAL() IN APEX](https://codefriar.wordpress.com/2014/10/30/eval-in-apex-secure-dynamic-code-evaluation-on-the-salesforce1-platform/).
I decided to write a simple implementation of Eval function.

This type of expression evaluation become needed when using metadata driven APEX code. In such a code there is a needs to handle type fields that are presented as strings and evaluate their values given a text like this '10 - 5' such expression obviously equal 5, but how to evaluated this text in APEX and get Decimal Number type result in a variable APEX runtime can use? This is where evaluation method similar to JavaScript Eval() comes in.
	
There are some examples that solve this problem by using REST calls and Tooling API making a call from APEX to JScript, that is clever and also complex. It would be simpler to have APEX native eval method. Now rememebred the good old reverse polish notation calculator, quick web search found one basic example of eval APEX method using RPN in this post [Salesforce Stack Exchange](http://salesforce.stackexchange.com/questions/20796/evaluate-expressions-conditions-in-apex-code-which-are-stored-in-string-text).
Decided to extended this to more complete implemetation.
The APEX class demonstrates Text string evaluation method (shown below).


```
public static Decimal textEval(Object[] rpnExprStack) {
   Decimal res = 0;
   List<Object> workRpnExprStack = new List<Object> ();
   for (Object obj : rpnExprStack) {    
        workRpnExprStack.add(obj);
   }
   while (workRpnExprStack.size() > 1) {
        Object expr0 = workRpnExprStack[0];
        Object expr1 = workRpnExprStack[1];
        Object expr2 = workRpnExprStack.size() >2 ? 		 workRpnExprStack[2] : null;
        
       if (expr0 instanceof Decimal){
           throw new EXPException('Invalid RPN expression stack (dangling operator): ' + rpnExprStack);
       }
       // Evaluate lmited String Expression
       if (expr0 instanceOf String && expr1 instanceOf String && expr2 instanceOf String) {
           String operator = (String) expr2;
           String exp0 = (String)expr0;
           String exp1 = (String) expr1;
           if (operator == '==') {
               if(exp0.equals( exp1) ) {
                  res = 1;
               } else { res = 0; }
           } else if (operator == '!=') {
               if (!exp0.equals( exp1) ) {
                	   res = 1;
               } else { res = 0; }
           } else if (operator.equals('contains')){
               if (exp0.contains( exp1) ) {
                	  res = 1;
               } else { res = 0; }
           } else {
                	System.debug(rpnExprStack);
                	throw new EXPException('Invalid RPN expression stack (unsupported operator): ' + rpnExprStack);
           }
           workRpnExprStack.remove(0); // pop expr 0
           workRpnExprStack.remove(0); // pop expr 1
           workRpnExprStack.remove(0); // pop operator
           if (workRpnExprStack.size() > 0)
               workRpnExprStack.add(0,res);           	 	    else
               workRpnExprStack.add(res);      
        	} else {
            	throw new EXPException('Invalid RPN expression stack (expressions/operators): ' + rpnExprStack);
        	}
    	}
    	res     = (Decimal) workRpnExprStack[0];
    	return res;
}
```

This method can compare strings for equality or containment.
The class and its methods will also need a custom Exception class we can define it like this

```
public class EXPException extends Exception {}

```

Now lets create a simple math evaluation method that can do most basic operations, +, -, /, *, >, == etc. 

```
    public static Decimal mathEval(Object[] rpnExprStack) {
    	
    	Decimal res = 0;
    	List<Object> workRpnExprStack = new List<Object> ();
        for (Object obj : rpnExprStack) {    // make copy of stack as we'll be modifying it
        	workRpnExprStack.add(obj);
        }
    	while (workRpnExprStack.size() > 1) {
        	Object expr0 = workRpnExprStack[0];
        	Object expr1 = workRpnExprStack[1];
        	Object expr2 = workRpnExprStack.size() > 2 ? workRpnExprStack[2] : null;
        	
        	if (expr0 instanceof String){
          	  System.debug(rpnExprStack);
              throw new EXPException('Invalid RPN expression stack (dangling operator): ' + rpnExprStack);
        	}
            // Evaluate Number expression
        	if (expr0 instanceOf Decimal && expr1 instanceOf Decimal && expr2 instanceOf String) {
            	String operator = (String) expr2;
                if (operator == '+') {
                	res = (Decimal) expr0 + (Decimal) expr1;
                } else if (operator == '-') {
                	res     = (Decimal) expr0 - (Decimal) expr1;
                } else if (operator == '*') {
                	res     = (Decimal) expr0 * (Decimal) expr1;
                } else if (operator == '/') {
                	res     = (Decimal) expr0 / (Decimal) expr1;
                } else if (operator == '>=') {
                	if((Decimal) expr0 >= (Decimal) expr1){
                    	res = 1;
                	} else { res = 0; }  
            	} else if (operator == '<=') {
                	if((Decimal) expr0 <= (Decimal) expr1){
                    	res = 1;
                	} else { res = 0; }  
            	} else if (operator == '>') {
                	if((Decimal) expr0 > (Decimal) expr1){
                    	res = 1;
                	} else { res = 0; }  
            	} else if (operator == '<') {
                	if((Decimal) expr0 < (Decimal) expr1){
                    	res = 1;
                	} else { res = 0; }  
            	} else if (operator == '==') {
                	if ((Decimal) expr0 == (Decimal) expr1) {
                    	res = 1;
                	} else { res = 0; }  
            	} else if (operator == '!=') {
                	if ((Decimal) expr0 != (Decimal) expr1){
                    	res = 1;
                	} else { res = 0; }  
            	} else {
                	throw new EXPException('Invalid RPN expression stack (unsupported operator): ' + rpnExprStack);
            	}
            	workRpnExprStack.remove(0); // pop expr 0
            	workRpnExprStack.remove(0); // pop expr 1
            	workRpnExprStack.remove(0); // pop operator
                if (workRpnExprStack.size() > 0) {
                	workRpnExprStack.add(0,res);// push res to front of stack
                } else {
                	workRpnExprStack.add(res); 
                }
        	} else {
            	throw new EXPException('Invalid RPN expression stack (expressions/operators): ' + rpnExprStack);
        	}
    	}
    	res = (Decimal) workRpnExprStack[0];
    	return res;
	}


```

The method above give some insight on how math expressions can be evaluated. This method returns resulting number of math expression or boolean value of 0 or 1 for compare type >, ==, >= expressions.
This is APEX code and we will need to test it, below is an example how to test these methods with assertions.

```
System.assertEquals(15.0,   EXP_Eval.mathEval(new List<Object> {10,5,'+'}));
System.assertEquals(5.0,   EXP_Eval.mathEval(new List<Object> {10,5,'-'}));
System.assertEquals(0.0,   EXP_Eval.mathEval(new List<Object> {3,1,'<='}));
System.assertEquals(1.0,   EXP_Eval.mathEval(new List<Object> {3,3,'=='}));
System.assertEquals(1.0,   EXP_Eval.textEval(new List<Object> {'Tree','Tree','=='}));
System.assertEquals(0.0,   EXP_Eval.textEval(new List<Object> {'Tee','Foset','=='}));
		
```

Now we have APEX expression evaluation calss native to Apex. It covers some basic evaluations thta I needed but it is not complete expression Eval(). This calss can be easily extended to add other operators. Complete code implementation for this post can be found in github repository [apex-eval](https://github.com/iandrosov/apex-eval).
