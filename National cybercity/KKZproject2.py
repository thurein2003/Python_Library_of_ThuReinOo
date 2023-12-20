def main():
    even_count = 0
    odd_count = 0

    while True:
        try:
            num = int(input("Enter an integer (0 to exit): "))
            if num == 0:
                break

            if num % 2 == 0:
                even_count += 1
            else:
                odd_count += 1

        except ValueError:
            print("Invalid input. Please enter a valid integer.")

    print(f"Number of even integers: {even_count}")
    print(f"Number of odd integers: {odd_count}")

if __name__ == "__main__":
    main()
