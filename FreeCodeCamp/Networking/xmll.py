import xml.etree.ElementTree as ET

date = ''' <person>
    <name> Thu Rein Oo </name>
    <phone type = "intl">
        +91 1234567890
    </phone>
    <email hide="yes" />
</person>'''

tree = ET.fromstring(data)
print('Name : ', tree.find('name').text)
print('Attr',tree.find('email').get('hide'))