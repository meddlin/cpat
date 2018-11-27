import xmltodict
import pprint
import json

# Look here for the guide
# https://www.journaldev.com/19392/python-xml-to-json-dict

with open('nmap-out.xml') as fd:
	doc = xmltodict.parse(fd.read())

pp = pprint.PrettyPrinter(indent=4)
pp.pprint(json.dumps(doc))