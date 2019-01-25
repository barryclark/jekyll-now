---
layout: post
title: Learnings from ProSort 68 Div-2
---

Recently I took part in a competetive programming contest. It was a practice one and I learnt some very important things.

## Major take-aways
Thanks to Bhavye Anand Gupta, for the explanations and patience :D

1. Modular Arithmetic 
	1. `(a*b)%m = a%m * b%m`
	2. `(a/b)%m = a%m * (b-inverse)%m`
2. Fermat's Little Theorem (FLT): `(b-inverse)%m = ( b^(m-2) )%m` IF m is prime, and in our case it is.
	PS: For calculating `b^(m-2)` use fast exponentiation. Fast exponentiation means a recursive function in which; for `a^n` you just calculate `a^(n/2)`, and so on.  
3. For calculation of Factorial, pre-compute it and store in an array

I was successfully able to solve the following two problems:

## Problem 1: "New Problem"

You can find the same problem in Practice on Codeforces.
[Original Problem Page](http://foobar.contest.codeforces.com/group/0U62CQraSv/contest/237095/problem/A)
[Alternate Page with exact same Problem](https://codeforces.com/problemset/problem/278/B)

```python
iTa={1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h', 9: 'i', 10: 'j', 11: 'k', 12: 'l', 13: 'm', 14: 'n', 15: 'o', 16: 'p', 17: 'q', 18: 'r', 19: 's', 20: 't', 21: 'u', 22: 'v', 23: 'w', 24: 'x', 25: 'y', 26: 'z'}
aTi={'q': 17, 's': 19, 'k': 11, 'u': 21, 't': 20, 'f': 6, 'n': 14, 'l': 12, 'j': 10, 'g': 7, 'z': 26, 'x': 24, 'i': 9, 'm': 13, 'w': 23, 'h': 8, 'b': 2, 'a': 1, 'e': 5, 'r': 18, 'y': 25, 'o': 15, 'd': 4, 'p': 16, 'c': 3, 'v': 22}

def getNext(a):
	if a=="":
		return ""
	if(a=='z'*len(a)):
		return 'a'*(len(a)+1)
	else:
		if(a[-1]!='z'):
			return a[:-1]+iTa[aTi[a[-1]]+1]
		else:
			return getNext(a[:-1])+'a'
	
# a='a'		
# for i in range(100):
# 	print(a)
# 	a=getNext(a)
n = int(input())
l=[]

for i in range(n):
	l.append(input())

out='a'

while True:
	flag = False
	for i in l:
		if out in i:
			flag = True
			break
	if flag == False:
		print(out)
		break
	else:
		out = getNext(out)
```

## Problem 2: "Beautiful Numbers"

You can find the same problem in Practice on Codeforces.
[Original Problem Page](http://foobar.contest.codeforces.com/group/0U62CQraSv/contest/237095/problem/B)
[Alternate Page with exact same Problem](https://codeforces.com/problemset/problem/300/C)

```cpp
#include<bits/stdc++.h>
#define MOD 1000000007

using namespace std;

bool checkGoodness(int a, int b, long long int check){
	while(check!=0){
		if(!(check%10==a || check%10==b))
			return false;
		check=check/10;
	}
	return true;
}

long long int fastExp(long long int base, long long int power){
	// Includes modular
	if(power==0) return 1;

	long long int res = fastExp(base,power/2);
	if(power%2==0)	return (res*res)%MOD;
	else return (((res*res)%MOD)*base)%MOD;
}

long long int modInv(int x){
	return fastExp(x, MOD-2)%MOD;
}

int main(){
	long long int a,b,n;
	scanf("%lld %lld %lld", &a,&b,&n);

	//PreComputing for Factorial
	long long int pre[n+1];
	pre[0]=1;
	for(int i=1; i<n+1; i++)
		pre[i]=(pre[i-1]*i)%MOD;

	long long int ans=0;
	for(long long int x=0; x<n+1; x++){
		long long int summ=x*a+(n-x)*b;
		if (checkGoodness(a,b,summ)){
			long long int toAdd = pre[n] * modInv((pre[x]*pre[n-x])%MOD);
			ans = (ans+toAdd)%MOD;
		}			
	}
	printf("%lld\n", ans);

	return 0;
}
```

Python gave a TLE for me
```python
from math import factorial

MOD = 1000000007
a,b,n=list(map(int,input().split()))

def checkGoodness(a,b,st):
	for ch in str(st):
		if int(ch) not in [a,b]:
			return False
	return True

#Pre Computing for Factorial
pre = [0]*(n+1)
pre[0] = 1;
for i in range(1,n+1):
	pre[i] = (pre[i-1] * i) % MOD


def fastExpo(base,power):
	#includes modular
	if power==0:
		return 1

	if(power%2==0):
		return (fastExpo(base, power//2)**2)%MOD
	return ( ((fastExpo(base,power//2)**2)%MOD) *base)%MOD


# assert 1024==fastExpo(2,10)
# assert 512==fastExpo(2,9)
# assert 243==fastExpo(3,5)

def modInv(x):
	return fastExpo(x,MOD-2) % MOD

# def fac(n,till):
# 	ans =1
# 	for x in range(n,till,-1):
# 		ans=((ans%MOD)*(x%MOD))%MOD
# 	return ans

ans=0

for x in range(n+1):
	summ = x*a+(n-x)*b
	if checkGoodness(a,b,summ):
		toAdd = pre[n] * modInv((pre[x]*pre[n-x])%MOD)
		ans = (ans+toAdd)%MOD
print(ans)
	
```

## Files and Resources
1. Complete Problem Set: [Link](http://foobar.contest.codeforces.com/group/0U62CQraSv/contest/237095/problems), [PDF]({{ site.baseurl }}/resources/proSort68/problemSet.pdf)
2. [new_problem.py]({{ site.baseurl }}/resources/proSort68/new_problem.py)
3. [beautiful_numbers.cpp]({{ site.baseurl }}/resources/proSort68/beautiful_numbers.cpp)
4. [beautiful_numbers.py]({{ site.baseurl }}/resources/proSort68/beautiful_numbers.py)(this one was giving TLE, but algorithm is similar)
