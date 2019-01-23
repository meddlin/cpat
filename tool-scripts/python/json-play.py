import xmltodict
import pprint
import json
import sys

xmlfile = sys.argv[1]
pp = pprint.PrettyPrinter(indent=4)

# with open('nmap-out.xml') as fd:
with open(xmlfile) as fd:
	doc = xmltodict.parse(fd.read())
jsonSource = json.dumps(doc)

# Use the actual JSON as python dict
d = json.loads(jsonSource)

# pp.pprint(doc)
# pp.pprint(json.dumps(doc))
# pp.pprint(d)
pp.pprint(d['nmaprun']['runstats'])