import urllib2.request , urllib2.parse, urllib2.error
from bs4 import BeautifulSoup

url = input('Enter - ')
html = urllib2.request.urlopen(url).read()
soup = BeautifulSoup(html, 'html.parser')

#Retrieve all of the anchor tags
tags = soup('a')
for tag in tags:
    print(tag.get('href', None))