import xmltodict
import pprint
import json
import sys
import uuid
import datetime
from pymongo import MongoClient
from subprocess import Popen, PIPE
from pymongo import MongoClient

# Credit ---
# https://stackoverflow.com/questions/3777301/how-to-call-a-shell-script-from-python-code

# Also...
# https://xael.org/pages/python-nmap-en.html
inputParams = sys.argv[1]
params = inputParams.split(' ')

res = ""
# p = Popen(['./nmap-sample.sh'], stdout = PIPE)
# p = Popen(['nmap', '192.168.1.1'], stdout = PIPE)

printer = pprint.PrettyPrinter(indent=4)
printer.pprint("from python...")

printer.pprint("Running: " + inputParams)
sys.stdout.flush()

printer.pprint(params)
p = Popen(params, stdout = PIPE)
printer.pprint(p.communicate()[0])

while p.poll() is None:
    time.sleep(0.5)

client = MongoClient('mongodb://127.0.0.1:3001')
db = client.meteor
xmlfile = params[-1] # this assumes the file is the last param, FIX THIS! Only PoC code!
with open(xmlfile) as fd:
	doc = xmltodict.parse(fd.read())

sourceForInsert = json.dumps(doc)
printer.pprint(json.dumps(doc))
docId = str(uuid.uuid4())
runStats = json.loads(sourceForInsert)

result = db.filedata.insert_one({
	'_id': docId,
	'source': sourceForInsert,
	'runStats': runStats['nmaprun']['runstats'],
	'origination': 'from python file',
	'dateCreated': datetime.datetime.now()
})
printer.pprint(result)




printer.pprint("just before flush...")
sys.stdout.flush()