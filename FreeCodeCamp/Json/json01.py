import json

#JSON represents data as nested "lists" and "dictionaries"
data = '''{
    "name" : "Thu Rein Oo",
    "phone" : {
        "type" : "intl",
        "number" : "+96849348573"
    },
    "email" : {
        "hide" : "True"
    }
}'''
info = json.loads(data)
print("Name : ", info['name'])
print("Phone Number : ", info['phone']['number'])