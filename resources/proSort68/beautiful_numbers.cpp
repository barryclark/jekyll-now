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