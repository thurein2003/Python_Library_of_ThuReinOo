#Before using that you need to install tabulate
#pip install tabulate

from tabulate import tabulate
def display_items_in_table(item_prices):
    headers = ["Item", "Price"]
    table_data = [[key, item_prices[key]] for key in item_prices.keys()]
    print(tabulate(table_data, headers, tablefmt="grid"))

# Dictionary with item names and their corresponding prices
item_prices = {
    "apple": 1.25,
    "banana": 0.90,
    "orange": 1.00,
    "grapes": 1.60,
    "pear": 1.50,
    "mango": 2.50, 
    "strawberry": 3.50, 
    "blueberry": 3.00, 
    "kiwi": 1.75, 
    "lime": 0.75, 
    "papaya": 3.00, 
    "passionfruit": 2.00, 
    "plum": 1.25, 
    "grapefruit": 2.00, 
    "nectarine": 1.80, 
    "tangerine": 1.50, 
    "watermelon": 4.00, 
    "dragonfruit": 5.00, 
}

display_items_in_table(item_prices)

'''
print("| Welcome From my store |\n")
for key in item_prices.keys():
    print(key + " : " + str(item_prices[key]))'''
    
# Function to calculate the total price of selected items
def calculate_total_price(selected_items):
    total_price = 0
    for item in selected_items:
        if item in item_prices:
            total_price += item_prices[item]
        else:
            print(f"'{item}' is not available in the store.")
    return total_price

# Ask the user to input a comma-separated list of item names
selected_items = input("Enter the names of the items you want to buy, separated by commas: ").split(',')

# Remove any leading or trailing spaces from the item names
selected_items = [item.strip() for item in selected_items]

# Keep asking the user for input until they type "end"
while True:
    selected_items_input = input("Enter the names of the items you want to buy, separated by commas. Type 'end' to finish: ").split(',')

    if selected_items_input == ['end']:
        break

    selected_items += [item.strip() for item in selected_items_input]

# Calculate the total price of the selected items
total_price = calculate_total_price(selected_items)

# Print the total price
print(f"The total price of the selected items is: ${total_price:.2f}")