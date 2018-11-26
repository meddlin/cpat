import xmltodict
import pprint
import json

# Look here for the guide
# https://www.journaldev.com/19392/python-xml-to-json-dict

the_xml = """
	<example>
		<id my="attribute">hello</id>
		<name>WORLD</name>
	</example>
"""

pp = pprint.PrettyPrinter(indent=4)
pp.pprint(json.dumps(xmltodict.parse(the_xml)))
