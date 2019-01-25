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
	
