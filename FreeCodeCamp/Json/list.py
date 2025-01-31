import json

data = '''[
    {
        "id" : "001",
        "name" : "Mg Mg",
        "age" : "30"
    },
    {
        "id" : "002",
        "name" : "Kyaw Kyaw",
        "age" : "20"
    }
        ]'''
info = json.loads(data)
print("User count : ", len(data))
for g in info:
    print("ID number is ", g['id'])
    print("Name is ", g['name'])
    print("Age is ",g['age'])
    