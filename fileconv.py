import xmltodict
import pprint
import json
import sys

xmlfile = sys.argv[1]

# Look here for the guide
# https://www.journaldev.com/19392/python-xml-to-json-dict

# with open('nmap-out.xml') as fd:
with open(xmlfile) as fd:
	doc = xmltodict.parse(fd.read())

pp = pprint.PrettyPrinter(indent=4)
pp.pprint(json.dumps(doc))