import sys
import subprocess
import time
from subprocess import Popen, PIPE
import os
import uuid
import datetime
from pymongo import MongoClient

# toolDataLocation = "/home/meddlin/git/cpat/tool-data" + "/" + "Target_metagoofil_" + date.today()

# Split the input string into a parameter array
inputParams = sys.argv[1]
params = inputParams.split(' ')

# View what our parameters are
print("params: ")
print(params)
sys.stdout.flush()

# Extract the target id's from the input parameters
# targets => 'targets:_id-1,id-2'
targetIds = ''
if any("targets:" in p for p in params):
	targetIds = params[-1]
	targetIds = targetIds.replace('targets:', '')
	targetIds = targetIds.split(',')

print("targetIds: ")
print(targetIds)
sys.stdout.flush()

# Append 'python ' to the beginning of the script (we are executing a Python script from another Python script)
paramsForScript = ["python"]
paramsForScript.extend(params)

# View what our parameters for the script are
print("params for script: ")
print(paramsForScript)
sys.stdout.flush()

# Kickoff the metagoofil script (this is where the magic happens)
res = Popen(paramsForScript, stdout = PIPE)

# Wait for the metagoofil script to finish before continuing
while res.poll() is None:
    time.sleep(0.5)

# Setup MongoDB resources
client = MongoClient('mongodb://127.0.0.1:3001')
db = client.meteor

# Find the directory where metagoofil put all the goodies
storageDir = params[params.index('-o') + 1]
print("storageDir: ")
print(storageDir)
sys.stdout.flush()

insertedFileIds = []
# Iterates over the files from a 'run'
# for root, dirs, files in os.walk("/home/meddlin/git/cpat/tool-data/metagoofil"):
for root, dirs, files in os.walk(storageDir):
	for file in files:
		if file.endswith(".pdf"):			
			fileName = os.path.join(root, file)
			docId = str(uuid.uuid4())
			data = { 
					'_id': docId,
					'fileName': fileName,
					'fileSize': os.path.getsize(fileName), # this is in bytes
					'fileType': os.path.splitext(fileName)[1],
					'fileLocation': fileName,
					'relations': '',
					'dateAnalyzed': '',
					'dateCreated': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
				}

			print(data)
			sys.stdout.flush()

			resId = db.filedata.insert_one(data)
			insertedFileIds.append({"collectionName": 'filedata', "documentId": docId})
			print(resId)
			sys.stdout.flush()

		if file.endswith(".doc"):
			print("found .doc type")

		if file.endswith(".docx"):
			print("found .docx type")

		if file.endswith(".xls"):
			print("found .xls type")

		if file.endswith(".xlsx"):
			print("found .xlsx type")

# Update targets with ids from the inserted files
for t in targetIds:
	targetRelResId = db.targets.update_one({ "_id": t }, 
			{ "$push": { "relations": { "$each": insertedFileIds } }
		})
	print("updating targets...")
	print(targetRelResId)

sys.stdout.flush()

# TODO
# 	--> detect what type of files are retrieved
# 	--> PDFs
# 		- detect if English?
# 		- pull out text into "blobs" for web viewing, search, use, etc.
# 		- determine which PDFs are "similar" to each other
# 	--> Spreadsheets
# 		- make viewable? (convert to CSV, or pull into tabled data)