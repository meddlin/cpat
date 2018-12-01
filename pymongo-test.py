from pymongo import MongoClient
from pprint import pprint

client = MongoClient('mongodb://127.0.0.1:3001')
db = client.meteor

#serverStatusResult = db.command('filedata')
#pprint(serverStatusResult)

result = db.filedata.find_one({'origination': 'from python file'})
pprint(result)