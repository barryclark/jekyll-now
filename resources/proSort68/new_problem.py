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