#9 Dec 2023
import statistics

'''def fun(a):
    print("Yur",a)
    
fun(88)
fun([8,6,"thurein"])


l = [2,3,4,5,6,7]

def fun(a, b , *p):
    print(a)
    print(b)
    print(*p)
    
fun(23,34)
print(l)

'''


l = [2,3,4,5,6,7]
m = statistics.mean(l)
print(m)
m = statistics.median(l)
print(m)
m = statistics.mode(l)
print(m)
m = statistics.stdev(l)
print(m)
