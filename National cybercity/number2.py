def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

def summation(n):
    return sum(range(1, n + 1))

def main():
    operation = int(input("(1)Select operation 1 for factorial :\n(2)Select operation 2 for factorial for summation) : \n(3)Other for quit :  \nEnter number : "))


    if operation == 1:
       n = int(input("Enter an integer number (n): "))
       factorial(n)
       print(f"Factorial of {n} is {factorial(n)}")
    elif operation == 2:
       n = int(input("Enter an integer number (n): "))
       factorial(n)
       print(f"Summation of {n} is {summation(n)}")
    else:
        print("N/A Operation!")

if __name__ == "__main__":
    main()
