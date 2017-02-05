#Find the sum of all the multiples of 3 or 5 below 1000

def Euler1(a):
    total = 0
    x = 1
    while x < 1000 and (x%3 == 0 or (x%5 == 0 and x%15 != 0)):
        total += x
        x += 1
    print(total)
