from urllib.request import urlopen
from bs4 import BeautifulSoup

url = input('Enter an http(s) URL: ').strip()
if not url.startswith(('http://', 'https://')):
    raise ValueError('Enter a URL beginning with http:// or https://')

with urlopen(url, timeout=10) as response:
    html = response.read()

soup = BeautifulSoup(html, 'html.parser')

#Retrieve all of the anchor tags
tags = soup('a')
for tag in tags:
    print(tag.get('href', None))
