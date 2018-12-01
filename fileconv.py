import xmltodict
import pprint
import json
import sys
from pymongo import MongoClient

xmlfile = sys.argv[1]

client = MongoClient('mongodb://127.0.0.1:3001')
db = client.meteor

# Look here for the guide
# https://www.journaldev.com/19392/python-xml-to-json-dict

# with open('nmap-out.xml') as fd:
with open(xmlfile) as fd:
	doc = xmltodict.parse(fd.read())

pp = pprint.PrettyPrinter(indent=4)
sourceForInsert = json.dumps(doc)
pp.pprint(json.dumps(doc))

result = db.filedata.insert_one({
	'source': sourceForInsert,
	'origination': 'from python file'
})
pp.pprint(result)