def main():
    total_sum = 0
    count = 0

    while True:
        try:
            num = int(input("Enter an integer (-1 to exit): "))
            if num == -1:
                break
            total_sum += num
            count += 1
        except ValueError:
            print("Invalid input. Please enter a valid integer.")

    print(f"The sum of {count} number(s) is {total_sum}.")

if __name__ == "__main__":
    main()
