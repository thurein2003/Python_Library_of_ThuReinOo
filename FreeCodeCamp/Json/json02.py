import json
thurein = '''{
    "name" : "Thu Rein Oo",
    "age" : {
        "day" : "30",
        "month" : "5",
        "year" : "2003"
    },
    "location" : "Natmauk",
    "phone" : {
        "type" : "intl",
        "number" : "0923049821"
    }
}'''
info = json.loads(thurein)
print("Name", info["name"])
print("Age", info["age"])
