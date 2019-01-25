---
layout: post
title: Learnings from ProSort 68 Div-2
---

Recently I took part in a competetive programming contest. It was a practice one and I learnt some very important things.

I was successfully able to solve the following two problems:

# Problem 1: "New Problem"

You can find the same problem in Practice on Codeforces.
[Original Problem Page](http://foobar.contest.codeforces.com/group/0U62CQraSv/contest/237095/problem/A)
[Alternate Page with exact same Problem](https://codeforces.com/problemset/problem/278/B)

```python3
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

# Problem 2: "Beautiful Numbers"

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
```python3
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

# Files and Resources
1. Complete Problem Set: [Link](http://foobar.contest.codeforces.com/group/0U62CQraSv/contest/237095/problems), [PDF]({{ site.baseurl }}/resources/proSort68/problemSet.pdf)
2. [new_problem.py]({{ site.baseurl }}/resources/proSort68/new_problem.py)
3. [beautiful_numbers.cpp]({{ site.baseurl }}/resources/proSort68/beautiful_numbers.cpp)
4. [beautiful_numbers.py]({{ site.baseurl }}/resources/proSort68/beautiful_numbers.py)(this one was giving TLE, but algorithm is similar)


## HTML Blob
<div class="problemindexholder" problemindex="A">
        <div class="ttypography"><div class="problem-statement"><div class="header"><div class="title">A. New Problem</div><div class="time-limit"><div class="property-title">time limit per test</div>2 seconds</div><div class="memory-limit"><div class="property-title">memory limit per test</div>256 megabytes</div><div class="input-file"><div class="property-title">input</div>standard input</div><div class="output-file"><div class="property-title">output</div>standard output</div></div><div><p>Coming up with a new problem isn't as easy as many people think. Sometimes it is hard enough to name it. We'll consider a title <span class="tex-font-style-underline">original</span> if it doesn't occur as a substring in any titles of recent Codeforces problems. </p><p>You've got the titles of <span class="tex-span"><i>n</i></span> last problems — the strings, consisting of lowercase English letters. Your task is to find the shortest original title for the new problem. If there are multiple such titles, choose the lexicographically minimum one. Note, that title of the problem can't be an empty string.</p><p>A <span class="tex-font-style-it">substring</span> <span class="tex-span"><i>s</i>[<i>l</i>... <i>r</i>]</span> <span class="tex-span">(1 ≤ <i>l</i> ≤ <i>r</i> ≤ |<i>s</i>|)</span> of string <span class="tex-span"><i>s</i> = <i>s</i><sub class="lower-index">1</sub><i>s</i><sub class="lower-index">2</sub>... <i>s</i><sub class="lower-index">|<i>s</i>|</sub></span> (where <span class="tex-span">|<i>s</i>|</span> is the length of string <span class="tex-span"><i>s</i></span>) is string <span class="tex-span"><i>s</i><sub class="lower-index"><i>l</i></sub><i>s</i><sub class="lower-index"><i>l</i> + 1</sub>... <i>s</i><sub class="lower-index"><i>r</i></sub></span>.</p><p>String <span class="tex-span"><i>x</i> = <i>x</i><sub class="lower-index">1</sub><i>x</i><sub class="lower-index">2</sub>... <i>x</i><sub class="lower-index"><i>p</i></sub></span> is <span class="tex-font-style-it">lexicographically smaller</span> than string <span class="tex-span"><i>y</i> = <i>y</i><sub class="lower-index">1</sub><i>y</i><sub class="lower-index">2</sub>... <i>y</i><sub class="lower-index"><i>q</i></sub></span>, if either <span class="tex-span"><i>p</i> &lt; <i>q</i></span> and <span class="tex-span"><i>x</i><sub class="lower-index">1</sub> = <i>y</i><sub class="lower-index">1</sub>, <i>x</i><sub class="lower-index">2</sub> = <i>y</i><sub class="lower-index">2</sub>, ... , <i>x</i><sub class="lower-index"><i>p</i></sub> = <i>y</i><sub class="lower-index"><i>p</i></sub></span>, or there exists such number <span class="tex-span"><i>r</i></span> <span class="tex-span">(<i>r</i> &lt; <i>p</i>, <i>r</i> &lt; <i>q</i>)</span>, that <span class="tex-span"><i>x</i><sub class="lower-index">1</sub> = <i>y</i><sub class="lower-index">1</sub>, <i>x</i><sub class="lower-index">2</sub> = <i>y</i><sub class="lower-index">2</sub>, ... , <i>x</i><sub class="lower-index"><i>r</i></sub> = <i>y</i><sub class="lower-index"><i>r</i></sub></span> and <span class="tex-span"><i>x</i><sub class="lower-index"><i>r</i> + 1</sub> &lt; <i>y</i><sub class="lower-index"><i>r</i> + 1</sub></span>. The string characters are compared by their ASCII codes.</p></div><div class="input-specification"><div class="section-title">Input</div><p>The first line contains integer <span class="tex-span"><i>n</i></span> (<span class="tex-span">1 ≤ <i>n</i> ≤ 30</span>) — the number of titles you've got to consider. Then follow <span class="tex-span"><i>n</i></span> problem titles, one per line. Each title only consists of lowercase English letters (specifically, it doesn't contain any spaces) and has the length from 1 to 20, inclusive.</p></div><div class="output-specification"><div class="section-title">Output</div><p>Print a string, consisting of lowercase English letters — the lexicographically minimum shortest original title.</p></div><div class="sample-tests"><div class="section-title">Examples</div><div class="sample-test"><div class="input"><div class="title">Input</div><pre>5<br />threehorses<br />goodsubstrings<br />secret<br />primematrix<br />beautifulyear<br /></pre></div><div class="output"><div class="title">Output</div><pre>j<br /></pre></div><div class="input"><div class="title">Input</div><pre>4<br />aa<br />bdefghijklmn<br />opqrstuvwxyz<br />c<br /></pre></div><div class="output"><div class="title">Output</div><pre>ab<br /></pre></div></div></div><div class="note"><div class="section-title">Note</div><p>In the first sample the first 9 letters of the English alphabet (<span class="tex-font-style-tt">a, b, c, d, e, f, g, h, i</span>) occur in the problem titles, so the answer is letter <span class="tex-font-style-tt">j</span>.</p><p>In the second sample the titles contain 26 English letters, so the shortest original title cannot have length 1. Title <span class="tex-font-style-tt">aa</span> occurs as a substring in the first title.</p></div></div></div>
</div>
