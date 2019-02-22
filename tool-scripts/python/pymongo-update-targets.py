import uuid
from pymongo import MongoClient

client = MongoClient('mongodb://127.0.0.1:3001')
db = client.meteor

targetIds = ["Q4CCJj5KAQ9ekgcAA"]

fileDataIds = [
	{ "collectionName": 'FileData', "documentId": 'stuff10' },
	{ "collectionName": 'FileData', "documentId": 'stuff20' },
	{ "collectionName": 'FileData', "documentId": 'stuff30' }
]

for t in targetIds:
	targetUpdRes = db.targets.update_one({ "_id": t }, 
		{ "$push": { "relations": { "$each": fileDataIds } }} )